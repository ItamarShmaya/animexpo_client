import { NavLink, createSearchParams, useNavigate } from "react-router-dom";
import { JSX } from "react";
import "./TableLikeCard.css";
import {
  capitalizeWord,
  formatsStringRender,
  capitalizeSnakeCase,
  numberWithCommas,
} from "../../../helpers/helpers";
import { TableLikeCardProps } from "./TableLikeCard.types";

const TableLikeCard = ({
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
}: TableLikeCardProps): JSX.Element => {
  const gridClassName = showRank ? "grid-with-rank" : "grid-without-rank";
  const navigate = useNavigate();
  const renderGenres = () => {
    if (!genres) return;
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

  const onMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isOverFlow =
      e.currentTarget.clientWidth < e.currentTarget.scrollWidth;
    if (isOverFlow) {
      title && e.currentTarget.setAttribute("title", title);
    }
  };

  return (
    <div className={`advanced-search-result ${gridClassName}`} key={id}>
      {showRank && <div className="search-res-rank">{rank}</div>}
      <NavLink to={`/${type}/${id}`} className="cover-image">
        <img src={image} alt={title} />
      </NavLink>
      <div className="title-genres adv-search-res-item">
        <NavLink
          to={`/anime/${id}`}
          className={`res-item-heading title-link ellipsis overflow`}
          onMouseEnter={onMouseEnter}
        >
          {title}
        </NavLink>
        <div className="genres res-item-details">{renderGenres()}</div>
      </div>
      <div className="score-users adv-search-res-item">
        <div className="res-item-heading">
          {averageScore ? (
            <>
              <i className="fa-solid fa-star"></i>{" "}
              {(averageScore / 10).toFixed(1)}
            </>
          ) : (
            "N/A"
          )}
        </div>
        <div className="res-item-details">
          {(popularity && numberWithCommas(popularity)) || 0} Users
        </div>
      </div>

      <div className="format-episodes adv-search-res-item">
        <div className="res-item-heading">
          {format && formatsStringRender(format)}
        </div>
        {type && type.toLowerCase() === "anime"
          ? format?.toLowerCase() === "movie"
            ? ((duration && Math.ceil(duration / 60) > 0) ||
                (duration && duration % 60 > 0)) && (
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
          : type &&
            type.toLowerCase() === "manga" &&
            chapters && (
              <div className="res-item-details">
                {chapters} {chapters === 1 ? "Chapter" : "Chapters"}
              </div>
            )}
      </div>
      <div className="date-status adv-search-res-item">
        {nextAiringEpisode?.episode && nextAiringEpisode.episode > 1 ? (
          <div className="res-item-heading">Airing</div>
        ) : (
          <div className="res-item-heading">
            {season && seasonYear
              ? capitalizeWord(season) + " " + seasonYear
              : season
              ? capitalizeWord(season)
              : startYear && endYear
              ? startYear + " - " + endYear
              : startYear
              ? "Since " + startYear
              : "TBA"}
          </div>
        )}
        {nextAiringEpisode ? (
          <div className="res-item-details">
            {nextAiringEpisode.episode &&
              `Ep ${nextAiringEpisode.episode} airing in `}
            {nextAiringEpisode.timeUntilAiring &&
            Math.ceil(nextAiringEpisode.timeUntilAiring / 3600) > 23
              ? `${Math.floor(
                  nextAiringEpisode.timeUntilAiring / 3600 / 24
                )} days`
              : nextAiringEpisode.timeUntilAiring &&
                `${Math.ceil(nextAiringEpisode.timeUntilAiring / 3600)} hours`}
          </div>
        ) : (
          <div className="res-item-details">
            {status?.includes("_")
              ? capitalizeSnakeCase(status)
              : status && capitalizeWord(status)}
          </div>
        )}
      </div>
    </div>
  );
};

export default TableLikeCard;
