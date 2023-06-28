import { NavLink, useSearchParams } from "react-router-dom";
import "./RankedListsNav.css";
import { capitalizeWord } from "../../helpers/helpers";

const RankedListsNav = ({ type }) => {
  const searchParams = useSearchParams();
  return (
    <div className="ranked-lists-nav">
      <div className="rank-list-nav-item">
        <NavLink
          to={`/search/${type.toLowerCase()}/trending`}
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => searchParams.delete("page")}
        >
          Trending
        </NavLink>
      </div>
      {type.toLowerCase() === "anime" && (
        <div className="rank-list-nav-item">
          <NavLink
            to={`/search/${type.toLowerCase()}/this-season`}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => searchParams.delete("page")}
          >
            This season
          </NavLink>
        </div>
      )}
      {type.toLowerCase() === "anime" && (
        <div className="rank-list-nav-item">
          <NavLink
            to={`/search/${type.toLowerCase()}/next-season`}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => searchParams.delete("page")}
          >
            Next season
          </NavLink>
        </div>
      )}
      <div className="rank-list-nav-item">
        <NavLink
          to={`/search/${type.toLowerCase()}/popular`}
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => searchParams.delete("page")}
        >
          All Time Popular
        </NavLink>
      </div>
      <div className="rank-list-nav-item">
        <NavLink
          to={`/search/${type.toLowerCase()}/top`}
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => searchParams.delete("page")}
        >
          Top {capitalizeWord(type)}
        </NavLink>
      </div>
      {type.toLowerCase() === "anime" && (
        <div className="rank-list-nav-item">
          <NavLink
            to={`/search/${type.toLowerCase()}/top-tv`}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => searchParams.delete("page")}
          >
            Top TV Shows
          </NavLink>
        </div>
      )}
      {type.toLowerCase() === "anime" && (
        <div className="rank-list-nav-item">
          <NavLink
            to={`/search/${type.toLowerCase()}/top-movies`}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => searchParams.delete("page")}
          >
            Top Movies
          </NavLink>
        </div>
      )}
      {type.toLowerCase() === "anime" && (
        <div className="rank-list-nav-item">
          <NavLink
            to={`/search/${type.toLowerCase()}/top-ovas`}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => searchParams.delete("page")}
          >
            Top OVAs
          </NavLink>
        </div>
      )}
      {type.toLowerCase() === "anime" && (
        <div className="rank-list-nav-item">
          <NavLink
            to={`/search/${type.toLowerCase()}/top-onas`}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => searchParams.delete("page")}
          >
            Top ONAs
          </NavLink>
        </div>
      )}
      {type.toLowerCase() === "anime" && (
        <div className="rank-list-nav-item">
          <NavLink
            to={`/search/${type.toLowerCase()}/top-specials`}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => searchParams.delete("page")}
          >
            Top Specials
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default RankedListsNav;
