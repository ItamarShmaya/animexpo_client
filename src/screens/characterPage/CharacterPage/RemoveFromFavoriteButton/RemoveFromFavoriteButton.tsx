import { useState, JSX } from "react";
import { useLoggedInUser } from "../../../../context/context_custom_hooks";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import InlineSpinner from "../../../../components/Spinner/InlineSpinner";
import itachi from "../../../../components/Spinner/spinnerImages/itachi.png";
import { RemoveFromFavoriteButtonProps } from "./RemoveFromFavoriteButton.types";

const RemoveFromFavoriteButton = ({
  id,
  setInFavorites,
  removeFromList,
  localStorageKey,
}: RemoveFromFavoriteButtonProps): JSX.Element => {
  const { loggedInUser } = useLoggedInUser();
  const { saveToLoggedUser } = useLocalStorage();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const updatedList = await removeFromList(
        loggedInUser.username,
        loggedInUser.token,
        id
      );
      if (updatedList) {
        saveToLoggedUser(localStorageKey, updatedList);
        setInFavorites(false);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };
  return (
    <>
      <button onClick={onClick} className="add-to-list-button">
        {isLoading ? (
          <InlineSpinner image={itachi} spinnerWidth={20} spinnerHeight={20} />
        ) : (
          "Remove from Favorites"
        )}
      </button>
    </>
  );
};
export default RemoveFromFavoriteButton;
