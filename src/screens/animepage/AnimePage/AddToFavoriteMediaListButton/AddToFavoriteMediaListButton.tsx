import { useState, JSX } from "react";
import { useLoggedInUser } from "../../../../context/context_custom_hooks";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import "./AddToFavoriteButton.css";
import MustBeLoggedIn from "../../../../components/MustBeLoggedIn/MustBeLoggedIn";
import { AddToFavoriteMediaListButtonProps } from "./AddToFavoriteMediaListButton.types";

const AddToFavoriteMediaListButton = ({
  id,
  title,
  image,
  inFavList,
  setInFavList,
  addToFavorite,
  removeFromFavorite,
  favoriteListName,
}: AddToFavoriteMediaListButtonProps): JSX.Element => {
  const { loggedInUser } = useLoggedInUser();
  const { saveToLoggedUser } = useLocalStorage();
  const [displayMessage, setDisplayMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onAddToFavListClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    if (!loggedInUser) {
      setIsLoading(false);
      setDisplayMessage(true);
    } else {
      const animeEntry = {
        id,
        title: title as string,
        image: image as string,
      };

      try {
        const updatedFavoreList = await addToFavorite(
          loggedInUser.username,
          loggedInUser.token,
          animeEntry
        );

        if (updatedFavoreList) {
          saveToLoggedUser(favoriteListName, updatedFavoreList);
          setInFavList(true);
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
      const updatedFavoriteList = await removeFromFavorite(
        loggedInUser.username,
        loggedInUser.token,
        id
      );
      if (updatedFavoriteList) {
        saveToLoggedUser(favoriteListName, updatedFavoriteList);
        setInFavList(false);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const renderAddToFavButton = () => {
    if (loggedInUser) {
      if (inFavList) {
        return (
          <div
            className="remove-from-fav-list"
            data-type="Remove"
            onClick={onRemoveClick}
          >
            <i className="fa-solid fa-heart fa-2x"></i>
          </div>
        );
      }
    }
    return (
      <div
        className="add-to-favorite"
        data-type="Add"
        onClick={onAddToFavListClick}
      >
        <i className="fa-solid fa-heart fa-2x"></i>
      </div>
    );
  };

  return (
    <>
      {renderAddToFavButton()}
      {displayMessage && (
        <MustBeLoggedIn setDisplayMessage={setDisplayMessage} />
      )}
    </>
  );
};

export default AddToFavoriteMediaListButton;
