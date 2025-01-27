import "./CardsList.css";
import Card from "../Card/Card";
import ImageSlide from "../ImageSlide/ImageSlide";
import { CardListProps } from "./CardList.types";
import { JSX, useRef } from "react";

const CardsList = ({
  list,
  type,
  showRank,
  sliderSettings,
  cardHeight,
  cardWidth,
  titleFontSize,
  cardHoverEffect,
}: CardListProps): JSX.Element => {
  const cardListRef = useRef<HTMLDivElement>(null);

  const renderCards = () => {
    return list.map((listItem, i) => {
      const title =
        listItem.title?.userPreferred ||
        listItem.title?.english ||
        listItem.name?.userPreferred ||
        listItem.name?.native;
      return (
        <Card
          cardListRef={cardListRef}
          key={listItem.id}
          hoverEffect={cardHoverEffect}
          id={listItem.id}
          type={type}
          showRank={showRank}
          title={title}
          image={
            listItem.image?.large ||
            listItem.image?.medium ||
            listItem.coverImage?.large ||
            listItem.coverImage?.medium
          }
          rank={i + 1}
          cardHeight={cardHeight}
          cardWidth={cardWidth}
          titleFontSize={titleFontSize}
          description={listItem.description}
          season={listItem.season}
          seasonYear={listItem.seasonYear}
          studios={listItem.studios}
          genres={listItem.genres}
          format={listItem.format}
          status={listItem.status}
          episodes={listItem.episodes}
          duration={listItem.duration}
          averageScore={listItem.averageScore}
          nextAiringEpisode={listItem.nextAiringEpisode}
        />
      );
    });
  };

  return (
    <div className="card-list-container" ref={cardListRef}>
      <ImageSlide settings={sliderSettings}>{renderCards()}</ImageSlide>
    </div>
  );
};

export default CardsList;
