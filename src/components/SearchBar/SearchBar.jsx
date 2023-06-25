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

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);
  const [searchResults, setSearchResults] = useState([]);
  const [selectValue, setSelectValue] = useState("anime");
  const navigate = useNavigate();
  const { addToSearchResultsChache, getFromSearchResultsChache } =
    useSessionStorage();
  const searchbarRef = useRef();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchInput]);

  useEffect(() => {
    const controller = new AbortController();
    const search = async () => {
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
              addToSearchResultsChache("users", debouncedSearchInput, results);
              return;
            } else throw new Error("Unable to fetch search results");
          } catch (e) {
            console.log(e);
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
      searchResults ? setSearchResults(searchResults) : search();
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
    if (searchResults.length > 0) {
      const onBodyClick = ({ target }) => {
        if (searchbarRef.current.contains(target)) return;
        setSearchResults([]);
        setSearchInput("");
      };

      document.body.addEventListener("click", onBodyClick, { capture: true });

      return () => {
        document.body.removeEventListener("click", onBodyClick, {
          capture: true,
        });
      };
    }
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
            onChange={({ target }) => setSearchInput(target.value)}
          />
          <button className="searchbar-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          {searchResults.length > 0 && (
            <SearchResults results={searchResults} searchType={selectValue} />
          )}
        </form>
      </div>
    </>
  );
};
export default SearchBar;
