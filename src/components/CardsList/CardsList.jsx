import "./CardsList.css";
import Card from "../Card/Card";
import ImageSlide from "../ImageSlide/ImageSlide";

const CardsList = ({
  list,
  type,
  showRank,
  sliderSettings,
  cardHeight,
  cardWidth,
  titleFontSize,
}) => {
  const renderCards = () => {
    return list.map((listItem, i) => {
      const title =
        listItem.title?.userPreferred ||
        listItem.title?.english ||
        listItem.name?.userPreferred ||
        listItem.name?.english;
      return (
        <Card
          key={listItem.id}
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
        />
      );
    });
  };

  return (
    <div className="card-list-container">
      <ImageSlide settings={sliderSettings}>{renderCards()}</ImageSlide>
    </div>
  );
};

export default CardsList;
