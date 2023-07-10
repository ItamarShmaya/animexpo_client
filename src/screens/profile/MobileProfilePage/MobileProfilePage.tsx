import { useParams } from "react-router-dom";
import { JSX } from "react";
import SideMenu from "../SideMenu/SideMenu";
import "./MobileProfilePage.css";
import Avatar from "../Avatar/Avatar";
import UserFunction from "../UserFunction/UserFunction";
import PersonnalInfo from "../personnalInfo/PersonnalInfo";
import Statistics from "../Statistics/Statistics";
import Favorites from "../Favorites/Favorites";
import {
  UserAnimeList,
  UserMangaList,
  UserProfileData,
} from "../../../apis/animexpo/animexpo_updates.types";
import { SimplyCarouselresponsivePropsType } from "../../../components/SimplyCarousel/SimplyCarousel.types";

export interface MobileProfilePageProps {
  viewedProfile: UserProfileData;
  setViewedProfile: React.Dispatch<React.SetStateAction<UserProfileData>>;
  viewedUserAnimeList: UserAnimeList;
  viewedUserMangaList: UserMangaList;
  profileCarouselResponsive: SimplyCarouselresponsivePropsType[];
}

const MobileProfilePage = ({
  viewedProfile,
  setViewedProfile,
  viewedUserAnimeList,
  viewedUserMangaList,
  profileCarouselResponsive,
}: MobileProfilePageProps): JSX.Element => {
  const { username } = useParams() as { username: string };
  const { gender, birthday, joined, avatar, reviewsCount } =
    viewedProfile.personalInfo;

  return (
    <>
      {viewedProfile && (
        <div className="mobile-profile-page">
          <SideMenu username={username} />
          <div className="mobile-main-profile-content">
            <div className="avatar-user-function">
              <Avatar image={avatar.secure_url} width={100} height={125} />
              <UserFunction />
            </div>
            <hr />
            <PersonnalInfo
              username={username}
              gender={gender}
              birthday={birthday}
              joined={joined}
              reviewsCount={reviewsCount}
            />
            <hr />
            <Statistics
              viewedUserAnimeList={viewedUserAnimeList}
              viewedUserMangaList={viewedUserMangaList}
            />
            <Favorites
              viewedProfile={viewedProfile}
              profileCarouselResponsive={profileCarouselResponsive}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default MobileProfilePage;
