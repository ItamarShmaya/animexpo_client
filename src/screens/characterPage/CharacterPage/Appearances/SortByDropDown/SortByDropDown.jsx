import { useState } from "react";
import "./SortByDropDown.css";

const SortByDropDown = ({
  dispatch,
  sortBy,
  setSortBy,
  sortByPopularityDesc = true,
  sortByFavouritesDesc = true,
  sortByScoreDesc = true,
  sortByDateDesc = true,
  sortByDateAsc = true,
  sortByTitleAsc = true,
  sortByNameAsc = true,
  sortByTrendingDesc = true,
}) => {
  const [display, setDisplay] = useState("none");

  return (
    <div
      className="sort-by"
      onClick={() => setDisplay((prev) => (prev === "none" ? "flex" : "none"))}
    >
      <span className="sort-label">
        {sortBy}
        <span className="icon-wrapper">
          <i className="fa-solid fa-sort"></i>
        </span>
      </span>
      <div className="sort-dropdown-options" style={{ display }}>
        {sortByPopularityDesc && (
          <div
            className="sort-option"
            onClick={() => {
              setSortBy("Popularity");
              dispatch({ type: "sort_popularity_desc" });
            }}
          >
            Popularity
          </div>
        )}
        {sortByFavouritesDesc && (
          <div
            className="sort-option"
            onClick={() => {
              setSortBy("Favourites");
              dispatch({ type: "sort_favourites_desc" });
            }}
          >
            Favourites
          </div>
        )}
        {sortByScoreDesc && (
          <div
            className="sort-option"
            onClick={() => {
              setSortBy("Score");
              dispatch({ type: "sort_averageScore_desc" });
            }}
          >
            Score
          </div>
        )}
        {sortByDateDesc && (
          <div
            className="sort-option"
            onClick={() => {
              setSortBy("Newest");
              dispatch({ type: "sort_newest" });
            }}
          >
            Newest
          </div>
        )}
        {sortByDateAsc && (
          <div
            className="sort-option"
            onClick={() => {
              setSortBy("Oldest");
              dispatch({ type: "sort_oldest" });
            }}
          >
            Oldest
          </div>
        )}
        {sortByTitleAsc && (
          <div
            className="sort-option"
            onClick={() => {
              setSortBy("Title");
              dispatch({ type: "sort_title_asc" });
            }}
          >
            Title
          </div>
        )}
        {sortByNameAsc && (
          <div
            className="sort-option"
            onClick={() => {
              setSortBy("Name");
              dispatch({ type: "sort_name_asc" });
            }}
          >
            Name
          </div>
        )}
        {sortByTrendingDesc && (
          <div
            className="sort-option"
            onClick={() => {
              setSortBy("Trending");
              dispatch({ type: "sort_trending_desc" });
            }}
          >
            Trending
          </div>
        )}
      </div>
    </div>
  );
};

export default SortByDropDown;
