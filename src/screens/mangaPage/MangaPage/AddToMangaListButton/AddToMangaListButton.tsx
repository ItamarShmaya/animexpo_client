import "../../../animepage/AnimePage/AddToAnimeListButton/AddToAnimeListButton.css";
import MustBeLoggedIn from "../../../../components/MustBeLoggedIn/MustBeLoggedIn";
import { useLoggedInUser } from "../../../../context/context_custom_hooks";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { useState, JSX } from "react";
import {
  addToMangaList,
  removeFromMangaList,
} from "../../../../apis/animexpo/animexpo_updates";
import InlineSpinner from "../../../../components/Spinner/InlineSpinner";
import itachi from "../../../../components/Spinner/spinnerImages/itachi.png";
import { AddToMangaListButtonProps } from "./AddToMangaListButton.types";

const AddToMangaListButton = ({
  id,
  title,
  image,
  format,
  volumes,
  inList,
  setInList,
}: AddToMangaListButtonProps): JSX.Element => {
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
      const mangaEntry = {
        id,
        title,
        image,
        format,
        status: "Reading" as const,
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
          saveToLoggedUser("mangaList", updatedMangaList);
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
      const updatedMangaList = await removeFromMangaList(
        loggedInUser.username,
        loggedInUser.token,
        id
      );
      if (updatedMangaList) {
        saveToLoggedUser("mangaList", updatedMangaList);
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
              <InlineSpinner
                image={itachi}
                spinnerWidth={20}
                spinnerHeight={20}
              />
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
          <InlineSpinner image={itachi} spinnerWidth={20} spinnerHeight={20} />
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
