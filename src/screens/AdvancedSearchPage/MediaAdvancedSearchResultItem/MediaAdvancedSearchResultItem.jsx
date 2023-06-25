import { NavLink, createSearchParams, useNavigate } from "react-router-dom";
import "./MediaAdvancedSearchResultItem.css";
import { capitalizeWord, formatsStringRender } from "../../../helpers/helpers";

const MediaAdvancedSearchResultItem = ({
  type,
  id,
  title,
  image,
  genres,
  averageScore,
  popularity,
  format,
  episodes,
  duration,
  status,
  nextAiringEpisode,
  season,
  seasonYear,
  showRank,
  rank
}) => {
  const gridTemplateColumns = showRank ? "0.5fr auto 4.5fr 1fr 1fr 1fr" : "auto 4.5fr 1fr 1fr 1fr"
  const navigate = useNavigate();
  const renderGenres = () => {
    return genres.map((genre) => {
      return (
        <div
          key={genre}
          className="genre"
          onClick={() => {
            navigate({
              path: "/search/anime",
              search: createSearchParams({ genres: genre }).toString(),
            });
          }}
        >
          {genre}
        </div>
      );
    });
  };
  return (
    <div
      className="advanced-search-result"
      key={id}
      style={{ gridTemplateColumns }}
    >
      {showRank && <div className="search-res-rank">{rank}</div>}
      <NavLink to={`/${type}/${id}`} className="cover-image">
        <img src={image} alt={title} />
      </NavLink>
      <div className="title-genres adv-search-res-item">
        <div className="res-item-heading">{title}</div>
        <div className="genres res-item-details">{renderGenres()}</div>
      </div>
      <div className="score-users adv-search-res-item">
        <div className="res-item-heading">
          <i className="fa-solid fa-star"></i> {(averageScore / 10).toFixed(2)}
        </div>
        <div className="res-item-details">{popularity} Users</div>
      </div>

      <div className="format-episodes adv-search-res-item">
        <div className="res-item-heading">{formatsStringRender(format)}</div>
        {format.toLowerCase() === "movie" ? (
          <div className="res-item-details">
            {Math.ceil(duration / 60)}h
            {`${duration % 60 === 0 ? "" : ", " + (duration % 60) + "mins"}`}
          </div>
        ) : (
          <div className="res-item-details">{episodes} Episodes</div>
        )}
      </div>
      <div className="date-status adv-search-res-item">
        {nextAiringEpisode ? (
          <>
            <div className="res-item-heading">Airing</div>
            <div className="res-item-details">
              Ep {nextAiringEpisode.episode} airing in{" "}
              {Math.ceil(nextAiringEpisode.timeUntilAiring / 3600) > 23
                ? `${Math.floor(
                    nextAiringEpisode.timeUntilAiring / 3600 / 24
                  )} days`
                : `${Math.ceil(
                    nextAiringEpisode.timeUntilAiring / 3600
                  )} hours`}
            </div>
          </>
        ) : (
          <>
            <div className="res-item-heading">
              {capitalizeWord(season)} {seasonYear}
            </div>
            <div className="res-item-details">{capitalizeWord(status)}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default MediaAdvancedSearchResultItem;
