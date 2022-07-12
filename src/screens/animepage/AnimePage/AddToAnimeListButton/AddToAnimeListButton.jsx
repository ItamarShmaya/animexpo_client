import "./AddToAnimeListButton.css";
import { useState } from "react";
import { useLoggedInUser } from "../../../../context/context_custom_hooks.js";
import { useLocalStorage } from "../../../../hooks/useLocalStorage.js";
import { addToAnimeList } from "../../../../apis/animexpo/animexpo_updates.js";
import MustBeLoggedIn from "../../../../components/MustBeLoggedIn/MustBeLoggedIn";

const AddToAnimeListButton = ({ anime, setWatching }) => {
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
      const { mal_id, title, images, type, episodes } = anime;
      const animeEntry = {
        mal_id,
        title,
        image: images.jpg.image_url,
        type,
        status: "Watching",
        score: 1,
        comment: "",
        episodes,
        progress: 1,
      };

      try {
        const updatedAnimeList = await addToAnimeList(
          loggedInUser.username,
          loggedInUser.token,
          animeEntry
        );

        if (updatedAnimeList) {
          setLocalStorage("loggedInUserAnimeList", updatedAnimeList);
          setWatching(true);
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
        Add to List
      </button>
      {displayMessage && (
        <MustBeLoggedIn setDisplayMessage={setDisplayMessage} />
      )}
    </>
  );
};
export default AddToAnimeListButton;
