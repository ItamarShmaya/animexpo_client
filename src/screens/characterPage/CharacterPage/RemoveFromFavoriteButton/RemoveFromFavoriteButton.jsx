import { useState } from "react";
import { useLoggedInUser } from "../../../../context/context_custom_hooks.js";
import { useLocalStorage } from "../../../../hooks/useLocalStorage.js";
import InlineSpinner from "../../../../components/Spinner/InlineSpinner.jsx";
import itachi from "../../../../components/Spinner/spinnerImages/itachi.png";

const RemoveFromFavoriteButton = ({
  id,
  setInFavorites,
  removeFromList,
  localStorageKey,
}) => {
  const { loggedInUser } = useLoggedInUser();
  const { setLocalStorage } = useLocalStorage();
  const [isLoading, setIsLoading] = useState(false);

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
        setLocalStorage(localStorageKey, updatedList);
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
          <InlineSpinner image={itachi} width={20} height={20} />
        ) : (
          "Remove from Favorites"
        )}
      </button>
    </>
  );
};
export default RemoveFromFavoriteButton;
