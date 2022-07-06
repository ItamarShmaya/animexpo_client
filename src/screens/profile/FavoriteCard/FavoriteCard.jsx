import "./FavoriteCard.css";
import "../../../components/Card/Card.css";
import { NavLink } from "react-router-dom";

const FavoriteCard = ({ type, mal_id, image, name, cardWidth, cardHeight }) => {
  return (
    <NavLink className="card-wrapper" to={`/${type}/${mal_id}`}>
      <div
        className="card-container"
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "center",
          backgroundPositionY: "center",
          backgroundSize: "cover",
          width: `${cardWidth}px`,
          height: `${cardHeight}px`,
        }}
      >
        <div className="card-content-wrapper">
          <div className="card-top"></div>
          <div className="card-bottom">
            <h2>{name}</h2>
          </div>
        </div>
      </div>
    </NavLink>
  );
};
export default FavoriteCard;
