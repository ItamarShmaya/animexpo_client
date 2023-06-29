import { useSearchParams } from "react-router-dom";
import "./MediaSearchMenu.css";
import { useEffect, useRef, useState } from "react";
import { MediaSeason, MediaSort, MediaType } from "../../../apis/aniList/types";
import {
  advancedSearchQuery,
  aniListRequests,
  getGenresAndTagsQuery,
} from "../../../apis/aniList/aniList.queries";
import {
  capitalizeWord,
  convertToArrayOfMediaFormats,
  getYearsFrom,
  searchParamsToObject,
  seasons,
} from "../../../helpers/helpers";
import { useSessionStorage } from "../../../hooks/useSessionStorage";

const MediaSearchMenu = ({
  setList,
  setIsLoading,
  type,
  formats,
  showSeasonFilter = true,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [viewedGenres, setViewedGenres] = useState([]);
  const [viewedTags, setViewedTags] = useState([]);
  const { getUserSessionStorage, setUserSessionStorage } = useSessionStorage();
  const [searchInputs, setSearchInputs] = useState({
    search: searchParams.get("search") || "",
    genres: searchParams.getAll("genres") || [],
    tags: searchParams.getAll("tags") || [],
    year: searchParams.get("year") || "",
    season: searchParams.get("season") || "",
    format: searchParams.getAll("format") || [],
  });
  const [yearsList] = useState(getYearsFrom(1940, "desc"));
  const [viewedYearsList, setViewedYearsList] = useState(yearsList);
  const [isAdult, setIsAdult] = useState(false);
  const isFirstRender = useRef(true);
  const [genresTagsFilter, setGenresTagsFilter] = useState("");
  const [yearsListFilter, setYearsListFilter] = useState("");
  const genresLabelRef = useRef();
  const yearLabelRef = useRef();
  const seasonLabelRef = useRef();
  const formatLabelRef = useRef();
  const genresDropDownRef = useRef();
  const yearsDropDownRef = useRef();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timeoutId = setTimeout(() => {
      const queryParamsObj = searchParamsToObject(searchParams);
      if (
        searchInputs.search !== "" &&
        searchInputs.search !== searchParams.get("search")
      ) {
        queryParamsObj.search = searchInputs.search;
        setSearchParams(queryParamsObj);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchInputs.search, setSearchParams, searchParams]);

  useEffect(() => {
    const controller = new AbortController();

    const getGenresAndTags = async () => {
      try {
        const { data } = await aniListRequests(
          getGenresAndTagsQuery,
          {},
          controller.signals
        );
        if (data) {
          setGenres(data.genres);
          setTags(data.tags);
          setViewedGenres(data.genres);
          setViewedTags(data.tags);
          setUserSessionStorage("genres", data.genres);
          setUserSessionStorage("tags", data.tags);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const userCache = getUserSessionStorage();
    if (!userCache.genres || !userCache.tags) getGenresAndTags();
    else {
      setGenres(userCache.genres);
      setTags(userCache.tags);
      setViewedGenres(userCache.genres);
      setViewedTags(userCache.tags);
    }

    return () => {
      controller.abort();
    };
  }, [getUserSessionStorage, setUserSessionStorage]);

  useEffect(() => {
    const controller = new AbortController();
    const variables = {
      page: 1,
      type: MediaType[type.toLowerCase()],
      search: searchParams.get("search") || undefined,
      genres:
        searchParams.getAll("genres")?.length > 0
          ? searchParams.getAll("genres")
          : undefined,
      tags:
        searchParams.getAll("tags")?.length > 0
          ? searchParams.getAll("tags")
          : undefined,
      year: searchParams.get("year")
        ? searchParams.get("year") + "%"
        : undefined,
      season: searchParams.get("season")
        ? MediaSeason[searchParams.get("season")?.toLowerCase()]
        : undefined,
      format:
        searchParams.getAll("format")?.length > 0
          ? convertToArrayOfMediaFormats(searchParams.getAll("format"))
          : undefined,
      sort: searchParams.get("sort")
        ? MediaSort[searchParams.get("sort")]
        : undefined,
    };
    setSearchInputs(() => {
      return {
        search: variables.search ? variables.search : "",
        genres: variables.genres?.length > 0 ? variables.genres : [],
        tags: variables.tags?.length > 0 ? variables.tags : [],
        year: searchParams.get("year") ? searchParams.get("year") : "",
        season: variables.season ? capitalizeWord(variables.season) : "",
        format:
          searchParams.getAll("format")?.length > 0
            ? searchParams.getAll("format")
            : [],
      };
    });

    const getSearchedList = async () => {
      setIsLoading(true);
      try {
        const { data } = await aniListRequests(
          advancedSearchQuery,
          variables,
          controller.signal
        );
        if (data) {
          setList(data.Page.media);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
        setList([]);
        setIsLoading(false);
      }
    };

    getSearchedList();

    return () => {
      controller.abort();
    };
  }, [searchParams, setList, isFirstRender, setIsLoading, type]);

  const renderSignleSelectOptions = (optionsValues, key) => {
    return optionsValues.map((option) => {
      return (
        <div
          key={option}
          className="dropdown-option"
          onClick={() => {
            const paramsObj = searchParamsToObject(searchParams);
            paramsObj[key] = option;
            setSearchParams(paramsObj);
          }}
        >
          {option.toString().toLowerCase() === "tv"
            ? "TV Show"
            : capitalizeWord(option)}
        </div>
      );
    });
  };

  const renderGenresAndTagsOptions = (genres, tags) => {
    return (
      <>
        <div className="genres-group">
          <div className="group-title">Genres</div>
          {genres.map((genre) => {
            if (!isAdult && genre.toLowerCase() === "hentai") return undefined;
            return (
              <MultipleSelectOption
                key={genre}
                isSelected={searchInputs.genres.includes(genre)}
                optionName={genre}
                listName={"genres"}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            );
          })}
        </div>
        <div className="tags-group">
          <div className="group-title">Tags</div>
          {tags.map((tag) => {
            if (!isAdult && tag.isAdult) return undefined;
            return (
              <MultipleSelectOption
                key={tag.name}
                isSelected={searchInputs.tags.includes(tag.name)}
                optionName={tag.name}
                listName={"tags"}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
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
    const closeDropDown = (e) => {
      if (
        genresLabelRef.current?.contains(e.target) ||
        yearLabelRef.current?.contains(e.target) ||
        seasonLabelRef.current?.contains(e.target) ||
        formatLabelRef.current?.contains(e.target)
      ) {
        return;
      }
      const dropdowns = document.querySelectorAll(".dropdown-options");
      dropdowns.forEach((dropdown) => {
        dropdown.style.display = "none";
      });
      setGenresTagsFilter("");
      setYearsListFilter("");
      setViewedGenres(genres);
      setViewedTags(tags);
      setViewedYearsList(yearsList);
    };
    window.addEventListener("click", closeDropDown);
    return () => {
      window.removeEventListener("click", closeDropDown);
    };
  }, [genres, tags, yearsList]);

  return (
    <div className="search-menu">
      <div className="menu-item">
        <div className="menu-item-name">Search</div>
        <div className="search-bar">
          {searchInputs.search === "" && (
            <div className="placeholder">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          )}
          <input
            className="filter"
            type="text"
            name="search-bar"
            onChange={({ target }) =>
              setSearchInputs((prev) => {
                return { ...prev, search: target.value };
              })
            }
            value={searchInputs.search}
          />
          {searchInputs.search !== "" && (
            <span
              className="inline-icon clear-all"
              onClick={(e) => {
                e.stopPropagation();
                const paramsObj = searchParamsToObject(searchParams);
                delete paramsObj.search;
                setSearchParams(paramsObj);
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
          <div className="genres-label" ref={genresLabelRef}>
            <input
              className="filter-input"
              type="text"
              value={genresTagsFilter}
              onChange={({ target }) => {
                setGenresTagsFilter(target.value);
                if (target.value === "") {
                  setViewedGenres(genres);
                  setViewedTags(tags);
                  return;
                }
                genresDropDownRef.current.style.display = "flex";
                setViewedGenres(() => {
                  return genres.filter((genre) =>
                    genre.toLowerCase().includes(target.value.toLowerCase())
                  );
                });
                setViewedTags(() => {
                  return tags.filter((tag) =>
                    tag.name.toLowerCase().includes(target.value.toLowerCase())
                  );
                });
              }}
              onFocus={(e) => {
                e.target.parentElement.children[1].style.display = "none";
              }}
              onBlur={(e) => {
                e.target.parentElement.children[1].style.display = "flex";
              }}
            />
            {searchInputs.genres.length > 0 || searchInputs.tags.length > 0 ? (
              <div className="selected-label">
                <span className="multiple-select-span">
                  {searchInputs.genres[0] || searchInputs.tags[0]}
                </span>
                {searchInputs.genres.length + searchInputs.tags.length > 1 && (
                  <span className="multiple-select-span">
                    +{searchInputs.genres.length + searchInputs.tags.length - 1}
                  </span>
                )}
              </div>
            ) : (
              <span className="placeholder">Any</span>
            )}
            {searchInputs.genres.length > 0 || searchInputs.tags.length > 0 ? (
              <span
                className="inline-icon clear-all"
                onClick={(e) => {
                  e.stopPropagation();
                  const paramsObj = searchParamsToObject(searchParams);
                  delete paramsObj.genres;
                  delete paramsObj.tags;
                  setGenresTagsFilter("");
                  setSearchParams(paramsObj);
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
          <div
            className="dropdown-options"
            ref={genresDropDownRef}
            style={{ display: "none" }}
          >
            {renderGenresAndTagsOptions(viewedGenres, viewedTags)}
          </div>
        </div>
      </div>
      <div className="menu-item">
        <div className="menu-item-name">Year</div>
        <div className="filter dropdown" onClick={onDropdownClick}>
          <div className="menu-item-label" ref={yearLabelRef}>
            <input
              className="filter-input"
              type="text"
              value={yearsListFilter}
              onChange={({ target }) => {
                setYearsListFilter(target.value);
                if (target.value === "") {
                  setViewedYearsList(yearsList);
                  return;
                }
                yearsDropDownRef.current.style.display = "flex";
                setViewedYearsList(() => {
                  return yearsList.filter((year) =>
                    year.toString().includes(target.value)
                  );
                });
              }}
              onFocus={(e) => {
                e.target.parentElement.children[1].style.display = "none";
              }}
              onBlur={(e) => {
                e.target.parentElement.children[1].style.display = "flex";
              }}
            />
            {searchInputs.year ? (
              <span className="selected-value">{searchInputs.year}</span>
            ) : (
              <span className="selected-value placeholder">Any</span>
            )}
          </div>
          <div
            className="dropdown-options"
            ref={yearsDropDownRef}
            style={{ display: "none" }}
          >
            {renderSignleSelectOptions(viewedYearsList, "year")}
          </div>
          {searchInputs.year ? (
            <span
              className="inline-icon clear-all"
              onClick={(e) => {
                e.stopPropagation();
                const paramsObj = searchParamsToObject(searchParams);
                delete paramsObj.year;
                setSearchParams(paramsObj);
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
      {showSeasonFilter && (
        <div className="menu-item">
          <div className="menu-item-name">Season</div>
          <div className="filter dropdown" onClick={onDropdownClick}>
            <div className="menu-item-label" ref={seasonLabelRef}>
              {searchInputs.season ? (
                <span className="selected-value">{searchInputs.season}</span>
              ) : (
                <span className="selected-value placeholder">Any</span>
              )}
            </div>
            <div className="dropdown-options" style={{ display: "none" }}>
              {renderSignleSelectOptions(seasons, "season")}
            </div>
            {searchInputs.season ? (
              <span
                className="inline-icon clear-all"
                onClick={(e) => {
                  e.stopPropagation();
                  const paramsObj = searchParamsToObject(searchParams);
                  delete paramsObj.season;
                  setSearchParams(paramsObj);
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
      )}
      <div className="menu-item">
        <div className="menu-item-name">Format</div>
        <div className="filter dropdown" onClick={onDropdownClick}>
          <div className="multiple-select-label" ref={formatLabelRef}>
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
                  const paramsObj = searchParamsToObject(searchParams);
                  delete paramsObj.format;
                  setSearchParams(paramsObj);
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
            {formats.map((format) => {
              return (
                <MultipleSelectOption
                  key={format}
                  isSelected={searchInputs.format.includes(format)}
                  optionName={
                    format.toLowerCase() === "tv" ? "TV Show" : format
                  }
                  listName={"format"}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
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
  isSelected,
  optionName,
  searchParams,
  setSearchParams,
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

        const paramsObj = searchParamsToObject(searchParams);
        paramsObj[listName]
          ? (paramsObj[listName] = [...paramsObj[listName], optionName])
          : (paramsObj[listName] = [optionName]);
        setSearchParams(paramsObj);
      }}
    >
      <div>{optionName}</div>
      <span className={isSelected ? "selected" : "not-selected"}>
        <i className="fa-regular fa-circle-check"></i>
      </span>
    </div>
  );
};
