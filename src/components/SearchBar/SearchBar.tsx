import "./SearchBar.css";
import { useEffect, useRef, useState, JSX } from "react";
import SearchResults from "./SearchResults/SearchResults";
import { getUsersBySearch } from "../../apis/animexpo/animexpo_requests";
import {
  aniListRequests,
  getMediaBySearchQuery,
  getCharactersBySearchQuery,
  getStaffBySearchQuery,
} from "../../apis/aniList/aniList.queries";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import { useNavigate } from "react-router-dom";
import InlineSpinner from "../Spinner/InlineSpinner";
import itachi from "../Spinner/spinnerImages/itachi.png";
import { SearchResultsType, SearchType } from "./SearchBar.types";

const SearchBar = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedSearchInput, setDebouncedSearchInput] =
    useState<string>(searchInput);
  const [searchResults, setSearchResults] = useState<SearchResultsType>([]);
  const [searchType, setSearchType] = useState<SearchType>("anime");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [didSearch, setDidSearch] = useState<boolean>(false);
  const navigate = useNavigate();
  const { addToSearchResultsChache, getFromSearchResultsChache } =
    useSessionStorage();
  const searchbarRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchInput]);

  useEffect(() => {
    const controller = new AbortController();
    const search = async () => {
      setIsLoading(true);
      setDidSearch(true);
      switch (searchType) {
        case "anime": {
          const variables = {
            search: debouncedSearchInput,
            perPage: 25,
            type: "ANIME",
          };
          try {
            const { data } = await aniListRequests(
              getMediaBySearchQuery,
              variables,
              controller.signal
            );
            if (data) {
              setSearchResults(data.Page.media);
              setIsLoading(false);
              addToSearchResultsChache(
                "anime",
                debouncedSearchInput,
                data.Page.media
              );
              return;
            } else throw new Error("Unable to fetch search results");
          } catch (e) {
            console.log(e);
            return;
          }
        }

        case "manga": {
          const variables = {
            search: debouncedSearchInput,
            perPage: 25,
            type: "MANGA",
          };
          try {
            const { data } = await aniListRequests(
              getMediaBySearchQuery,
              variables,
              controller.signal
            );
            if (data) {
              setSearchResults(data.Page.media);
              setIsLoading(false);
              addToSearchResultsChache(
                "manga",
                debouncedSearchInput,
                data.Page.media
              );
              return;
            } else throw new Error("Unable to fetch search results");
          } catch (e) {
            console.log(e);
            return;
          }
        }

        case "character": {
          const variables = {
            search: debouncedSearchInput,
            perPage: 25,
          };
          try {
            const { data } = await aniListRequests(
              getCharactersBySearchQuery,
              variables,
              controller.signal
            );
            if (data) {
              setSearchResults(data.Page.characters);
              setIsLoading(false);
              addToSearchResultsChache(
                "character",
                debouncedSearchInput,
                data.Page.characters
              );
              return;
            } else throw new Error("Unable to fetch search results");
          } catch (e) {
            console.log(e);
            return;
          }
        }

        case "staff": {
          const variables = {
            search: debouncedSearchInput,
            perPage: 25,
          };
          try {
            const { data } = await aniListRequests(
              getStaffBySearchQuery,
              variables,
              controller.signal
            );
            if (data) {
              setSearchResults(data.Page.staff);
              setIsLoading(false);
              addToSearchResultsChache(
                "staff",
                debouncedSearchInput,
                data.Page.staff
              );

              return;
            } else throw new Error("Unable to fetch search results");
          } catch (e) {
            console.log(e);
            return;
          }
        }

        case "users": {
          try {
            const results = await getUsersBySearch(debouncedSearchInput);
            if (results) {
              setSearchResults(results);
              setIsLoading(false);
              addToSearchResultsChache("users", debouncedSearchInput, results);
              return;
            } else throw new Error("Unable to fetch search results");
          } catch (e) {
            console.log(e);
            setSearchResults([]);
            setIsLoading(false);
            return;
          }
        }

        default: {
          throw new Error("Unknown select value");
        }
      }
    };

    if (debouncedSearchInput !== "") {
      const searchResults = getFromSearchResultsChache(
        searchType,
        debouncedSearchInput
      );
      if (searchResults) {
        setSearchResults(searchResults);
        setIsLoading(false);
        setDidSearch(true);
      } else search();
    } else setSearchResults([]);

    return () => {
      controller.abort();
    };
  }, [
    debouncedSearchInput,
    searchType,
    addToSearchResultsChache,
    getFromSearchResultsChache,
  ]);

  useEffect(() => {
    const onBodyClick = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      if (searchbarRef.current?.contains(target)) return;
      setDidSearch(false);
      setSearchInput("");
      if (searchResults.length > 0) {
        setSearchResults([]);
      }
    };
    document.body.addEventListener("click", onBodyClick, { capture: true });
    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, [searchResults]);

  const onSearchSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    switch (searchType) {
      case "anime": {
        return navigate("/search/anime");
      }
      case "manga": {
        return navigate("/search/manga");
      }
      case "character": {
        return navigate("/search/character");
      }
      case "staff": {
        return navigate("/search/staff");
      }
      default: {
        return navigate("/search/anime");
      }
    }
  };

  return (
    <>
      <div className="searchbar-wrapper">
        <form
          ref={searchbarRef}
          className="searchbar"
          onSubmit={onSearchSubmit}
        >
          <select
            className="search-categories"
            value={searchType}
            onChange={({ target }) => {
              setSearchResults([]);
              setIsLoading(false);
              setDidSearch(false);
              setSearchType(target.value as SearchType);
            }}
          >
            <option value="anime">Anime</option>
            <option value="manga">Manga</option>
            <option value="character">Characters</option>
            <option value="staff">Staff</option>
            <option value="users">Users</option>
          </select>
          <input
            id="searchbar-input"
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={({ target }) => {
              setSearchInput(target.value);
              if (target.value === "") setDidSearch(false);
            }}
          />
          <button className="searchbar-btn" title={"Advanced Search"}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          {!isLoading ? (
            searchResults.length > 0 ? (
              <SearchResults results={searchResults} searchType={searchType} />
            ) : (
              didSearch && (
                <div
                  className="search-results-container"
                  style={{
                    top: `${searchbarRef?.current?.clientHeight}px`,
                    height: `50px`,
                  }}
                >
                  <div className="no-results">No Results</div>
                </div>
              )
            )
          ) : (
            <div
              className="search-results-container"
              style={{
                top: `${searchbarRef?.current?.clientHeight}px`,
                height: `50px`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <InlineSpinner
                image={itachi}
                spinnerWidth={30}
                spinnerHeight={30}
              />
            </div>
          )}
        </form>
      </div>
    </>
  );
};
export default SearchBar;
