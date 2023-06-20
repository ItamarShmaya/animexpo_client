import "./Profile.css";
import SideMenu from "./SideMenu/SideMenu";
import UserInfo from "./UserInfo/UserInfo";
import { useParams } from "react-router-dom";
import Statistics from "./Statistics/Statistics";
import Favorites from "./Favorites/Favorites";

const Profile = ({
  viewedProfile,
  setViewedProfile,
  viewedUserAnimeList,
  viewedUserMangaList,
  profileCarouselResponsive,
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
            <Favorites
              viewedProfile={viewedProfile}
              profileCarouselResponsive={profileCarouselResponsive}
            />
          </div>
        </div>
      </main>
    </>
  );
};
export default Profile;
