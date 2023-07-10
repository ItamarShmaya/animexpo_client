import { NavLink } from "react-router-dom";
import "./Card.css";
import { CardProps } from "./Card.types";
import { JSX } from "react";

const Card = ({
  type,
  id,
  title,
  image,
  rank,
  showRank,
  cardHeight = 225,
  cardWidth = 150,
  titleFontSize = 12,
}: CardProps): JSX.Element => {
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
            {showRank && <div className="card-rank">#{rank}</div>}
          </div>
          <div className="card-bottom">
            <h3
              className="ellipsis"
              style={{ fontSize: `${titleFontSize}px` }}
              title={title}
            >
              {title}
            </h3>
          </div>
        </div>
      </div>
    </NavLink>
  );
};
export default Card;
