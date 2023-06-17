import { useLoggedInUser } from "../../../../context/context_custom_hooks.js";
import { useLocalStorage } from "../../../../hooks/useLocalStorage.js";
import { useState } from "react";
import MustBeLoggedIn from "../../../../components/MustBeLoggedIn/MustBeLoggedIn.jsx";

const AddToFavoriteListButton = ({
  id,
  name,
  image,
  setInFavorites,
  addToList,
  localStorageKey,
}) => {
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
      const characterEntry = {
        id,
        name,
        image,
      };

      try {
        const updatedCharacterList = await addToList(
          loggedInUser.username,
          loggedInUser.token,
          characterEntry
        );
        if (updatedCharacterList) {
          setLocalStorage(localStorageKey, updatedCharacterList);
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
export default AddToFavoriteListButton;
