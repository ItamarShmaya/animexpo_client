import { NavLink } from "react-router-dom";
import "./SearchResults.css";
import MediaSearchResultsItem from "./SearchResultsItem/MediaSearchResultsItem";
import UsersSearchResults from "./SearchResultsItem/UsersSearchResults";
import CharactersSearchResults from "./SearchResultsItem/CharactersSearchResults";
import StaffSearchResults from "./SearchResultsItem/StaffSearchResults";
import { parseDateFromAniListApi } from "../../../helpers/helpers.js";

const SearchResults = ({ results, searchType }) => {
  const searchbar = document.querySelector(".searchbar");
  const navbar = document.querySelector(".navbar");
  const hero = document.querySelector(".hero");
  const searchResultsHeight =
    document.documentElement.clientHeight -
    (searchbar.clientHeight + navbar.clientHeight + hero.clientHeight / 2);

  const renderedSearchResults = (searchType) => {
    return results.map((entry) => {
      const image =
        entry.coverImage?.large ||
        entry.coverImage?.medium ||
        entry.image?.large ||
        entry.image?.medium;
      const title =
        entry.title?.userPreferred ||
        entry.title?.english ||
        entry.name?.userPreferred;
      return (
        <NavLink key={entry.id} to={`/${searchType}/${entry.id}`}>
          <MediaSearchResultsItem
            image={image}
            title={title}
            genres={entry.genres}
            format={entry.format}
            score={entry.averageScore / 10}
            starDate={parseDateFromAniListApi(entry.startDate)}
          />
        </NavLink>
      );
    });
  };

  const renderCharactersResults = () => {
    return results.map((character) => {
      const knownForTitle =
        character.media?.edges[0]?.node?.title?.userPreferred ||
        character.media?.edges[0]?.node?.title?.english;
      return (
        <NavLink key={character.id} to={`/character/${character.id}`}>
          <CharactersSearchResults
            name={character.name.userPreferred}
            image={character.image.large || character.image.mediuum}
            favourites={character.favourites}
            knownForTitle={knownForTitle}
          />
          ;
        </NavLink>
      );
    });
  };

  const renderStaffResults = () => {
    return results.map((staff) => {
      const dateOfBirth = parseDateFromAniListApi(staff.dateOfBirth);
      return (
        <NavLink key={staff.id} to={`/staff/${staff.id}`}>
          <StaffSearchResults
            name={staff.name.userPreferred}
            image={staff.image.large || staff.image.medium}
            age={staff.age}
            dateOfBirth={dateOfBirth}
            primaryOccupations={staff.primaryOccupations}
          />
          ;
        </NavLink>
      );
    });
  };

  const renderUsersResults = () => {
    return results.map((user) => {
      return (
        <NavLink key={user.id} to={`/profile/${user.username}`}>
          <UsersSearchResults
            username={user.username}
            image={user.avatar.secure_url}
          />
          ;
        </NavLink>
      );
    });
  };

  return (
    results.length > 0 && (
      <div
        className="search-results-container"
        style={{
          top: `${searchbar.clientHeight}px`,
          height: `${searchResultsHeight}px`,
        }}
      >
        {searchType === "anime" && renderedSearchResults(searchType)}
        {searchType === "manga" && renderedSearchResults(searchType)}
        {searchType === "character" && renderCharactersResults()}
        {searchType === "staff" && renderStaffResults()}
        {searchType === "users" && renderUsersResults()}
      </div>
    )
  );
};
export default SearchResults;
