import { NavLink } from "react-router-dom";
import "./SearchResults.css";
import SearchResultsItem from "./SearchResultsItem/SearchResultsItem";
import UsersSearchResults from "./UsersSearchResults/UsersSearchResults";
import MangaSearchResults from "./MangaSearchResults/MangaSearchResults";
import CharactersSearchResults from "./CharactersSearchResults/CharactersSearchResults";
import PeopleSearchResults from "./PeopleSearchResults/PeopleSearchResults";

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

  const renderMangaResults = () => {
    return results.map((manga) => {
      return (
        <NavLink key={manga.mal_id} to={`/manga/${manga.mal_id}`}>
          <MangaSearchResults manga={manga} />;
        </NavLink>
      );
    });
  };

  const renderCharactersResults = () => {
    return results.map((character) => {
      return (
        <NavLink key={character.mal_id} to={`/characters/${character.mal_id}`}>
          <CharactersSearchResults character={character} />;
        </NavLink>
      );
    });
  };

  const renderPeopleResults = () => {
    return results.map((person) => {
      return (
        <NavLink key={person.mal_id} to={`/people/${person.mal_id}`}>
          <PeopleSearchResults person={person} />;
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
      {searchType === "characters" && renderCharactersResults(results)}
      {searchType === "people" && renderPeopleResults(results)}
      {searchType === "users" && renderUsersResults(results)}
    </div>
  );
};
export default SearchResults;
