import { useState } from "react";
import "./SecondaryFilter.css";
import { useSearchParams } from "react-router-dom";
import { searchParamsToObject } from "../../../helpers/helpers";
import { MediaSortString } from "../../../apis/aniList/types";

const SecondaryFilter = () => {
  return (
    <div className="secondary-filter">
      <SortByDropDown />
    </div>
  );
};

export default SecondaryFilter;

const SortByDropDown = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [display, setDisplay] = useState("none");

  return (
    <div
      className="sort-by"
      onClick={() => setDisplay((prev) => (prev === "none" ? "flex" : "none"))}
    >
      <span className="sort-label">
        {MediaSortString[searchParams.get("sort")] || "Popularity"}
        <span className="icon-wrapper">
          <i className="fa-solid fa-sort"></i>
        </span>
      </span>
      <div className="sort-dropdown-options" style={{ display }}>
        <div
          className="sort-option"
          onClick={() => {
            const paramsObj = searchParamsToObject(searchParams);
            paramsObj.sort = "popularityDesc";
            setSearchParams(paramsObj);
          }}
        >
          Popularity
        </div>
        <div
          className="sort-option"
          onClick={() => {
            const paramsObj = searchParamsToObject(searchParams);
            paramsObj.sort = "favouritesDesc";
            setSearchParams(paramsObj);
          }}
        >
          Favourites
        </div>
        <div
          className="sort-option"
          onClick={() => {
            const paramsObj = searchParamsToObject(searchParams);
            paramsObj.sort = "scoreDesc";
            setSearchParams(paramsObj);
          }}
        >
          Score
        </div>
        <div
          className="sort-option"
          onClick={() => {
            const paramsObj = searchParamsToObject(searchParams);
            paramsObj.sort = "startDateDesc";
            setSearchParams(paramsObj);
          }}
        >
          Newest
        </div>
        <div
          className="sort-option"
          onClick={() => {
            const paramsObj = searchParamsToObject(searchParams);
            paramsObj.sort = "endDate";
            setSearchParams(paramsObj);
          }}
        >
          Oldest
        </div>
        <div
          className="sort-option"
          onClick={() => {
            const paramsObj = searchParamsToObject(searchParams);
            paramsObj.sort = "titleRomanji";
            setSearchParams(paramsObj);
          }}
        >
          Title
        </div>
        <div
          className="sort-option"
          onClick={() => {
            const paramsObj = searchParamsToObject(searchParams);
            paramsObj.sort = "trendingDesc";
            setSearchParams(paramsObj);
          }}
        >
          Trending
        </div>
      </div>
    </div>
  );
};
