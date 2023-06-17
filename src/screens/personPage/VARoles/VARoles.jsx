import { useState } from "react";
import VARoleCard from "../VARoleCard/VARoleCard";
import "./VARoles.css";
import SortByDropDown from "../../characterPage/CharacterPage/Appearances/SortByDropDown/SortByDropDown";
import InfiniteScroll from "react-infinite-scroll-component";
import InlineSpinner from "../../../components/Spinner/InlineSpinner";
import gojoEye from "../../../components/Spinner/GojoEye.png";

const VARoles = ({
  rolesList,
  cardWidth,
  cardHeight,
  dispatch,
  getNextPage,
  hasNextPage,
}) => {
  const [sortBy, setSortBy] = useState("Sort by");

  const renderVARoles = (roles) => {
    return roles.map((role) => {
      return (
        <VARoleCard
          key={role.node.id + "" + role.characters[0].id}
          role={role.characterRole}
          animeId={role.node.id}
          animeImage={role.node.coverImage.large || role.node.coverImage.medium}
          animeTitle={role.node.title.userPreferred || role.node.title.english}
          characterId={role.characters[0].id}
          characterName={role.characters[0].name.userPreferred}
          characterImage={
            role.characters[0].image.large || role.characters[0].image.medium
          }
          sortBy={sortBy}
          animePopularity={role.node.popularity}
          animeFavourites={role.node.favourites}
          animeAverageScore={role.node.averageScore}
          animeStartDate={role.node.startDate}
          animeFormat={role.node.format}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
        />
      );
    });
  };
  return (
    <>
      <div className="roles-container">
        <h2>Voice Acting Roles</h2>
        <SortByDropDown
          dispatch={dispatch}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <InfiniteScroll
          dataLength={rolesList.length}
          next={getNextPage}
          hasMore={hasNextPage}
          loader={<InlineSpinner image={gojoEye} />}
          scrollThreshold={0.9}
          style={{ overflowY: "hidden" }}
        >
          {renderVARoles(rolesList)}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default VARoles;
