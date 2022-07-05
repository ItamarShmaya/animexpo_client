import "./AddToFavoriteCharButton.css";
import "../../../animepage/AnimePage/AddToAnimeListButton/AddToAnimeListButton.css";
import { useLoggedInUser } from "../../../../context/context_custom_hooks.js";
import { useLocalStorage } from "../../../../hooks/useLocalStorage.js";
import { useState } from "react";
import MustBeLoggedIn from "../../../../components/MustBeLoggedIn/MustBeLoggedIn";
import { addToFavCharList } from "../../../../apis/animexpo/animexpo_updates";

const AddToFavoriteCharButton = ({ character, setInFavorites }) => {
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
      const { mal_id, name, images } = character;
      const characterEntry = {
        mal_id,
        name,
        image: images.jpg.image_url,
      };

      try {
        const updatedCharacterList = await addToFavCharList(
          loggedInUser.username,
          loggedInUser.token,
          characterEntry
        );
        if (updatedCharacterList) {
          setLocalStorage("loggedInUserFavCharsList", updatedCharacterList);
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
export default AddToFavoriteCharButton;
