import { useLoggedInUser } from "../../../../context/context_custom_hooks";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { useState, JSX } from "react";
import MustBeLoggedIn from "../../../../components/MustBeLoggedIn/MustBeLoggedIn";
import InlineSpinner from "../../../../components/Spinner/InlineSpinner";
import itachi from "../../../../components/Spinner/spinnerImages/itachi.png";
import { AddToFavoriteListButtonProps } from "./AddToFavoriteListButton.types";

const AddToFavoriteListButton = ({
  id,
  name,
  image,
  setInFavorites,
  addToList,
  localStorageKey,
}: AddToFavoriteListButtonProps): JSX.Element => {
  const { loggedInUser } = useLoggedInUser();
  const { saveToLoggedUser } = useLocalStorage();
  const [displayMessage, setDisplayMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
          <InlineSpinner image={itachi} spinnerWidth={20} spinnerHeight={20} />
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
