import { useState } from "react";
import "./MediaAdvancedSearch.css";
import MediaSearchMenu from "../MediaSearchMenu/MediaSearchMenu";
import Spinner from "../../../components/Spinner/Spinner";
import rai from "../../../components/Spinner/spinnerImages/rai.png";
import TableLikeCard from "../TableLikeCard/TableLikeCard";
import TableLikeCardMobile from "../TableLikeCard/TableLikeCardMobile/TableLikeCardMobile";
import SecondaryFilter from "../SecondaryFilter/SecondaryFilter";

const MediaAdvancedSearch = ({ type, showSeasonFilter, formats }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileWidth, setIsMobileWidth] = useState(
    window.innerWidth <= 1000 ? true : false
  );
  const query = matchMedia("(max-width: 1000px)");
  query.addEventListener("change", () => {
    query.matches ? setIsMobileWidth(true) : setIsMobileWidth(false);
  });

  const renderSearchResults = () => {
    return list.map((item) => {
      return (
        <TableLikeCard
          key={item.id}
          type={item.type}
          id={item.id}
          title={item.title.userPreferred || item.title.english}
          image={item.coverImage.large || item.coverImage.medium}
          genres={item.genres}
          averageScore={item.averageScore}
          popularity={item.popularity}
          format={item.format}
          episodes={item.episodes}
          chapters={item.chapters}
          duration={item.duration}
          status={item.status}
          nextAiringEpisode={item.nextAiringEpisode}
          season={item.season}
          seasonYear={item.seasonYear}
          startYear={item.startDate?.year}
          showRank={false}
        />
      );
    });
  };

  const renderMobileSearchResults = () => {
    return list.map((item) => {
      return (
        <TableLikeCardMobile
          key={item.id}
          type={item.type}
          id={item.id}
          title={item.title.userPreferred || item.title.english}
          image={item.coverImage.large || item.coverImage.medium}
          genres={item.genres}
          averageScore={item.averageScore}
          popularity={item.popularity}
          format={item.format}
          episodes={item.episodes}
          chapters={item.chapters}
          duration={item.duration}
          status={item.status}
          nextAiringEpisode={item.nextAiringEpisode}
          season={item.season}
          seasonYear={item.seasonYear}
          startYear={item.startDate?.year}
          endYear={item.endDate?.year}
          showRank={false}
        />
      );
    });
  };

  return (
    <>
      <MediaSearchMenu
        setList={setList}
        setIsLoading={setIsLoading}
        type={type}
        formats={formats}
        showSeasonFilter={showSeasonFilter}
      />
      <SecondaryFilter />
      <div className="advanced-search-results-container">
        {isLoading ? (
          <Spinner
            image={rai}
            parentElementRect={document
              .querySelector(".advanced-search-results-container")
              ?.getBoundingClientRect()}
          />
        ) : list.length > 0 ? (
          isMobileWidth ? (
            renderMobileSearchResults()
          ) : (
            renderSearchResults()
          )
        ) : (
          <div className="search-message">
            no results found <i className="fa-solid fa-face-frown-open"></i> Try
            again with different parameters
          </div>
        )}
      </div>
    </>
  );
};

export default MediaAdvancedSearch;
