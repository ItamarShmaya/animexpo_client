import "./AnimeListPage.css";
import UserList from "./UserList/UserList";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { getUserAnimeList } from "../../apis/animexpo/animexpo_requests.js";
import { useLoggedInUser } from "../../context/context_custom_hooks.js";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import AnimeListItem from "./UserList/AnimeListItem/AnimeListItem";

const AnimeListPage = () => {
  const [userAnimeList, setUserAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useParams();
  const { loggedInUser } = useLoggedInUser();
  const { getLocalStorage } = useLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    const getAnimeList = async () => {
      if (loggedInUser?.username === username) {
        const animeList = getLocalStorage("loggedInUserAnimeList");
        setUserAnimeList(animeList.list);
        setIsLoading(false);
        return;
      }
      try {
        const animeList = await getUserAnimeList(username);
        setUserAnimeList(animeList.list);
        setIsLoading(false);
      } catch (e) {
        if (e === "UserNotFound") navigate("/notfound");
      }
    };
    getAnimeList();
    // eslint-disable-next-line
  }, [username, loggedInUser?.username]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <UserList
          userList={userAnimeList}
          setUserList={setUserAnimeList}
          username={username}
          ListItem={AnimeListItem}
        />
      )}
    </>
  );
};
export default AnimeListPage;
