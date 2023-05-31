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
}) => {
  const { username } = useParams();
  return (
    <>
      <SideMenu username={username} />
      <main className="main-profile-content">
        <div className="main-profile-content__left-side">
          <div className="user-info">
            <UserInfo
              profile={viewedProfile}
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
                <div className="fav-char">
                  <h1>
                    Favorite Characters (
                    {viewedProfile.favoriteCharacters.list.length})
                  </h1>
                  <FavoriteList
                    favList={viewedProfile.favoriteCharacters.list}
                    type={"characters"}
                  />
                  <hr />
                </div>
              )}
              {viewedProfile.favoritePeople.list.length > 0 && (
                <div className="fav-people">
                  <h1>
                    Favorite People ({viewedProfile.favoritePeople.list.length})
                  </h1>
                  <FavoriteList
                    favList={viewedProfile.favoritePeople.list}
                    type={"people"}
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
