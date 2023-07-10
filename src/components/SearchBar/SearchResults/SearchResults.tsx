import { NavLink } from "react-router-dom";
import { JSX, useEffect, useState } from "react";
import "./SearchResults.css";
import MediaSearchResultsItem from "./SearchResultsItem/MediaSearchResultsItem";
import UsersSearchResults from "./SearchResultsItem/UsersSearchResults";
import CharactersSearchResults from "./SearchResultsItem/CharactersSearchResults";
import StaffSearchResults from "./SearchResultsItem/StaffSearchResults";
import { parseDateFromAniListApi } from "../../../helpers/helpers";
import {
  ApiCharactersSearchResult,
  ApiMediaSearchResult,
  ApiStaffSearchResult,
  SearchResultsType,
  SearchType,
} from "../SearchBar.types";
import { UserInfo } from "../../../apis/animexpo/animexpo_updates.types";

const SearchResults = ({
  results,
  searchType,
}: {
  results: SearchResultsType;
  searchType: SearchType;
}): JSX.Element => {
  const [searchResultsHeight, setSearchResultsHeight] = useState<number>();
  const searchbar = document.querySelector(".searchbar");
  const navbar = document.querySelector(".navbar");
  const hero = document.querySelector(".hero");

  useEffect(() => {
    if (searchbar && navbar && hero) {
      const height =
        document.documentElement.clientHeight -
        (searchbar?.clientHeight +
          navbar?.clientHeight +
          hero?.clientHeight / 2);

      setSearchResultsHeight(height);
    }
  }, [searchbar, navbar, hero]);

  const renderedSearchResults = (
    results: ApiMediaSearchResult[],
    searchType: SearchType
  ) => {
    return results.map((entry) => {
      const image = entry.coverImage.large || entry.coverImage.medium;
      const title = entry.title.userPreferred || entry.title.english;

      return (
        <NavLink key={entry.id} to={`/${searchType}/${entry.id}`}>
          <MediaSearchResultsItem
            image={image}
            title={title}
            genres={entry.genres}
            format={entry.format}
            score={entry.averageScore / 10}
            startDate={parseDateFromAniListApi(entry.startDate)}
          />
        </NavLink>
      );
    });
  };

  const renderCharactersResults = (results: ApiCharactersSearchResult[]) => {
    return results.map((character) => {
      const knownForTitle =
        character.media?.edges[0]?.node?.title?.userPreferred ||
        character.media?.edges[0]?.node?.title?.english;
      return (
        <NavLink key={character.id} to={`/character/${character.id}`}>
          <CharactersSearchResults
            name={character.name.userPreferred}
            image={character.image.large || character.image.medium}
            favourites={character.favourites}
            knownForTitle={knownForTitle}
          />
          ;
        </NavLink>
      );
    });
  };

  const renderStaffResults = (results: ApiStaffSearchResult[]) => {
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

  const renderUsersResults = (results: UserInfo[]) => {
    return results.map((user) => {
      return (
        <NavLink key={user._id} to={`/profile/${user.username}`}>
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
    <div
      className="search-results-container"
      style={{
        top: `${searchbar?.clientHeight}px`,
        height: `${searchResultsHeight}px`,
      }}
    >
      {searchType === "anime" &&
        renderedSearchResults(results as ApiMediaSearchResult[], searchType)}
      {searchType === "manga" &&
        renderedSearchResults(results as ApiMediaSearchResult[], searchType)}
      {searchType === "character" &&
        renderCharactersResults(results as ApiCharactersSearchResult[])}
      {searchType === "staff" &&
        renderStaffResults(results as ApiStaffSearchResult[])}
      {searchType === "users" && renderUsersResults(results as UserInfo[])}
    </div>
  );
};
export default SearchResults;
