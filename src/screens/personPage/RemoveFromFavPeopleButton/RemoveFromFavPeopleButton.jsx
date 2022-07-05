import { useState } from "react";
import { removeFromFavPeopleList } from "../../../apis/animexpo/animexpo_updates.js";
import { useLoggedInUser } from "../../../context/context_custom_hooks.js";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import "./RemoveFromFavPeopleButton.css";

const RemoveFromFavPeopleButton = ({ mal_id, setInFavorites }) => {
  const { loggedInUser } = useLoggedInUser();
  const { setLocalStorage } = useLocalStorage();
  const [clicked, setClicked] = useState(false);

  const onClick = async () => {
    if (clicked) return;
    setClicked(true);
    try {
      const updatedPeopleList = await removeFromFavPeopleList(
        loggedInUser.username,
        loggedInUser.token,
        mal_id
      );
      if (updatedPeopleList) {
        setLocalStorage("loggedInUserFavPeopleList", updatedPeopleList);
        setInFavorites(false);
      }
      setClicked(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <button onClick={onClick} className="add-to-list-button">
        Remove from Favorites
      </button>
    </>
  );
};
export default RemoveFromFavPeopleButton;
