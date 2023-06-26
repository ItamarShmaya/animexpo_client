import { NavLink, useSearchParams } from "react-router-dom";
import "./AnimeRankedListsNav.css";
import { capitalizeWord } from "../../../helpers/helpers";

const AnimeRankedListsNav = ({ type }) => {
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
            Popular this season
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
            Upcoming next season
          </NavLink>
        </div>
      )}
      <div className="rank-list-nav-item">
        <NavLink
          to={`/search/${type.toLowerCase()}/top`}
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => searchParams.delete("page")}
        >
          Top {capitalizeWord(type)}
        </NavLink>
      </div>
      <div className="rank-list-nav-item">
        <NavLink
          to={`/search/${type.toLowerCase()}/popular`}
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => searchParams.delete("page")}
        >
          All Time Popular
        </NavLink>
      </div>
    </div>
  );
};

export default AnimeRankedListsNav;
