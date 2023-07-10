import "./FavoriteList.css";
import SimplyCarousel from "../../../components/SimplyCarousel/SimplyCarousel";
import {
  profileCarouselForwardButton,
  profileCarouselBackwardButton,
} from "../../../components/SimplyCarousel/carouselSettings";
import Card from "../../../components/Card/Card";
import {
  UserFavoriteMediaEntry,
  UserFavoriteNotMediaEntry,
} from "../../../apis/animexpo/animexpo_updates.types";
import { SimplyCarouselresponsivePropsType } from "../../../components/SimplyCarousel/SimplyCarousel.types";
import { JSX } from "react";

const FavoriteList = ({
  favList,
  type,
  profileCarouselResponsive,
}: {
  favList: UserFavoriteMediaEntry[] | UserFavoriteNotMediaEntry[];
  type: "anime" | "manga" | "character" | "staff";
  profileCarouselResponsive: SimplyCarouselresponsivePropsType[];
}): JSX.Element => {
  const renderFavoriteList = () => {
    return favList.map((item) => {
      return (
        <Card
          type={type}
          key={item.id}
          id={item.id}
          title={
            (item as UserFavoriteNotMediaEntry).name ||
            (item as UserFavoriteMediaEntry).title
          }
          image={item.image}
          showRank={false}
          cardHeight={90}
          cardWidth={70}
          titleFontSize={10}
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
        {renderFavoriteList()}
      </SimplyCarousel>
    </div>
  );
};

export default FavoriteList;
