import { NavLink } from "react-router-dom";
import "./SearchResults.css";
import SearchResultsItem from "./SearchResultsItem/SearchResultsItem";
import UsersSearchResults from "./UsersSearchResults/UsersSearchResults";
import MangaSearchResults from "./MangaSearchResults/MangaSearchResults";

const SearchResults = ({ results, searchType }) => {
  const searchbar = document.querySelector(".searchbar");
  const navbar = document.querySelector(".navbar");
  const hero = document.querySelector(".hero");
  const searchResultsHeight =
    window.innerHeight -
    (searchbar.clientHeight + navbar.clientHeight + hero.clientHeight / 2);

  const renderedSearchResults = () => {
    return results.map((anime) => {
      return (
        <NavLink key={anime.mal_id} to={`/anime/${anime.mal_id}`}>
          <SearchResultsItem anime={anime} />;
        </NavLink>
      );
    });
  };
  const renderUsersResults = () => {
    return results.map((user) => {
      return (
        <NavLink key={user.id} to={`/profile/${user.username}`}>
          <UsersSearchResults user={user} />;
        </NavLink>
      );
    });
  };
  const renderMangaResults = () => {
    return results.map((manga) => {
      return (
        <NavLink key={manga.mal_id} to={`/manga/${manga.mal_id}`}>
          <MangaSearchResults manga={manga} />;
        </NavLink>
      );
    });
  };
  return (
    <div
      className="search-results-container"
      style={{
        top: `${searchbar.clientHeight}px`,
        height: `${searchResultsHeight}px`,
      }}
    >
      {searchType === "anime" && renderedSearchResults(results)}
      {searchType === "manga" && renderMangaResults(results)}
      {searchType === "users" && renderUsersResults(results)}
    </div>
  );
};
export default SearchResults;
