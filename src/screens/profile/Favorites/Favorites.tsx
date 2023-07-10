import { UserProfileData } from "../../../apis/animexpo/animexpo_updates.types";
import { SimplyCarouselresponsivePropsType } from "../../../components/SimplyCarousel/SimplyCarousel.types";
import FavoriteList from "../FavoriteList/FavoriteList";
import "./Favorites.css";
import { JSX } from "react";

const Favorites = ({
  viewedProfile,
  profileCarouselResponsive,
}: {
  viewedProfile: UserProfileData;
  profileCarouselResponsive: SimplyCarouselresponsivePropsType[];
}): JSX.Element => {
  const { favoriteAnime, favoriteManga, favoriteCharacters, favoriteStaff } =
    viewedProfile;
  return (
    <div className="fav-lists">
      <h2>Favorites</h2>
      {favoriteAnime?.list?.length > 0 && (
        <div className="fav-list">
          <h3>Anime ({favoriteAnime.list.length})</h3>
          <FavoriteList
            favList={favoriteAnime.list}
            type={"anime"}
            profileCarouselResponsive={profileCarouselResponsive}
          />
        </div>
      )}
      {favoriteManga?.list?.length > 0 && (
        <div className="fav-list">
          <h3>Manga ({favoriteManga.list.length})</h3>
          <FavoriteList
            favList={favoriteManga.list}
            type={"manga"}
            profileCarouselResponsive={profileCarouselResponsive}
          />
        </div>
      )}
      {favoriteCharacters?.list?.length > 0 && (
        <div className="fav-list">
          <h3>Characters ({favoriteCharacters.list.length})</h3>
          <FavoriteList
            favList={favoriteCharacters.list}
            type={"character"}
            profileCarouselResponsive={profileCarouselResponsive}
          />
        </div>
      )}
      {favoriteStaff?.list?.length > 0 && (
        <div className="fav-list">
          <h3>Staff ({favoriteStaff.list.length})</h3>
          <FavoriteList
            favList={favoriteStaff.list}
            type={"staff"}
            profileCarouselResponsive={profileCarouselResponsive}
          />
        </div>
      )}
    </div>
  );
};

export default Favorites;
