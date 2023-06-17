import "./Profile.css";
import SideMenu from "./SideMenu/SideMenu";
import UserInfo from "./UserInfo/UserInfo";
import { useParams } from "react-router-dom";
import Statistics from "./Statistics/Statistics";
import FavoriteList from "./FavoriteList/FavoriteList";

const Profile = ({
  viewedProfile,
  setViewedProfile,
  viewedUserAnimeList,
  viewedUserMangaList,
  profileCarouselResponsive
}) => {
  const { username } = useParams();
  return (
    <>
      <SideMenu username={username} />
      <main className="main-profile-content">
        <div className="main-profile-content__left-side">
          <div className="user-info">
            <UserInfo
              viewedProfile={viewedProfile}
              username={username}
              setViewedProfile={setViewedProfile}
            />
          </div>
        </div>
        <div className="main-profile-content__right-side">
          <div className="profile-content">
            <h1 className="profile-heading">
              {viewedProfile.personalInfo.displayName}
            </h1>
            <div className="about-me">{viewedProfile.personalInfo.aboutMe}</div>
            <div className="statistics">
              <Statistics
                viewedUserAnimeList={viewedUserAnimeList}
                viewedUserMangaList={viewedUserMangaList}
              />
              <div className="manga-stats"></div>
            </div>
            <div className="fav-lists">
              {viewedProfile.favoriteCharacters.list.length > 0 && (
                <div className="fav-list">
                  <h2>
                    Favorite Characters (
                    {viewedProfile.favoriteCharacters.list.length})
                  </h2>
                  <FavoriteList
                    favList={viewedProfile.favoriteCharacters.list}
                    type={"characters"}
                    profileCarouselResponsive={profileCarouselResponsive}
                  />
                  <hr />
                </div>
              )}
              {viewedProfile.favoritePeople.list.length > 0 && (
                <div className="fav-list">
                  <h2>
                    Favorite People ({viewedProfile.favoritePeople.list.length})
                  </h2>
                  <FavoriteList
                    favList={viewedProfile.favoritePeople.list}
                    type={"people"}
                    profileCarouselResponsive={profileCarouselResponsive}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Profile;
