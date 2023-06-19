import "./AddToAnimeListButton.css";
import { useState } from "react";
import { useLoggedInUser } from "../../../../context/context_custom_hooks.js";
import { useLocalStorage } from "../../../../hooks/useLocalStorage.js";
import {
  addToAnimeList,
  removeFromAnimeList,
} from "../../../../apis/animexpo/animexpo_updates.js";
import MustBeLoggedIn from "../../../../components/MustBeLoggedIn/MustBeLoggedIn";
import InlineSpinner from "../../../../components/Spinner/InlineSpinner";
import itachi from "../../../../components/Spinner/spinnerImages/itachi.png";

const AddToAnimeListButton = ({
  id,
  title,
  image,
  format,
  episodes,
  inList,
  setInList,
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
      const animeEntry = {
        id,
        title,
        image,
        format,
        status: "Watching",
        score: 1,
        comment: "",
        episodes: episodes || 9999,
        progress: 1,
      };

      try {
        const updatedAnimeList = await addToAnimeList(
          loggedInUser.username,
          loggedInUser.token,
          animeEntry
        );

        if (updatedAnimeList) {
          saveToLoggedUser("animeList", updatedAnimeList);
          setInList(true);
        }
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    }
  };

  const onRemoveClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const updatedAnimeList = await removeFromAnimeList(
        loggedInUser.username,
        loggedInUser.token,
        id
      );
      if (updatedAnimeList) {
        saveToLoggedUser("animeList", updatedAnimeList);
        setInList(false);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const renderAddToButton = () => {
    if (loggedInUser) {
      if (inList) {
        return (
          <div className="remove-from-list" onClick={onRemoveClick}>
            {isLoading ? (
              <InlineSpinner image={itachi} width={20} height={20} />
            ) : (
              "Remove from list"
            )}
          </div>
        );
      }
    }
    return (
      <button onClick={onClick} className="add-to-list-button">
        {isLoading ? (
          <InlineSpinner image={itachi} width={20} height={20} />
        ) : (
          "Add to List"
        )}
      </button>
    );
  };
  return (
    <>
      {renderAddToButton()}
      {displayMessage && (
        <MustBeLoggedIn setDisplayMessage={setDisplayMessage} />
      )}
    </>
  );
};
export default AddToAnimeListButton;
