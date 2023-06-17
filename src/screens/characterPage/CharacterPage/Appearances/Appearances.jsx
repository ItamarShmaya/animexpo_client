import "./Appearances.css";
import gojoEye from "../../../../components/Spinner/GojoEye.png";
import InlineSpinner from "../../../../components/Spinner/InlineSpinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Appearance from "./Appearance/Appearance";
import SortByDropDown from "./SortByDropDown/SortByDropDown";
import { useState } from "react";

const Appearances = ({
  appearancesList,
  hasNextPage,
  getNextPage,
  dispatch,
}) => {
  const [sortBy, setSortBy] = useState("Sort by");

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
      />
      <div className="appearances-list">
        <InfiniteScroll
          dataLength={appearancesList.length}
          next={getNextPage}
          hasMore={hasNextPage}
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
