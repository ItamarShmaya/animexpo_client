import { NavLink, createSearchParams, useNavigate } from "react-router-dom";
import "./MediaAdvancedSearchResultItem.css";
import {
  capitalizeWord,
  formatsStringRender,
  capitalizeSnakeCase,
  numberWithCommas,
} from "../../../helpers/helpers";

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
  rank,
  startYear,
  endYear,
  chapters,
  volumes,
}) => {
  const gridTemplateColumns = showRank
    ? "0.3fr auto 2fr 0.5fr 0.5fr 0.8fr"
    : "auto 4.5fr 1fr 1fr 1fr";
  const navigate = useNavigate();
  const renderGenres = () => {
    return genres.map((genre) => {
      return (
        <div
          key={genre}
          className="genre"
          onClick={() => {
            navigate({
              pathname: `/search/${type?.toLowerCase()}`,
              search: createSearchParams({ genres: genre })?.toString(),
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
        <NavLink to={`/anime/${id}`} className="res-item-heading title-link">
          {title}
        </NavLink>
        <div className="genres res-item-details">{renderGenres()}</div>
      </div>
      <div className="score-users adv-search-res-item">
        <div className="res-item-heading">
          {averageScore ? (
            <>
              <i className="fa-solid fa-star"></i>{" "}
              {(averageScore / 10).toFixed(2)}
            </>
          ) : (
            "N/A"
          )}
        </div>
        <div className="res-item-details">
          {numberWithCommas(popularity)} Users
        </div>
      </div>

      <div className="format-episodes adv-search-res-item">
        <div className="res-item-heading">{formatsStringRender(format)}</div>
        {type.toLowerCase() === "anime"
          ? format?.toLowerCase() === "movie"
            ? (Math.ceil(duration / 60) > 0 || duration % 60 > 0) && (
                <div className="res-item-details">
                  {Math.ceil(duration / 60) > 0 &&
                    Math.ceil(duration / 60) + "h"}
                  {duration % 60 > 0 && ", " + (duration % 60) + "mins"}
                </div>
              )
            : episodes && (
                <div className="res-item-details">
                  {episodes} {episodes === 1 ? "Episode" : "Episodes"}
                </div>
              )
          : type.toLowerCase() === "manga" &&
            chapters && (
              <div className="res-item-details">
                {chapters} {chapters === 1 ? "Chapter" : "Chapters"}
              </div>
            )}
      </div>
      <div className="date-status adv-search-res-item">
        {nextAiringEpisode && nextAiringEpisode.episode > 1 ? (
          <div className="res-item-heading">Airing</div>
        ) : (
          <div className="res-item-heading">
            {season
              ? capitalizeWord(season)
              : seasonYear
              ? seasonYear
              : startYear && endYear
              ? startYear + " - " + endYear
              : startYear
              ? "Since " + startYear
              : "TBA"}
          </div>
        )}
        {nextAiringEpisode ? (
          <div className="res-item-details">
            Ep {nextAiringEpisode.episode} airing in{" "}
            {Math.ceil(nextAiringEpisode.timeUntilAiring / 3600) > 23
              ? `${Math.floor(
                  nextAiringEpisode.timeUntilAiring / 3600 / 24
                )} days`
              : `${Math.ceil(nextAiringEpisode.timeUntilAiring / 3600)} hours`}
          </div>
        ) : (
          <div className="res-item-details">
            {status?.includes("_")
              ? capitalizeSnakeCase(status)
              : capitalizeWord(status)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaAdvancedSearchResultItem;
