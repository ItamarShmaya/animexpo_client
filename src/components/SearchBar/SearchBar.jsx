import "./SearchBar.css";
import { useEffect, useRef, useState } from "react";
import SearchResults from "./SearchResults/SearchResults";
import { getUsersBySearch } from "../../apis/animexpo/animexpo_requests.js";
import {
  aniListRequests,
  getMediaBySearchQuery,
  getCharactersBySearchQuery,
  getPeopleBySearchQuery,
} from "../../apis/aniList/aniList.queries";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);
  const [searchResults, setSearchResults] = useState([]);
  const [selectValue, setSelectValue] = useState("anime");
  const [searchType, setSearchType] = useState("anime");
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
              setSearchType("anime");
              setSearchResults(data.Page.media);
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
              setSearchType("manga");
              setSearchResults(data.Page.media);
              return;
            } else throw new Error("Unable to fetch search results");
          } catch (e) {
            console.log(e);
            return;
          }
        }

        case "characters": {
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
              setSearchType("characters");
              setSearchResults(data.Page.characters);
              return;
            } else throw new Error("Unable to fetch search results");
          } catch (e) {
            console.log(e);
            return;
          }
        }

        case "people": {
          const variables = {
            search: debouncedSearchInput,
            perPage: 25,
          };
          try {
            const { data } = await aniListRequests(
              getPeopleBySearchQuery,
              variables,
              controller.signal
            );
            if (data) {
              setSearchType("people");
              setSearchResults(data.Page.staff);

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
              setSearchType("users");
              setSearchResults(results);
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
    if (debouncedSearchInput !== "") search();
    else setSearchResults([]);

    return () => {
      controller.abort();
    };
  }, [debouncedSearchInput, selectValue]);

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
            onChange={({ target }) => setSelectValue(target.value)}
          >
            <option value="anime">Anime</option>
            <option value="manga">Manga</option>
            <option value="characters">Characters</option>
            <option value="people">People</option>
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
            <SearchResults results={searchResults} searchType={searchType} />
          )}
        </form>
      </div>
    </>
  );
};
export default SearchBar;
