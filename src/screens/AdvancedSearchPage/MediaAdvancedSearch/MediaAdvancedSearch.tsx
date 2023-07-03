import { useLayoutEffect, useRef, useState } from "react";
import "./MediaAdvancedSearch.css";
import MediaSearchMenu from "../MediaSearchMenu/MediaSearchMenu";
import Spinner from "../../../components/Spinner/Spinner";
import rai from "../../../components/Spinner/spinnerImages/rai.png";
import TableLikeCard from "../TableLikeCard/TableLikeCard";
import TableLikeCardMobile from "../TableLikeCard/TableLikeCardMobile/TableLikeCardMobile";
import SecondaryFilter from "../SecondaryFilter/SecondaryFilter";
import { MediaAdvancedSearchProps } from "./MediaAdvancedSearch.types";
import { ApiMediaEntryType } from "../../../apis/aniList/aniListTypes.types";

const MediaAdvancedSearch = ({
  mediaType,
  showSeasonFilter,
  formats,
}: MediaAdvancedSearchProps) => {
  const [list, setList] = useState<ApiMediaEntryType[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const [topOffset, setTopOffset] = useState<number>();
  const [isMobileWidth, setIsMobileWidth] = useState<boolean>(
    window.innerWidth <= 1000 ? true : false
  );
  const query = matchMedia("(max-width: 1000px)");
  query.addEventListener("change", () => {
    query.matches ? setIsMobileWidth(true) : setIsMobileWidth(false);
  });

  const renderSearchResults = (): JSX.Element[] => {
    return list.map((item) => {
      return (
        <TableLikeCard
          key={item.id}
          type={item.type}
          id={item.id}
          title={item.title?.userPreferred || item.title?.english}
          image={item.coverImage?.large || item.coverImage?.medium}
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
          title={item.title?.userPreferred || item.title?.english}
          image={item.coverImage?.large || item.coverImage?.medium}
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

  useLayoutEffect(() => {
    if (resultsContainerRef.current)
      setTopOffset(resultsContainerRef.current.getBoundingClientRect().top);
  }, []);

  return (
    <>
      <MediaSearchMenu
        setList={setList}
        setIsLoading={setIsLoading}
        mediaType={mediaType}
        formats={formats}
        showSeasonFilter={showSeasonFilter}
      />
      <SecondaryFilter />
      <div
        className="advanced-search-results-container"
        ref={resultsContainerRef}
      >
        {isLoading ? (
          <Spinner image={rai} topOffset={topOffset} />
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
