import { useEffect, useState } from "react";
import Profile from "./Profile";
import "./ProfilePage.css";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate, useParams } from "react-router-dom";
import { useLoggedInUser } from "../../context/context_custom_hooks";
import {
  getUserAnimeList,
  getUserMangaList,
  getUserProfileData,
} from "../../apis/animexpo/animexpo_requests";
import MobileProfilePage from "./MobileProfilePage/MobileProfilePage";

const ProfilePage = () => {
  const { getLocalStorage } = useLocalStorage();
  const navigate = useNavigate();
  const { loggedInUser } = useLoggedInUser();
  const { username } = useParams();
  const [viewedProfile, setViewedProfile] = useState(null);
  const [viewedUserAnimeList, setViewedUserAnimeList] = useState(null);
  const [viewedUserMangaList, setViewedUserMangaList] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      if (username === loggedInUser?.username) {
        const profileData = getLocalStorage("loggedInUserProfileData");
        const FavCharList = getLocalStorage("loggedInUserFavCharsList");
        const FavPeopleList = getLocalStorage("loggedInUserFavPeopleList");
        const friendsList = getLocalStorage("loggedInUserFriendsList");
        const animeList = getLocalStorage("loggedInUserAnimeList");
        const mangaList = getLocalStorage("loggedInUserMangaList");
        profileData.favoriteCharacters = FavCharList;
        profileData.favoritePeople = FavPeopleList;
        profileData.friendsList = friendsList;
        setViewedProfile(profileData);
        setViewedUserAnimeList(animeList);
        setViewedUserMangaList(mangaList);
      } else {
        try {
          const profileData = await getUserProfileData(username);
          if (profileData) setViewedProfile(profileData);
          const animeList = await getUserAnimeList(username);
          if (animeList) setViewedUserAnimeList(animeList);
          const mangaList = await getUserMangaList(username);
          if (mangaList) setViewedUserMangaList(mangaList);
        } catch (e) {
          if (e === "UserNotFound") {
            navigate("/notfound");
          }
        }
      }
    };
    getUserProfile();

    // eslint-disable-next-line
  }, [loggedInUser?.username, username, navigate]);

  return (
    <div className="profile-page">
      {viewedProfile &&
        (window.innerWidth > 1000 ? (
          <Profile
            viewedProfile={viewedProfile}
            setViewedProfile={setViewedProfile}
            viewedUserAnimeList={viewedUserAnimeList}
            viewedUserMangaList={viewedUserMangaList}
          />
        ) : (
          <MobileProfilePage
            viewedProfile={viewedProfile}
            setViewedProfile={setViewedProfile}
            viewedUserAnimeList={viewedUserAnimeList}
            viewedUserMangaList={viewedUserMangaList}
          />
        ))}
    </div>
  );
};
export default ProfilePage;
