import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "./MediaSearchMenu.css";
import { useEffect, useRef, useState } from "react";
import {
  MediaSeason,
  MediaType,
} from "../../../apis/aniList/types";
import {
  advancedSearchQuery,
  aniListRequests,
} from "../../../apis/aniList/aniList.queries";
import {
  animeFormats,
  convertToArrayOfMediaFormats,
  getYearsFrom,
  seasons,
} from "../../../helpers/helpers";

const MediaSearchMenu = ({
  setList,
  genres,
  tags,
  setIsLoading,
  setIsFirstSearch,
}) => {
  const [searchParams] = useSearchParams();
  const [searchInputs, setSearchInputs] = useState({
    search: "",
    genres: [],
    tags: [],
    seasonYear: "",
    season: "",
    format: [],
  });
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(
    searchInputs.search
  );
  const [yearsList] = useState(getYearsFrom(1940, "desc"));
  const [isAdult, setIsAdult] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const isFirstRender = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchInput(searchInputs.search);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchInputs.search]);

  useEffect(() => {
    if (searchParams.size > 0) {
      const searchParamsObj = {};
      for (let [key, value] of searchParams) {
        if (searchParamsObj[key]) {
          searchParamsObj[key].push(value);
        } else {
          if (key === "genres" || key === "tags" || key === "format") {
            searchParamsObj[key] = [value];
          } else {
            searchParamsObj[key] = value;
          }
        }
      }
      setSearchInputs((prev) => {
        const temp = {};
        for (let key in prev) {
          if (searchParamsObj[key]) {
            temp[key] = searchParamsObj[key];
          } else {
            if (key === "genres" || key === "tags" || key === "format")
              temp[key] = [];
            else temp[key] = "";
          }
        }
        return { ...temp };
      });
    }
  }, [searchParams]);

  useEffect(() => {
    if (isFirstRender.current === true) {
      isFirstRender.current = false;
      return;
    }
    const controller = new AbortController();
    const variables = {
      page: 1,
      type: MediaType.anime,
      search: debouncedSearchInput === "" ? undefined : debouncedSearchInput,
      genres: searchInputs.genres.length < 1 ? undefined : searchInputs.genres,
      tags: searchInputs.tags.length < 1 ? undefined : searchInputs.tags,
      seasonYear:
        searchInputs.seasonYear === "" ? undefined : +searchInputs.seasonYear,
      season:
        searchInputs.season === ""
          ? undefined
          : MediaSeason[searchInputs.season?.toLowerCase()],
      format:
        searchInputs.format.length < 1
          ? undefined
          : convertToArrayOfMediaFormats(searchInputs.format),
    };

    const getSearchedList = async (variables) => {
      setIsLoading(true);
      setIsFirstSearch(false);
      try {
        const { data } = await aniListRequests(
          advancedSearchQuery,
          variables,
          controller.signal
        );
        const queryParams = {};
        for (let key in variables) {
          if (key !== "page" && key !== "type") {
            if (variables[key]) queryParams[key] = variables[key];
          }
        }
        if (data) {
          setList(data.Page.media);
          setIsLoading(false);
          window.history.pushState(
            {},
            "",
            `${window.location.origin}/search/anime?${createSearchParams(
              queryParams
            ).toString()}`
          );
        }
      } catch (e) {
        console.log(e);
        setList([]);
        setIsLoading(false);
      }
    };

    getSearchedList(variables);

    return () => {
      controller.abort();
    };
  }, [
    debouncedSearchInput,
    searchInputs.seasonYear,
    searchInputs.genres,
    searchInputs.tags,
    searchInputs.season,
    searchInputs.format,
    setList,
    isFirstRender,
    setIsLoading,
    navigate,
    setIsFirstSearch,
  ]);

  const renderSignleSelectOptions = (optionsValues, key) => {
    return optionsValues.map((option) => {
      return (
        <div
          key={option}
          className="dropdown-option"
          onClick={() =>
            setSearchInputs((prev) => {
              const temp = { ...prev };
              temp[key] = option;
              return temp;
            })
          }
        >
          {option.toString().toLowerCase() === "tv" ? "TV Show" : option}
        </div>
      );
    });
  };

  const renderGenresAndTagsOptions = (genres, tags) => {
    return (
      <>
        <div className="genres-group">
          {genres.map((genre) => {
            if (!isAdult && genre.toLowerCase() === "hentai") return undefined;
            return (
              <MultipleSelectOption
                key={genre}
                isSelected={searchInputs.genres.includes(genre)}
                optionName={genre}
                setSearchInputs={setSearchInputs}
                listName={"genres"}
              />
            );
          })}
        </div>
        <div className="tags-group">
          {tags.map((tag) => {
            if (!isAdult && tag.isAdult) return undefined;
            return (
              <MultipleSelectOption
                key={tag.name}
                isSelected={searchInputs.tags.includes(tag.name)}
                optionName={tag.name}
                setSearchInputs={setSearchInputs}
                listName={"tags"}
              />
            );
          })}
        </div>
      </>
    );
  };

  const onDropdownClick = (e) => {
    e.currentTarget.children[1].style.display =
      e.currentTarget.children[1].style.display === "none" ? "flex" : "none";
  };

  useEffect(() => {
    const placeholder = document.querySelector(".placeholder");
    searchInputs.search
      ? (placeholder.style.display = "none")
      : (placeholder.style.display = "unset");
  }, [searchInputs.search]);

  return (
    <div className="search-menu">
      <div className="menu-item">
        <div className="menu-item-name">Search</div>
        <div className="search-bar">
          <div className="placeholder">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <input
            className="filter"
            type="text"
            name="search-bar"
            placeholder=""
            onChange={({ target }) =>
              setSearchInputs((prev) => {
                return { ...prev, search: target.value };
              })
            }
            value={searchInputs.search}
          />
          {searchInputs.search && (
            <span
              className="clear-all"
              onClick={(e) => {
                e.stopPropagation();
                setSearchInputs((prev) => {
                  return { ...prev, search: "" };
                });
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
          )}
        </div>
      </div>
      <div className="menu-item">
        <div className="menu-item-name">Genres</div>
        <div className="filter dropdown" onClick={onDropdownClick}>
          <div className="multiple-select-label">
            {searchInputs.genres.length || searchInputs.tags.length ? (
              <span className="multiple-select-span">
                {searchInputs.genres[0] || searchInputs.tags[0]}
              </span>
            ) : (
              <span className="placeholder">Any</span>
            )}
            {searchInputs.genres.length + searchInputs.tags.length > 1 && (
              <span className="multiple-select-span">
                +{searchInputs.genres.length + searchInputs.tags.length - 1}
              </span>
            )}
            {searchInputs.genres.length > 0 || searchInputs.tags.length > 0 ? (
              <span
                className="inline-icon clear-all"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchInputs((prev) => {
                    return { ...prev, genres: [], tags: [] };
                  });
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </span>
            ) : (
              <span className="inline-icon">
                <i className="fa-solid fa-chevron-down"></i>
              </span>
            )}
          </div>
          <div className="dropdown-options" style={{ display: "none" }}>
            {renderGenresAndTagsOptions(genres, tags)}
          </div>
        </div>
      </div>
      <div className="menu-item">
        <div className="menu-item-name">Year</div>
        <div className="filter dropdown" onClick={onDropdownClick}>
          {searchInputs.seasonYear ? (
            <span className="selected-value">{searchInputs.seasonYear}</span>
          ) : (
            <span className="selected-value placeholder">Any</span>
          )}
          <div className="dropdown-options" style={{ display: "none" }}>
            {renderSignleSelectOptions(yearsList, "seasonYear")}
          </div>
          {searchInputs.seasonYear ? (
            <span
              className="inline-icon clear-all"
              onClick={(e) => {
                e.stopPropagation();
                setSearchInputs((prev) => {
                  return { ...prev, seasonYear: "" };
                });
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
          ) : (
            <span className="inline-icon">
              <i className="fa-solid fa-chevron-down"></i>
            </span>
          )}
        </div>
      </div>
      <div className="menu-item">
        <div className="menu-item-name">Season</div>
        <div className="filter dropdown" onClick={onDropdownClick}>
          {searchInputs.season ? (
            <span className="selected-value">{searchInputs.season}</span>
          ) : (
            <span className="selected-value placeholder">Any</span>
          )}
          <div className="dropdown-options" style={{ display: "none" }}>
            {renderSignleSelectOptions(seasons, "season")}
          </div>
          {searchInputs.season ? (
            <span
              className="inline-icon clear-all"
              onClick={(e) => {
                e.stopPropagation();
                setSearchInputs((prev) => {
                  return { ...prev, season: "" };
                });
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
          ) : (
            <span className="inline-icon">
              <i className="fa-solid fa-chevron-down"></i>
            </span>
          )}
        </div>
      </div>
      <div className="menu-item">
        <div className="menu-item-name">Format</div>
        <div className="filter dropdown" onClick={onDropdownClick}>
          <div className="multiple-select-label">
            {searchInputs.format.length ? (
              <span className="multiple-select-span">
                {searchInputs.format[0]}
              </span>
            ) : (
              <span className="placeholder">Any</span>
            )}
            {searchInputs.format.length > 1 && (
              <span className="multiple-select-span">
                +{searchInputs.format.length - 1}
              </span>
            )}
            {searchInputs.format.length > 0 ? (
              <span
                className="inline-icon clear-all"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchInputs((prev) => {
                    return { ...prev, format: [] };
                  });
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </span>
            ) : (
              <span className="inline-icon">
                <i className="fa-solid fa-chevron-down"></i>
              </span>
            )}
          </div>
          <div className="dropdown-options" style={{ display: "none" }}>
            {animeFormats.map((format) => {
              return (
                <MultipleSelectOption
                  key={format}
                  isSelected={searchInputs.format.includes(format)}
                  optionName={
                    format.toLowerCase() === "tv" ? "TV Show" : format
                  }
                  setSearchInputs={setSearchInputs}
                  listName={"format"}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaSearchMenu;

const MultipleSelectOption = ({
  listName,
  setSearchInputs,
  isSelected,
  optionName,
}) => {
  return (
    <div
      className="multiple-select-option dropdown-option"
      onClick={(e) => {
        e.stopPropagation();
        if (
          [...e.currentTarget.children[1].classList].includes("not-selected")
        ) {
          e.currentTarget.children[1].classList.remove("not-selected");
          e.currentTarget.children[1].classList.add("selected");
        } else {
          e.currentTarget.children[1].classList.remove("selected");
          e.currentTarget.children[1].classList.add("not-selected");
        }

        setSearchInputs((prev) => {
          const temp = { ...prev };
          const index = temp[listName].findIndex((item) => item === optionName);
          if (index === -1) {
            const arr = [...temp[listName]];
            arr.push(optionName);
            temp[listName] = [...arr];
          } else {
            const arr = temp[listName].slice(0, index);
            const arr1 = temp[listName].slice(index + 1);
            temp[listName] = arr.concat(arr1);
          }
          return { ...prev, ...temp };
        });
      }}
    >
      <div>{optionName}</div>
      <span className={isSelected ? "selected" : "not-selected"}>
        <i className="fa-regular fa-circle-check"></i>
      </span>
    </div>
  );
};
