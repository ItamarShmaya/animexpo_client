import { useParams } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";
import "./MobileProfilePage.css";
import Avatar from "../Avatar/Avatar";
import UserFunction from "../UserFunction/UserFunction";
import PersonnalInfo from "../personnalInfo/PersonnalInfo";
import Statistics from "../Statistics/Statistics";
import Favorites from "../Favorites/Favorites";

const MobileProfilePage = ({
  viewedProfile,
  setViewedProfile,
  viewedUserAnimeList,
  viewedUserMangaList,
  profileCarouselResponsive,
}) => {
  const { username } = useParams();
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
              <UserFunction setViewedProfile={setViewedProfile} />
            </div>
            <hr />
            <PersonnalInfo
              username={username}
              gender={gender}
              birthday={birthday}
              joined={joined}
              reviewsCount={reviewsCount}
              friends={viewedProfile.friendsList.list}
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
