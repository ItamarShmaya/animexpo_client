import { useState } from "react";
import { useLoggedInUser } from "../../../../context/context_custom_hooks.js";
import { useLocalStorage } from "../../../../hooks/useLocalStorage.js";

const RemoveFromFavoriteButton = ({ id, setInFavorites, removeFromList, localStorageKey }) => {
  const { loggedInUser } = useLoggedInUser();
  const { setLocalStorage } = useLocalStorage();
  const [clicked, setClicked] = useState(false);

  const onClick = async () => {
    if (clicked) return;
    setClicked(true);
    try {
      const updatedList = await removeFromList(
        loggedInUser.username,
        loggedInUser.token,
        id
      );
      if (updatedList) {
        setLocalStorage(localStorageKey, updatedList);
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
export default RemoveFromFavoriteButton;
