import "./Profile.css";
import { useEffect, useState } from "react";
import SideMenu from "./SideMenu/SideMenu";
import UserInfo from "./UserInfo/UserInfo";
import { useParams, useNavigate } from "react-router-dom";
import { getUserProfileData } from "../../apis/animexpo/animexpo_requests.js";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { useLoggedInUser } from "../../context/context_custom_hooks.js";
import {
  profileCarouselForwardButton,
  profileCarouselBackwardButton,
  profileCarouselResponsive,
} from "../../components/SimplyCarousel/profilePageCarouselSettings.js";
import FavoriteCard from "./FavoriteCard/FavoriteCard";
import SimplyCarousel from "../../components/SimplyCarousel/SimplyCarousel";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [viewedProfile, setViewedProfile] = useState(null);
  const { getLocalStorage } = useLocalStorage();
  const { loggedInUser } = useLoggedInUser();

  useEffect(() => {
    const getUserProfile = async () => {
      if (username === loggedInUser?.username) {
        const profileData = getLocalStorage("loggedInUserProfileData");
        const FavCharList = getLocalStorage("loggedInUserFavCharsList");
        const FavPeopleList = getLocalStorage("loggedInUserFavPeopleList");
        profileData.favoriteCharacters = FavCharList;
        profileData.favoritePeople = FavPeopleList;
        setViewedProfile(profileData);
      } else {
        try {
          const profileData = await getUserProfileData(username);
          if (profileData) {
            setViewedProfile(profileData);
          }
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

  const renderFavoriteList = (list, type) => {
    return list.map((item) => {
      return (
        <FavoriteCard
          type={type}
          key={item.mal_id}
          mal_id={item.mal_id}
          name={item.name}
          image={item.image}
          cardHeight={90}
          cardWidth={70}
        />
      );
    });
  };

  return (
    <div className="profile-page">
      {viewedProfile && (
        <>
          <SideMenu username={username} />
          <main className="main-profile-content">
            <div className="main-profile-content__left-side">
              <div className="user-info">
                <UserInfo profile={viewedProfile} username={username} />
              </div>
            </div>
            <div className="main-profile-content__right-side">
              <div className="profile-content">
                <h1 className="profile-heading">{username}</h1>
                <div className="about-me">
                  {viewedProfile.personalInfo.aboutMe}
                </div>
                <div className="fav-lists">
                  {viewedProfile.favoriteCharacters.list.length > 0 && (
                    <div className="fav-char">
                      <h1>
                        Favorite Characters (
                        {viewedProfile.favoriteCharacters.list.length})
                      </h1>
                      <SimplyCarousel
                        itemsToShow={12}
                        itemsToScroll={1}
                        forwardBtnProps={profileCarouselForwardButton}
                        backwardBtnProps={profileCarouselBackwardButton}
                        responsiveProps={profileCarouselResponsive}
                      >
                        {renderFavoriteList(
                          viewedProfile.favoriteCharacters.list,
                          "characters"
                        )}
                      </SimplyCarousel>
                    </div>
                  )}
                  {viewedProfile.favoritePeople.list.length > 0 && (
                    <div className="fav-people">
                      <h1>
                        Favorite People (
                        {viewedProfile.favoritePeople.list.length})
                      </h1>
                      <SimplyCarousel
                        itemsToShow={12}
                        itemsToScroll={1}
                        forwardBtnProps={profileCarouselForwardButton}
                        backwardBtnProps={profileCarouselBackwardButton}
                        responsiveProps={profileCarouselResponsive}
                      >
                        {renderFavoriteList(
                          viewedProfile.favoritePeople.list,
                          "people"
                        )}
                      </SimplyCarousel>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};
export default Profile;
