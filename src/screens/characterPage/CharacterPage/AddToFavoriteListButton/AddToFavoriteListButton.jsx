import { useLoggedInUser } from "../../../../context/context_custom_hooks.js";
import { useLocalStorage } from "../../../../hooks/useLocalStorage.js";
import { useState } from "react";
import MustBeLoggedIn from "../../../../components/MustBeLoggedIn/MustBeLoggedIn.jsx";
import InlineSpinner from "../../../../components/Spinner/InlineSpinner.jsx";
import itachi from "../../../../components/Spinner/spinnerImages/itachi.png";

const AddToFavoriteListButton = ({
  id,
  name,
  image,
  setInFavorites,
  addToList,
  localStorageKey,
}) => {
  const { loggedInUser } = useLoggedInUser();
  const { saveToLoggedUser } = useLocalStorage();
  const [displayMessage, setDisplayMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    if (!loggedInUser) {
      setIsLoading(false);
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
          saveToLoggedUser(localStorageKey, updatedCharacterList);
          setInFavorites(true);
        }
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    }
  };
  return (
    <>
      <button onClick={onClick} className="add-to-list-button">
        {isLoading ? (
          <InlineSpinner image={itachi} width={20} height={20} />
        ) : (
          "Add to Favorites"
        )}
      </button>
      {displayMessage && (
        <MustBeLoggedIn setDisplayMessage={setDisplayMessage} />
      )}
    </>
  );
};
export default AddToFavoriteListButton;
