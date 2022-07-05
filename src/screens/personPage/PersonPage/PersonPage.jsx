import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPeopleById } from "../../../apis/jikan/jikan_api_requests";
import VARoleCard from "./VARoleCard/VARoleCard";
import "./PersonPage.css";
import Spinner from "../../../components/Spinner/Spinner";
import AddToFavPeopleButton from "../AddToFavPeopleButton/AddToFavPeopleButton";
import RemoveFromFavPeopleButton from "../RemoveFromFavPeopleButton/RemoveFromFavPeopleButton";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import { useLoggedInUser } from "../../../context/context_custom_hooks.js";

const PersonPage = () => {
  const { id } = useParams();
  const [person, setPerson] = useState({});
  const { getLocalStorage } = useLocalStorage();
  const { loggedInUser } = useLoggedInUser();
  const [inFavorites, setInFavorites] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPerson = async () => {
      try {
        const person = await getPeopleById(id);
        setPerson(person);
      } catch (e) {
        navigate("/error");
      }
    };
    getPerson();
  }, [id, navigate]);

  const renderVARoles = (roles) => {
    const sortedList = roles.sort((role1, role2) =>
      role1.anime.title
        .toLowerCase()
        .localeCompare(role2.anime.title.toLowerCase())
    );
    return sortedList.map((role) => {
      return (
        <VARoleCard
          key={role.anime.mal_id + "" + role.character.mal_id}
          anime={role.anime}
          character={role.character}
          role={role.role}
        />
      );
    });
  };

  const renderAddToButton = () => {
    if (loggedInUser) {
      const peopleList = getLocalStorage("loggedInUserFavCharsList");
      if (
        peopleList.list.find((myPerson) => myPerson.mal_id === person.mal_id) ||
        inFavorites
      ) {
        return (
          <RemoveFromFavPeopleButton
            mal_id={person.mal_id}
            setInFavorites={setInFavorites}
          />
        );
      }
    }
    return (
      <AddToFavPeopleButton person={person} setInFavorites={setInFavorites} />
    );
  };

  return (
    <div className="person-page">
      {Object.keys(person).length > 0 ? (
        <>
          <h1>{person.name}</h1>
          <hr />
          <div className="person-content">
            <div className="person-content__left-side">
              <div className="person-poster">
                <img src={person.images.jpg.image_url} alt={person.name} />
                <div className="add-to-list-container">
                  {renderAddToButton()}
                </div>
              </div>
              <div className="person-about">
                <p>
                  <b>Given name:</b>
                  {"\u00A0"} {person.given_name}
                </p>
                <p>
                  <b>Family name:</b>
                  {"\u00A0"} {person.family_name}
                </p>
                <p>
                  <b>Birthday:</b>
                  {"\u00A0"}
                  {new Date(person.birthday).toDateString().slice(3)}
                </p>
                <p>
                  <b>More:</b>
                </p>
                <div className="display-linebreak">{person.about}</div>
              </div>
            </div>
            <div className="person-content__right-side">
              <div className="roles-container">
                {renderVARoles(person.voices)}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
export default PersonPage;
