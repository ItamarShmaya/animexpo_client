import "./FavoriteList.css";
import SimplyCarousel from "../../../components/SimplyCarousel/SimplyCarousel";
import {
  profileCarouselForwardButton,
  profileCarouselBackwardButton,
  profileCarouselResponsive,
} from "../../../components/SimplyCarousel/profilePageCarouselSettings";
import FavoriteCard from "../FavoriteCard/FavoriteCard";

const FavoriteList = ({ favList, type }) => {
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
    <SimplyCarousel
      itemsToShow={12}
      itemsToScroll={1}
      forwardBtnProps={profileCarouselForwardButton}
      backwardBtnProps={profileCarouselBackwardButton}
      responsiveProps={profileCarouselResponsive}
    >
      {renderFavoriteList(favList, type)}
    </SimplyCarousel>
  );
};

export default FavoriteList;
