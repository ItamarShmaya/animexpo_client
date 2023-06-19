import { NavLink } from "react-router-dom";
import "./VARoleCard.css";
import { AppearanceEntry } from "../../characterPage/CharacterPage/Appearances/Appearance/Appearance";
import { parseDateFromAniListApi } from "../../../helpers/helpers";

const VARoleCard = ({
  role,
  animeId,
  animeImage,
  animeTitle,
  characterId,
  characterName,
  characterImage,
  sortBy,
  animePopularity,
  animeFavourites,
  animeAverageScore,
  animeStartDate,
  animeFormat,
  cardHeight,
  cardWidth,
}) => {
  return (
    <div className="va-role-card">
      <AppearanceEntry
        type={"anime"}
        id={animeId}
        showRank={false}
        title={animeTitle}
        image={animeImage}
        cardHeight={cardHeight}
        cardWidth={cardWidth}
        sortBy={sortBy}
        popularity={animePopularity}
        favourites={animeFavourites}
        averageScore={animeAverageScore}
        startDate={parseDateFromAniListApi(animeStartDate)}
        format={animeFormat}
      />
      <NavLink to={`/character/${characterId}`}>
        <div className="character-role">
          <div className="basic-info">
            <p className="name">{characterName}</p>
            <p className="role">{role}</p>
          </div>
          <img
            src={characterImage}
            alt={characterName}
            style={{
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
            }}
          />
        </div>
      </NavLink>
    </div>
  );
};
export default VARoleCard;
