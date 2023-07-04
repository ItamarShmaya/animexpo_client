import { NavLink } from "react-router-dom";
import { JSX } from "react";
import "./RankedListsNav.css";
import { capitalizeWord } from "../../helpers/helpers";
import { ApiMediaType } from "../../apis/aniList/aniListTypes.types";

const RankedListsNav = ({
  mediaType,
}: {
  mediaType: ApiMediaType;
}): JSX.Element => {
  return (
    <div className="ranked-lists-nav">
      <div className="rank-list-nav-item">
        <NavLink
          to={`/search/${mediaType.toLowerCase()}/trending`}
          className={({ isActive }) => (isActive ? "active" : "")}
          replace
        >
          Trending
        </NavLink>
      </div>
      {mediaType.toLowerCase() === "anime" && (
        <div className="rank-list-nav-item">
          <NavLink
            to={`/search/${mediaType.toLowerCase()}/this-season`}
            className={({ isActive }) => (isActive ? "active" : "")}
            replace
          >
            This season
          </NavLink>
        </div>
      )}
      {mediaType.toLowerCase() === "anime" && (
        <div className="rank-list-nav-item">
          <NavLink
            to={`/search/${mediaType.toLowerCase()}/next-season`}
            className={({ isActive }) => (isActive ? "active" : "")}
            replace
          >
            Next season
          </NavLink>
        </div>
      )}
      <div className="rank-list-nav-item">
        <NavLink
          to={`/search/${mediaType.toLowerCase()}/popular`}
          className={({ isActive }) => (isActive ? "active" : "")}
          replace
        >
          All Time Popular
        </NavLink>
      </div>
      <div className="rank-list-nav-item">
        <NavLink
          to={`/search/${mediaType.toLowerCase()}/top`}
          className={({ isActive }) => (isActive ? "active" : "")}
          replace
        >
          Top {capitalizeWord(mediaType)}
        </NavLink>
      </div>
      {mediaType.toLowerCase() === "anime" && (
        <div className="rank-list-nav-item">
          <NavLink
            to={`/search/${mediaType.toLowerCase()}/top-tv`}
            className={({ isActive }) => (isActive ? "active" : "")}
            replace
          >
            Top TV Shows
          </NavLink>
        </div>
      )}
      {mediaType.toLowerCase() === "anime" && (
        <div className="rank-list-nav-item">
          <NavLink
            to={`/search/${mediaType.toLowerCase()}/top-movies`}
            className={({ isActive }) => (isActive ? "active" : "")}
            replace
          >
            Top Movies
          </NavLink>
        </div>
      )}
      {mediaType.toLowerCase() === "anime" && (
        <div className="rank-list-nav-item">
          <NavLink
            to={`/search/${mediaType.toLowerCase()}/top-ovas`}
            className={({ isActive }) => (isActive ? "active" : "")}
            replace
          >
            Top OVAs
          </NavLink>
        </div>
      )}
      {mediaType.toLowerCase() === "anime" && (
        <div className="rank-list-nav-item">
          <NavLink
            to={`/search/${mediaType.toLowerCase()}/top-onas`}
            className={({ isActive }) => (isActive ? "active" : "")}
            replace
          >
            Top ONAs
          </NavLink>
        </div>
      )}
      {mediaType.toLowerCase() === "anime" && (
        <div className="rank-list-nav-item">
          <NavLink
            to={`/search/${mediaType.toLowerCase()}/top-specials`}
            className={({ isActive }) => (isActive ? "active" : "")}
            replace
          >
            Top Specials
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default RankedListsNav;
