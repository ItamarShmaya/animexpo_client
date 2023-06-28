import { NavLink, createSearchParams, useNavigate } from "react-router-dom";
import "./TableLikeCardMobile.css";
import {
  capitalizeSnakeCase,
  capitalizeWord,
  formatsStringRender,
  numberWithCommas,
} from "../../../../helpers/helpers";

const TableLikeCardMobile = ({
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
}) => {
  const gridClassName = showRank ? "mobile-grid-with-rank" : "mobile-grid-without-rank";
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
    <div className={`mobile-advanced-search-result ${gridClassName}`} key={id}>
      {showRank && <div className="search-res-rank">{rank}</div>}
      <NavLink to={`/${type}/${id}`} className="cover-image">
        <img src={image} alt={title} />
      </NavLink>
      <div className="search-res-info">
        <NavLink
          to={`/anime/${id}`}
          className="search-res-info-item title ellipsis"
        >
          {title}
        </NavLink>
        <div className="genres search-res-info-item">{renderGenres()}</div>
        <div className="search-res-info-item">
          {averageScore ? (
            <>
              <span>
                <i className="fa-solid fa-star"></i>{" "}
                {(averageScore / 10).toFixed(1)}
              </span>
              <span>{numberWithCommas(popularity)} Users</span>
            </>
          ) : (
            <span>N/A</span>
          )}
          <div className="search-res-info-item">
            <span>{formatsStringRender(format)}</span>
            {type.toLowerCase() === "anime"
              ? format?.toLowerCase() === "movie"
                ? (Math.ceil(duration / 60) > 0 || duration % 60 > 0) && (
                    <span>
                      {Math.ceil(duration / 60) > 0 &&
                        Math.ceil(duration / 60) + "h"}
                      {duration % 60 > 0 && ", " + (duration % 60) + "mins"}
                    </span>
                  )
                : episodes && (
                    <span>
                      {episodes} {episodes === 1 ? "Episode" : "Episodes"}
                    </span>
                  )
              : type.toLowerCase() === "manga" &&
                chapters && (
                  <div className="res-item-details">
                    {chapters} {chapters === 1 ? "Chapter" : "Chapters"}
                  </div>
                )}
          </div>
        </div>
        <div className="search-res-info-item">
          {nextAiringEpisode && nextAiringEpisode.episode > 1 ? (
            <span>Airing</span>
          ) : (
            <span>
              {season && seasonYear
                ? capitalizeWord(season) + " " + seasonYear
                : season
                ? capitalizeWord(season)
                : startYear && endYear
                ? startYear + " - " + endYear
                : startYear
                ? "Since " + startYear
                : "TBA"}
            </span>
          )}
          {nextAiringEpisode ? (
            <span>
              Ep {nextAiringEpisode.episode} airing in{" "}
              {Math.ceil(nextAiringEpisode.timeUntilAiring / 3600) > 23
                ? `${Math.floor(
                    nextAiringEpisode.timeUntilAiring / 3600 / 24
                  )} days`
                : `${Math.ceil(
                    nextAiringEpisode.timeUntilAiring / 3600
                  )} hours`}
            </span>
          ) : (
            <span>
              {status?.includes("_")
                ? capitalizeSnakeCase(status)
                : capitalizeWord(status)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableLikeCardMobile;
