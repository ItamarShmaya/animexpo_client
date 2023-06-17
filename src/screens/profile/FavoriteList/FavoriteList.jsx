import "./FavoriteList.css";
import SimplyCarousel from "../../../components/SimplyCarousel/SimplyCarousel";
import {
  profileCarouselForwardButton,
  profileCarouselBackwardButton,
} from "../../../components/SimplyCarousel/carouselSettings";
import Card from "../../../components/Card/Card";

const FavoriteList = ({ favList, type, profileCarouselResponsive }) => {
  const renderFavoriteList = (list, type) => {
    return list.map((item) => {
      return (
        <Card
          type={type}
          key={item.id}
          id={item.id}
          title={item.name}
          image={item.image}
          showRank={false}
          cardHeight={90}
          cardWidth={70}
        />
      );
    });
  };
  return (
    <div className="fav-list-container">
      <SimplyCarousel
        itemsToShow={12}
        itemsToScroll={1}
        forwardBtnProps={profileCarouselForwardButton}
        backwardBtnProps={profileCarouselBackwardButton}
        responsiveProps={profileCarouselResponsive}
      >
        {renderFavoriteList(favList, type)}
      </SimplyCarousel>
    </div>
  );
};

export default FavoriteList;
