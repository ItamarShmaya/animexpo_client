import "../../../animepage/AnimePage/AddToAnimeListButton/AddToAnimeListButton.css";
import MustBeLoggedIn from "../../../../components/MustBeLoggedIn/MustBeLoggedIn";
import { useLoggedInUser } from "../../../../context/context_custom_hooks.js";
import { useLocalStorage } from "../../../../hooks/useLocalStorage.js";
import { useState } from "react";
import { addToMangaList } from "../../../../apis/animexpo/animexpo_updates.js";

const AddToMangaListButton = ({ manga, setWatching }) => {
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
      const { mal_id, title, images, type, volumes } = manga;
      const mangaEntry = {
        mal_id,
        title,
        image: images.jpg.image_url,
        type,
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
        setLocalStorage("loggedInUserMangaList", updatedMangaList);
        setClicked(false);
        setWatching(true);
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
export default AddToMangaListButton;
