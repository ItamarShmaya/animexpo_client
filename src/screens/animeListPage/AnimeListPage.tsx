import UserList from "./UserList/UserList";
import { useEffect, useState, JSX } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { getUserAnimeList } from "../../apis/animexpo/animexpo_requests";
import { useLoggedInUser } from "../../context/context_custom_hooks";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import AnimeListItem from "./UserList/AnimeListItem/AnimeListItem";
import MobileUserList from "./MobileAnimeList/MobileUserList";
import MobileUserListItem from "./MobileAnimeList/MobileAnimeListItem/MobileUserListItem";
import AnimeStatusMenu from "./UserList/AnimeStatusMenu/AnimeStatusMenu";
import SideMenu from "../profile/SideMenu/SideMenu";
import { updateAnimeEntry } from "./userListUtils";
import sasuke from "../../components/Spinner/spinnerImages/sasuke-eternal.png";
import {
  UserAnimeEntry,
  UserMediaEntry,
} from "../../apis/animexpo/animexpo_updates.types";

const AnimeListPage = (): JSX.Element => {
  const [userAnimeList, setUserAnimeList] = useState<UserMediaEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { username } = useParams() as { username: string };
  const { loggedInUser } = useLoggedInUser();
  const { getLocalStorage } = useLocalStorage();
  const navigate = useNavigate();
  const [isMobileWidth, setIsMobileWidth] = useState<boolean>(
    window.innerWidth <= 1000 ? true : false
  );
  const query = matchMedia("(max-width: 1000px)");
  query.addEventListener("change", () => {
    query.matches ? setIsMobileWidth(true) : setIsMobileWidth(false);
  });

  useEffect(() => {
    const getAnimeList = async () => {
      if (loggedInUser?.username === username) {
        const animeList = getLocalStorage("loggedUser").animeList;
        const sortedList = [...animeList.list].sort((item1, item2) => {
          return item1.title
            .toLowerCase()
            .localeCompare(item2.title.toLowerCase());
        });
        setUserAnimeList(sortedList);
        setIsLoading(false);
        return;
      }
      try {
        const animeList = await getUserAnimeList(username);
        const sortedList = [...animeList.list].sort((item1, item2) => {
          return item1.title
            .toLowerCase()
            .localeCompare(item2.title.toLowerCase());
        });
        setUserAnimeList(sortedList);
        setIsLoading(false);
      } catch (e) {
        if (e === "UserNotFound") navigate("/notfound");
      }
    };
    getAnimeList();
  }, [username, loggedInUser?.username, getLocalStorage, navigate]);

  return (
    <>
      {isLoading ? (
        <Spinner image={sasuke} />
      ) : !isMobileWidth ? (
        <>
          <SideMenu username={username} />
          <UserList
            userList={userAnimeList}
            setUserList={setUserAnimeList}
            username={username}
            ListItem={AnimeListItem}
            StatusMenu={AnimeStatusMenu}
          />
        </>
      ) : (
        <>
          <SideMenu username={username} />
          <MobileUserList
            userList={userAnimeList as UserAnimeEntry[]}
            setUserList={setUserAnimeList}
            username={username}
            ListItem={MobileUserListItem}
            updateEntry={updateAnimeEntry}
            mediaType={"anime"}
          />
        </>
      )}
    </>
  );
};
export default AnimeListPage;
