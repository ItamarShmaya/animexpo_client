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
import obito from "../../components/Spinner/obito.png";
import Spinner from "../../components/Spinner/Spinner";
import {
  profileCarouselResponsive,
  profileMobileCarouselResponsive,
} from "../../components/SimplyCarousel/carouselSettings";

const ProfilePage = () => {
  const { getLocalStorage } = useLocalStorage();
  const navigate = useNavigate();
  const { loggedInUser } = useLoggedInUser();
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useParams();
  const [viewedProfile, setViewedProfile] = useState(null);
  const [viewedUserAnimeList, setViewedUserAnimeList] = useState(null);
  const [viewedUserMangaList, setViewedUserMangaList] = useState(null);
  const [isMobileWidth, setIsMobileWidth] = useState(
    window.innerWidth <= 1000 ? true : false
  );
  const query = matchMedia("(max-width: 1000px)");
  query.addEventListener("change", () => {
    query.matches ? setIsMobileWidth(true) : setIsMobileWidth(false);
  });

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
        setIsLoading(false);
      } else {
        try {
          const profileData = await getUserProfileData(username);
          if (profileData) setViewedProfile(profileData);
          const animeList = await getUserAnimeList(username);
          if (animeList) setViewedUserAnimeList(animeList);
          const mangaList = await getUserMangaList(username);
          if (mangaList) setViewedUserMangaList(mangaList);
          setIsLoading(false);
        } catch (e) {
          if (e === "UserNotFound") {
            navigate("/notfound");
          }
        }
      }
    };
    getUserProfile();
  }, [loggedInUser?.username, username, navigate, getLocalStorage]);

  return (
    <div className="profile-page">
      {isLoading ? (
        <Spinner image={obito} />
      ) : !isMobileWidth ? (
        <Profile
          viewedProfile={viewedProfile}
          setViewedProfile={setViewedProfile}
          viewedUserAnimeList={viewedUserAnimeList}
          viewedUserMangaList={viewedUserMangaList}
          profileCarouselResponsive={profileCarouselResponsive}
        />
      ) : (
        <MobileProfilePage
          viewedProfile={viewedProfile}
          setViewedProfile={setViewedProfile}
          viewedUserAnimeList={viewedUserAnimeList}
          viewedUserMangaList={viewedUserMangaList}
          profileCarouselResponsive={profileMobileCarouselResponsive}
        />
      )}
    </div>
  );
};
export default ProfilePage;
