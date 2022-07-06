import "./SearchBar.css";
import { useEffect, useRef, useState } from "react";
import {
  getAnimeBySearch,
  getCharacterBySearch,
  getMangaBySearch,
  getPeopleBySearch,
} from "../../apis/jikan/jikan_api_requests.js";
import SearchResults from "./SearchResults/SearchResults";
import { getUsersBySearch } from "../../apis/animexpo/animexpo_requests.js";

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
    const search = async () => {
      let results = [];
      if (selectValue === "anime") {
        try {
          results = await getAnimeBySearch(debouncedSearchInput);
          setSearchType("anime");
        } catch (e) {}
      } else if (selectValue === "manga") {
        try {
          results = await getMangaBySearch(debouncedSearchInput);
          setSearchType("manga");
        } catch (e) {}
      } else if (selectValue === "users") {
        try {
          results = await getUsersBySearch(debouncedSearchInput);
          setSearchType("users");
        } catch (e) {}
      } else if (selectValue === "characters") {
        try {
          results = await getCharacterBySearch(debouncedSearchInput);
          setSearchType("characters");
        } catch (e) {}
      } else if (selectValue === "people") {
        try {
          results = await getPeopleBySearch(debouncedSearchInput);
          setSearchType("people");
        } catch (e) {}
      }
      setSearchResults(results);
    };
    if (debouncedSearchInput !== "") search();
    else setSearchResults([]);
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
