import "../../../animepage/AnimePage/AddToAnimeListButton/AddToAnimeListButton.css";
import MustBeLoggedIn from "../../../../components/MustBeLoggedIn/MustBeLoggedIn";
import { useLoggedInUser } from "../../../../context/context_custom_hooks.js";
import { useLocalStorage } from "../../../../hooks/useLocalStorage.js";
import { useState } from "react";
import {
  addToMangaList,
  removeFromMangaList,
} from "../../../../apis/animexpo/animexpo_updates.js";
import InlineSpinner from "../../../../components/Spinner/InlineSpinner";
import itachi from "../../../../components/Spinner/spinnerImages/itachi.png";

const AddToMangaListButton = ({
  id,
  title,
  image,
  format,
  volumes,
  inList,
  setInList,
}) => {
  const { loggedInUser } = useLoggedInUser();
  const { setLocalStorage } = useLocalStorage();
  const [displayMessage, setDisplayMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    if (!loggedInUser) {
      setIsLoading(false);
      setDisplayMessage(true);
    } else {
      const mangaEntry = {
        id,
        title,
        image,
        format,
        status: "Reading",
        volumes: volumes || 1,
        score: 1,
        comment: "",
        progress: 1,
      };

      try {
        const updatedMangaList = await addToMangaList(
          loggedInUser.username,
          loggedInUser.token,
          mangaEntry
        );
        if (updatedMangaList) {
          setLocalStorage("loggedInUserMangaList", updatedMangaList);
          setInList(true);
        }
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onRemoveClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const updatedAnimeList = await removeFromMangaList(
        loggedInUser.username,
        loggedInUser.token,
        id
      );
      if (updatedAnimeList) {
        setLocalStorage("loggedInUserMangaList", updatedAnimeList);
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
export default AddToMangaListButton;
