import "./Profile.css";
import SideMenu from "./SideMenu/SideMenu";
import UserInfo from "./UserInfo/UserInfo";
import { useParams } from "react-router-dom";
import Statistics from "./Statistics/Statistics";
import Favorites from "./Favorites/Favorites";
import {
  UserAnimeList,
  UserMangaList,
  UserProfileData,
} from "../../apis/animexpo/animexpo_updates.types";
import { SimplyCarouselresponsivePropsType } from "../../components/SimplyCarousel/SimplyCarousel.types";
import { JSX } from "react";

export interface ProfileProps {
  viewedProfile: UserProfileData;
  setViewedProfile: React.Dispatch<React.SetStateAction<UserProfileData>>;
  viewedUserAnimeList: UserAnimeList;
  viewedUserMangaList: UserMangaList;
  profileCarouselResponsive: SimplyCarouselresponsivePropsType[];
}

const Profile = ({
  viewedProfile,
  setViewedProfile,
  viewedUserAnimeList,
  viewedUserMangaList,
  profileCarouselResponsive,
}: ProfileProps): JSX.Element => {
  const { username } = useParams() as { username: string };
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
            <div className="about-me"></div>
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
