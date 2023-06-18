import { useReducer, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PersonPage.css";
import Spinner from "../../components/Spinner/Spinner";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { useLoggedInUser } from "../../context/context_custom_hooks.js";
import obito from "../../components/Spinner/spinnerImages/indra.png";
import {
  aniListRequests,
  personByIdQuery,
} from "../../apis/aniList/aniList.queries";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import CharacterHero from "../characterPage/CharacterPage/CharacterHero/CharacterHero";
import CharacterBanner from "../characterPage/CharacterPage/CharacterBanner/CharacterBanner";
import {
  addToFavPeopleList,
  removeFromFavPeopleList,
} from "../../apis/animexpo/animexpo_updates";
import VARoles from "./VARoles/VARoles";
import { charAppearancesReducer } from "../../reducers/charAppearancesReducer";

const PersonPage = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const { getLocalStorage } = useLocalStorage();
  const { getEntryFromUserCache, addEntryToUserCache } =
    useSessionStorage();
  const { loggedInUser } = useLoggedInUser();
  const [inFavorites, setInFavorites] = useState(null);
  const [pageInfo, setPageInfo] = useState({});
  const navigate = useNavigate();
  const [vaRolesList, dispatch] = useReducer(charAppearancesReducer, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (loggedInUser) {
      const favCharsList = getLocalStorage("loggedInUserFavPeopleList");
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

    const getPersonById = async () => {
      try {
        const { data } = await aniListRequests(
          personByIdQuery,
          variables,
          controller.signal
        );

        if (data.Staff) {
          setPerson(data.Staff);
          dispatch({
            type: "update_list",
            list: data.Staff.characterMedia.edges,
          });
          addEntryToUserCache("peopleList", data.Staff);
          setPageInfo(data.Staff.characterMedia.pageInfo);
        } else {
          throw new Error("Not Found");
        }
      } catch (e) {
        console.log(e);
        navigate("/");
      }
    };
    const person = getEntryFromUserCache("peopleList", id);
    if (person) {
      setPerson(person);
      setPageInfo(person.characterMedia.pageInfo);
      dispatch({
        type: "update_list",
        list: person.characterMedia.edges,
      });
      return;
    } else getPersonById();

    return () => {
      controller.abort();
    };
  }, [id, navigate, getEntryFromUserCache, addEntryToUserCache]);

  return (
    <div className="person-page">
      {person ? (
        <>
          <CharacterBanner />
          <div className="person-content">
            <CharacterHero
              id={person.id}
              name={person.name.userPreferred}
              image={person.image.large || person.image.medium}
              description={person.description}
              inFavorites={inFavorites}
              addToList={addToFavPeopleList}
              setInFavorites={setInFavorites}
              removeFromList={removeFromFavPeopleList}
              localStorageKey={"loggedInUserFavPeopleList"}
            />
            <VARoles
              id={id}
              rolesList={vaRolesList}
              cardHeight={120}
              cardWidth={90}
              dispatch={dispatch}
              pageInfo={pageInfo}
              setPageInfo={setPageInfo}
            />
          </div>
        </>
      ) : (
        <Spinner image={obito} />
      )}
    </div>
  );
};
export default PersonPage;
