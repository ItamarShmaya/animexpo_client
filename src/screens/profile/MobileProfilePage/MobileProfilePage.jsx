import { useParams } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";
import "./MobileProfilePage.css";
import Avatar from "../Avatar/Avatar";
import UserFunction from "../UserFunction/UserFunction";
import PersonnalInfo from "../personnalInfo/PersonnalInfo";
import Statistics from "../Statistics/Statistics";
import FavoriteList from "../FavoriteList/FavoriteList";

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
      )}
    </>
  );
};
export default MobileProfilePage;
