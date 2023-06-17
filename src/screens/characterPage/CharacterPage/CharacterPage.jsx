import "./CharacterPage.css";
import { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import CharacterBanner from "./CharacterBanner/CharacterBanner";
import Spinner from "../../../components/Spinner/Spinner";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import { useLoggedInUser } from "../../../context/context_custom_hooks.js";
import {
  aniListRequests,
  characterByIdQuery,
} from "../../../apis/aniList/aniList.queries";
import { useSessionStorage } from "../../../hooks/useSessionStorage";
import CharacterHero from "./CharacterHero/CharacterHero";
import Appearances from "./Appearances/Appearances";
import madara from "../../../components/Spinner/madara-eternal.png";
import { charAppearancesReducer } from "../../../reducers/charAppearancesReducer";
import {
  addToFavCharList,
  removeFromFavCharList,
} from "../../../apis/animexpo/animexpo_updates";

const CharacterPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [inFavorites, setInFavorites] = useState(null);
  const { getLocalStorage } = useLocalStorage();
  const { loggedInUser } = useLoggedInUser();
  const [pageInfo, setPageInfo] = useState({});
  const { getEntryFromUserCache, addEntryToUserCache } =
    useSessionStorage();
  const navigate = useNavigate();
  const [appearancesList, dispatch] = useReducer(charAppearancesReducer, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      window.scrollTo(0, 0);
    };
  }, [id]);

  useEffect(() => {
    if (loggedInUser) {
      const favCharsList = getLocalStorage("loggedInUserFavCharsList");
      if (favCharsList.list.find((char) => char.id === +id)) {
        setInFavorites(true);
      } else {
        setInFavorites(false);
      }
    }
  }, [id, loggedInUser, getLocalStorage]);

  useEffect(() => {
    const controller = new AbortController();
    const variables = { id };

    const getCharacterById = async () => {
      try {
        const { data } = await aniListRequests(
          characterByIdQuery,
          variables,
          controller.signal
        );

        if (data.Character) {
          setCharacter(data.Character);
          dispatch({
            type: "update_list",
            list: data.Character.media.edges,
          });
          addEntryToUserCache("charsList", data.Character);
          setPageInfo(data.Character.media.pageInfo);
        } else {
          throw new Error("Not Found");
        }
      } catch (e) {
        console.log(e);
        navigate("/");
      }
    };
    const char = getEntryFromUserCache("charsList", id);
    if (char) {
      setCharacter(char);
      setPageInfo(char.media.pageInfo);
      dispatch({
        type: "update_list",
        list: char.media.edges,
      });
      return;
    } else getCharacterById();

    return () => {
      controller.abort();
    };
  }, [id, navigate, getEntryFromUserCache, addEntryToUserCache]);

  return (
    <div className="character-page">
      {character ? (
        <>
          <CharacterBanner
            bannerImage={character.media.edges[0].node.bannerImage}
          />
          <div className="character-content">
            <CharacterHero
              id={character.id}
              name={character.name.userPreferred}
              image={character.image.large || character.image.medium}
              description={character.description}
              inFavorites={inFavorites}
              setInFavorites={setInFavorites}
              addToList={addToFavCharList}
              removeFromList={removeFromFavCharList}
              localStorageKey={"loggedInUserFavCharsList"}
            />
            {appearancesList.length > 0 && (
              <Appearances
                id={id}
                appearancesList={appearancesList}
                hasNextPage={pageInfo.hasNextPage}
                dispatch={dispatch}
                pageInfo={pageInfo}
                setPageInfo={setPageInfo}
              />
            )}
          </div>
        </>
      ) : (
        <Spinner image={madara} />
      )}
    </div>
  );
};
export default CharacterPage;
