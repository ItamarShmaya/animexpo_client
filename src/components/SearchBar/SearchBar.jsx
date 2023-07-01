import "./SearchBar.css";
import { useEffect, useRef, useState } from "react";
import SearchResults from "./SearchResults/SearchResults";
import { getUsersBySearch } from "../../apis/animexpo/animexpo_requests.js";
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

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);
  const [searchResults, setSearchResults] = useState([]);
  const [selectValue, setSelectValue] = useState("anime");
  const [isLoading, setIsLoading] = useState(false);
  const [didSearch, setDidSearch] = useState(false);
  const navigate = useNavigate();
  const { addToSearchResultsChache, getFromSearchResultsChache } =
    useSessionStorage();
  const searchbarRef = useRef();

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
      switch (selectValue) {
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
                "characters",
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
        selectValue,
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
    selectValue,
    addToSearchResultsChache,
    getFromSearchResultsChache,
  ]);

  useEffect(() => {
    const onBodyClick = ({ target }) => {
      if (searchbarRef.current.contains(target)) return;
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

  const onSearchSubmit = (e) => {
    e.preventDefault();
    switch (selectValue) {
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
            value={selectValue}
            onChange={({ target }) => {
              setSearchResults([]);
              setIsLoading(false);
              setDidSearch(false);
              setSelectValue(target.value);
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
              <SearchResults results={searchResults} searchType={selectValue} />
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
              <InlineSpinner image={itachi} width={30} height={30} />
            </div>
          )}
        </form>
      </div>
    </>
  );
};
export default SearchBar;
