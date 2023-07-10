import { useState, JSX } from "react";
import VARoleCard from "../VARoleCard/VARoleCard";
import "./VARoles.css";
import SortByDropDown from "../../characterPage/CharacterPage/Appearances/SortByDropDown/SortByDropDown";
import InfiniteScroll from "react-infinite-scroll-component";
import InlineSpinner from "../../../components/Spinner/InlineSpinner";
import gojoEye from "../../../components/Spinner/spinnerImages/GojoEye.png";
import {
  aniListRequests,
  staffCharactersByPage,
} from "../../../apis/aniList/aniList.queries";
import { VARolesProps } from "./VARoles.types";

const VARoles = ({
  rolesList,
  cardWidth,
  cardHeight,
  dispatch,
  id,
  pageInfo,
  setPageInfo,
}: VARolesProps): JSX.Element => {
  const [sortBy, setSortBy] = useState("Sort by");

  const getNextPage = async () => {
    const variables = {
      id,
      page: pageInfo.currentPage + 1,
      perPage: 25,
    };

    try {
      const { data } = await aniListRequests(staffCharactersByPage, variables);

      if (data) {
        setPageInfo(data.Staff.characterMedia.pageInfo);
        dispatch({
          type: "update_list",
          list: data.Staff.characterMedia.edges,
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
        if (sortBy === "Name") return dispatch({ type: "sort_name_asc" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderVARoles = () => {
    return rolesList.map((role) => {
      return (
        <VARoleCard
          key={role.node.id + "" + role.characters[0]?.id}
          role={role.characterRole}
          animeId={role.node.id}
          animeImage={
            role.node.coverImage.large ||
            (role.node.coverImage.medium as string)
          }
          animeTitle={
            role.node.title.userPreferred || (role.node.title.english as string)
          }
          characterId={role.characters[0]?.id}
          characterName={role.characters[0]?.name.userPreferred}
          characterImage={
            role.characters[0]?.image.large ||
            (role.characters[0]?.image.medium as string)
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
          hasMore={pageInfo.hasNextPage}
          loader={<InlineSpinner image={gojoEye} />}
          scrollThreshold={0.9}
          style={{ overflowY: "hidden" }}
        >
          {renderVARoles()}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default VARoles;
