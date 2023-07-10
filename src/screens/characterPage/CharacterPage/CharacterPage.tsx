import "./CharacterPage.css";
import { useState, useEffect, useReducer, JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CharacterBanner from "./CharacterBanner/CharacterBanner";
import Spinner from "../../../components/Spinner/Spinner";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useLoggedInUser } from "../../../context/context_custom_hooks";
import {
  aniListRequests,
  characterByIdQuery,
} from "../../../apis/aniList/aniList.queries";
import { useSessionStorage } from "../../../hooks/useSessionStorage";
import CharacterHero from "./CharacterHero/CharacterHero";
import Appearances from "./Appearances/Appearances";
import madara from "../../../components/Spinner/spinnerImages/madara-eternal.png";
import { charAppearancesReducer } from "../../../reducers/charAppearancesReducer";
import {
  addToFavCharList,
  removeFromFavCharList,
} from "../../../apis/animexpo/animexpo_updates";
import { parseDateFromAniListApi } from "../../../helpers/helpers";
import { ApiPageInfoType } from "../../../apis/aniList/aniListTypes.types";
import {
  CharacterPageApiResponse,
  CharacterPageEntryType,
} from "./CharacterPage.types";

const CharacterPage = (): JSX.Element => {
  const { id } = useParams() as { id: string };
  const [character, setCharacter] = useState<CharacterPageEntryType>();
  const [inFavorites, setInFavorites] = useState<boolean>(false);
  const { getLocalStorageUserData } = useLocalStorage();
  const { loggedInUser } = useLoggedInUser();
  const [pageInfo, setPageInfo] = useState<ApiPageInfoType>();
  const { getEntryFromUserCache, addEntryToUserCache } = useSessionStorage();
  const navigate = useNavigate();
  const [appearancesList, dispatch] = useReducer(charAppearancesReducer, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (loggedInUser) {
      const favoriteCharsList = getLocalStorageUserData().favoriteCharacters;
      if (favoriteCharsList.list.find((char) => char.id === +id)) {
        setInFavorites(true);
      } else {
        setInFavorites(false);
      }
    }
  }, [id, loggedInUser, getLocalStorageUserData]);

  useEffect(() => {
    const controller = new AbortController();
    const variables = { id };

    const getCharacterById = async () => {
      try {
        const { data }: { data: CharacterPageApiResponse } =
          await aniListRequests(
            characterByIdQuery,
            variables,
            controller.signal
          );

        if (data.Character) {
          setCharacter(data.Character);
          addEntryToUserCache("charsList", data.Character);
          dispatch({
            type: "update_list",
            list: data.Character.media.edges,
          });
          setPageInfo(data.Character.media.pageInfo);
        } else {
          throw new Error("Not Found");
        }
      } catch (e) {
        console.log(e);
        navigate("/");
      }
    };
    const char = getEntryFromUserCache(
      "charsList",
      +id
    ) as CharacterPageEntryType;
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
            bannerImage={character.media?.edges[0].node.bannerImage}
          />
          <div className="character-content">
            <CharacterHero
              id={character.id}
              name={character.name.userPreferred}
              image={character.image.large}
              description={character.description}
              age={character.age}
              bloodType={character.bloodType}
              gender={character.gender}
              birthday={parseDateFromAniListApi(character.dateOfBirth)}
              inFavorites={inFavorites}
              setInFavorites={setInFavorites}
              addToList={addToFavCharList}
              removeFromList={removeFromFavCharList}
              localStorageKey={"favoriteCharacters"}
            />
            {appearancesList.length > 0 && (
              <Appearances
                id={+id}
                appearancesList={appearancesList}
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
