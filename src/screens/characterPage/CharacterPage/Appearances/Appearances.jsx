import "./Appearances.css";
import gojoEye from "../../../../components/Spinner/spinnerImages/GojoEye.png";
import InlineSpinner from "../../../../components/Spinner/InlineSpinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Appearance from "./Appearance/Appearance";
import SortByDropDown from "./SortByDropDown/SortByDropDown";
import { useState } from "react";
import {
  aniListRequests,
  characterAppearancesByPage,
} from "../../../../apis/aniList/aniList.queries";

const Appearances = ({
  id,
  appearancesList,
  pageInfo,
  setPageInfo,
  dispatch,
}) => {
  const [sortBy, setSortBy] = useState("Sort by");

  const getNextPage = async () => {
    const variables = {
      id,
      page: pageInfo.currentPage + 1,
      perPage: 25,
    };

    try {
      const { data } = await aniListRequests(
        characterAppearancesByPage,
        variables
      );

      if (data) {
        setPageInfo(data.Character.media.pageInfo);
        dispatch({
          type: "update_list",
          list: data.Character.media.edges,
        });

        if (sortBy === "Popularity")
          return dispatch({ type: "sort_popularity_desc" });
        if (sortBy === "Favourites")
          return dispatch({ type: "sort_favourites_desc" });
        if (sortBy === "Score")
          return dispatch({ type: "sort_averageScore_desc" });
        if (sortBy === "Newest") return dispatch({ type: "sort_newest" });
        if (sortBy === "Oldest") return dispatch({ type: "sort_oldest" });
        if (sortBy === "Title") return dispatch({ type: "sort_title_asc" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderAppearancesList = (appearancesList) => {
    return appearancesList.map((appearance) => {
      return (
        <Appearance
          appearance={appearance}
          key={appearance.node.id}
          sortBy={sortBy}
        />
      );
    });
  };

  return (
    <div className="character-appearances">
      <h2>Appearances</h2>
      <SortByDropDown
        dispatch={dispatch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortByNameAsc={false}
        sortByTrendingDesc={false}
      />
      <div className="appearances-list">
        <InfiniteScroll
          dataLength={appearancesList.length}
          next={getNextPage}
          hasMore={pageInfo.hasNextPage}
          loader={<InlineSpinner image={gojoEye} />}
          scrollThreshold={0.9}
          style={{ overflowY: "hidden" }}
        >
          {renderAppearancesList(appearancesList)}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Appearances;
