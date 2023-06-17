import { NavLink } from "react-router-dom";
import "./Card.css";

const Card = ({
  type,
  id,
  title,
  image,
  index,
  showRank,
  cardHeight = 225,
  cardWidth = 150,
}) => {
  return (
    <NavLink className="card-wrapper" to={`/${type}/${id}`}>
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
          <div className="card-top">
            {showRank && <div className="card-rank">#{index + 1}</div>}
          </div>
          <div className="card-bottom">
            <h3>{title}</h3>
          </div>
        </div>
      </div>
    </NavLink>
  );
};
export default Card;
