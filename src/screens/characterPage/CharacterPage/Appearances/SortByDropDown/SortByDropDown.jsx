import { useState } from "react";
import "./SortByDropDown.css";

const SortByDropDown = ({ dispatch, sortBy, setSortBy }) => {
  const [display, setDisplay] = useState("none");

  return (
    <div
      className="sort-by"
      onClick={() => setDisplay((prev) => (prev === "none" ? "flex" : "none"))}
    >
      <span>{sortBy}</span>
      <div className="sort-dropdown-options" style={{ display }}>
        <div
          className="sort-option"
          onClick={() => {
            setSortBy("Popularity");
            dispatch({ type: "sort_popularity_desc" });
          }}
        >
          Popularity
        </div>
        <div
          className="sort-option"
          onClick={() => {
            setSortBy("Favourites");
            dispatch({ type: "sort_favourites_desc" });
          }}
        >
          Favourites
        </div>
        <div
          className="sort-option"
          onClick={() => {
            setSortBy("Score");
            dispatch({ type: "sort_averageScore_desc" });
          }}
        >
          Score
        </div>
        <div
          className="sort-option"
          onClick={() => {
            setSortBy("Newest");
            dispatch({ type: "sort_newest" });
          }}
        >
          Newest
        </div>
        <div
          className="sort-option"
          onClick={() => {
            setSortBy("Oldest");
            dispatch({ type: "sort_oldest" });
          }}
        >
          Oldest
        </div>
        <div
          className="sort-option"
          onClick={() => {
            setSortBy("Title");
            dispatch({ type: "sort_title_asc" });
          }}
        >
          Title
        </div>
      </div>
    </div>
  );
};

export default SortByDropDown;
