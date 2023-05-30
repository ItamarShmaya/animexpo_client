import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLoggedInUser } from "../../context/context_custom_hooks.js";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import "./MangaListPage.css";
import UserList from "../animeListPage/UserList/UserList.jsx";
import MangaListItem from "./MangaListItem/MangaListItem.jsx";
import { getUserMangaList } from "../../apis/animexpo/animexpo_requests.js";
import MobileMangaList from "./MobileMangaList/MobileMangaList.jsx";
import MobileMangaListItem from "./MobileMangaList/MobileMangaListItem/MobileMangaListItem.jsx";
import MangaStatusMenu from "./MangaStatusMenu/MangaStatusMenu.jsx";

const MangaListPage = () => {
  const [userMangaList, setUserMangaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useParams();
  const { loggedInUser } = useLoggedInUser();
  const { getLocalStorage } = useLocalStorage();
  const navigate = useNavigate();

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
    // eslint-disable-next-line
  }, [username, loggedInUser?.username]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : window.innerWidth > 1000 ? (
        <UserList
          userList={userMangaList}
          setUserList={setUserMangaList}
          username={username}
          ListItem={MangaListItem}
          StatusMenu={MangaStatusMenu}
        />
      ) : (
        <MobileMangaList
          userList={userMangaList}
          setUserList={setUserMangaList}
          username={username}
          ListItem={MobileMangaListItem}
        />
      )}
    </>
  );
};
export default MangaListPage;
