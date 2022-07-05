import "./CardsList.css";
import Card from "../Card/Card";
import { NavLink } from "react-router-dom";
import ImageSlide from "../ImageSlide/ImageSlide";

const CardsList = ({ list, type, sliderSettings, cardHeight, cardWidth }) => {
  const renderCards = () => {
    return list.map((listItem, i) => {
      return (
        <NavLink
          className="card-wrapper"
          key={listItem.mal_id || listItem.entry.mal_id}
          to={`/${type}/${listItem.mal_id || listItem.entry.mal_id}`}
        >
          <Card
            listItem={listItem.entry ? listItem.entry : listItem}
            index={i}
            isReco={listItem.entry ? true : false}
            cardHeight={cardHeight}
            cardWidth={cardWidth}
          />
          ;
        </NavLink>
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
