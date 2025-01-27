import { NavLink } from "react-router-dom";
import "./Card.css";
import { CardProps } from "./Card.types";
import { JSX, useState } from "react";
import MoreInfoWindow from "../MoreInfoWindow/MoreInfoWindow";

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
  description,
  season,
  seasonYear,
  studios,
  genres,
  format,
  status,
  episodes,
  duration,
  averageScore,
  nextAiringEpisode,
  hoverEffect = false,
  cardListRef,
}: CardProps): JSX.Element => {
  const [showInfoWindow, setShowInfoWindow] = useState<boolean>(false);
  const [infoWindowTimeoutID, setInfoWindowTimeoutID] =
    useState<ReturnType<typeof setTimeout>>();
  const [infoWindowRightSide, setInfoWindowRightSide] =
    useState<boolean>(false);

  const onMouseEnter = (e: React.MouseEvent<HTMLElement>): void => {
    const cardListContainerRightPos =
      cardListRef?.current?.getBoundingClientRect().right;
    const cardRightPos = e.currentTarget.getBoundingClientRect().right;
    const infoWindowWidth = 280;
    if (cardListContainerRightPos) {
      if (cardListContainerRightPos <= cardRightPos + infoWindowWidth) {
        setInfoWindowRightSide(true);
      } else {
        setInfoWindowRightSide(false);
      }
    }
    clearTimeout(infoWindowTimeoutID);
    setShowInfoWindow && setShowInfoWindow(true);
  };

  const onMouseLeave = () => {
    setInfoWindowTimeoutID(
      setTimeout(() => {
        setShowInfoWindow && setShowInfoWindow(false);
      }, 50)
    );
  };

  return (
    <NavLink className="card-wrapper" to={`/${type}/${id}`}>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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
        {hoverEffect && showInfoWindow && (
          <MoreInfoWindow
            cardWidth={cardWidth}
            title={title}
            description={description}
            season={season}
            seasonYear={seasonYear}
            genres={genres}
            format={format}
            averageScore={averageScore}
            right={infoWindowRightSide}
          />
        )}
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
