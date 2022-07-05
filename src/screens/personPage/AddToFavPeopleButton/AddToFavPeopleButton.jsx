import { useState } from "react";
import { addToFavPeopleList } from "../../../apis/animexpo/animexpo_updates.js";
import MustBeLoggedIn from "../../../components/MustBeLoggedIn/MustBeLoggedIn.jsx";
import { useLoggedInUser } from "../../../context/context_custom_hooks.js";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import "./AddToFavPeopleButton.css";

const AddToFavPeopleButton = ({ person, setInFavorites }) => {
  const { loggedInUser } = useLoggedInUser();
  const { setLocalStorage } = useLocalStorage();
  const [displayMessage, setDisplayMessage] = useState(false);
  const [clicked, setClicked] = useState(false);

  const onClick = async () => {
    if (clicked) return;
    setClicked(true);
    if (!loggedInUser) {
      setClicked(false);
      setDisplayMessage(true);
    } else {
      const { mal_id, name, images } = person;
      const personEntry = {
        mal_id,
        name,
        image: images.jpg.image_url,
      };

      try {
        const updatedPeopleList = await addToFavPeopleList(
          loggedInUser.username,
          loggedInUser.token,
          personEntry
        );
        if (updatedPeopleList) {
          setLocalStorage("loggedInUserFavPeopleList", updatedPeopleList);
          setInFavorites(true);
        }
        setClicked(false);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <>
      <button onClick={onClick} className="add-to-list-button">
        Add to Favorites
      </button>
      {displayMessage && (
        <MustBeLoggedIn setDisplayMessage={setDisplayMessage} />
      )}
    </>
  );
};
export default AddToFavPeopleButton;
