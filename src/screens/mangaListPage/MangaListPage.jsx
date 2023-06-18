import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLoggedInUser } from "../../context/context_custom_hooks.js";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import UserList from "../animeListPage/UserList/UserList.jsx";
import MangaListItem from "./MangaListItem/MangaListItem.jsx";
import { getUserMangaList } from "../../apis/animexpo/animexpo_requests.js";
import MobileUserList from "../animeListPage/MobileAnimeList/MobileUserList.jsx";
import MobileUserListItem from "../animeListPage/MobileAnimeList/MobileAnimeListItem/MobileUserListItem.jsx";
import MangaStatusMenu from "./MangaStatusMenu/MangaStatusMenu.jsx";
import SideMenu from "../profile/SideMenu/SideMenu.jsx";
import { updateMangaEntry } from "../animeListPage/userListUtils.js";
import naka from "../../components/Spinner/spinnerImages/naka.png";

const MangaListPage = () => {
  const [userMangaList, setUserMangaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useParams();
  const { loggedInUser } = useLoggedInUser();
  const { getLocalStorage } = useLocalStorage();
  const navigate = useNavigate();
  const [isMobileWidth, setIsMobileWidth] = useState(
    window.innerWidth <= 1000 ? true : false
  );
  const query = matchMedia("(max-width: 1000px)");
  query.addEventListener("change", () => {
    query.matches ? setIsMobileWidth(true) : setIsMobileWidth(false);
  });

  useEffect(() => {
    const getMangaList = async () => {
      if (loggedInUser?.username === username) {
        const mangalist = getLocalStorage("loggedInUserMangaList");
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
            type={"manga"}
          />
        </>
      )}
    </>
  );
};
export default MangaListPage;
