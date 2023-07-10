import { useEffect, useState, JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLoggedInUser } from "../../context/context_custom_hooks";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Spinner from "../../components/Spinner/Spinner";
import UserList from "../animeListPage/UserList/UserList";
import MangaListItem from "./MangaListItem/MangaListItem";
import { getUserMangaList } from "../../apis/animexpo/animexpo_requests";
import MobileUserList from "../animeListPage/MobileAnimeList/MobileUserList";
import MobileUserListItem from "../animeListPage/MobileAnimeList/MobileAnimeListItem/MobileUserListItem";
import MangaStatusMenu from "./MangaStatusMenu/MangaStatusMenu";
import SideMenu from "../profile/SideMenu/SideMenu";
import { updateMangaEntry } from "../animeListPage/userListUtils";
import naka from "../../components/Spinner/spinnerImages/naka.png";
import { UserMediaEntry } from "../../apis/animexpo/animexpo_updates.types";

const MangaListPage = (): JSX.Element => {
  const [userMangaList, setUserMangaList] = useState<UserMediaEntry[]>([]);
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
    const getMangaList = async () => {
      if (loggedInUser?.username === username) {
        const mangalist = getLocalStorage("loggedUser").mangaList;
        setUserMangaList(mangalist.list);
        setIsLoading(false);
        return;
      }
      try {
        const mangaList = await getUserMangaList(username);
        setUserMangaList(mangaList.list);
        setIsLoading(false);
      } catch (e) {
        if (e === "UserNotFound") navigate("/notfound");
      }
    };
    getMangaList();
  }, [username, loggedInUser?.username, getLocalStorage, navigate]);

  return (
    <>
      {isLoading ? (
        <Spinner image={naka} />
      ) : !isMobileWidth ? (
        <>
          <SideMenu username={username} />
          <UserList
            userList={userMangaList}
            setUserList={setUserMangaList}
            username={username}
            ListItem={MangaListItem}
            StatusMenu={MangaStatusMenu}
          />
        </>
      ) : (
        <>
          <SideMenu username={username} />
          <MobileUserList
            userList={userMangaList}
            setUserList={setUserMangaList}
            username={username}
            ListItem={MobileUserListItem}
            updateEntry={updateMangaEntry}
            mediaType={"manga"}
          />
        </>
      )}
    </>
  );
};
export default MangaListPage;
