import { useEffect, useRef, useState } from "react";
import AnimeRankedListsNav from "./RankedListsNav";
import {
  aniListRequests,
  advancedSearchQuery,
} from "../../apis/aniList/aniList.queries";
import Spinner from "../../components/Spinner/Spinner";
import obito from "../../components/Spinner/spinnerImages/obito.png";
import TableLikeCard from "../AdvancedSearchPage/TableLikeCard/TableLikeCard";
import "./RankedListPage.css";
import { createSearchParams, useSearchParams } from "react-router-dom";
import TableLikeCardMobile from "../AdvancedSearchPage/TableLikeCard/TableLikeCardMobile/TableLikeCardMobile";

const AnimeTrendingList = ({
  type,
  sort,
  category,
  season,
  seasonYear,
  heading,
  format,
}) => {
  const [list, setList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(0);
  const isFirstRender = useRef(true);
  const [isMobileWidth, setIsMobileWidth] = useState(
    window.innerWidth <= 1000 ? true : false
  );
  const query = matchMedia("(max-width: 1000px)");
  query.addEventListener("change", () => {
    query.matches ? setIsMobileWidth(true) : setIsMobileWidth(false);
  });

  useEffect(() => {
    if (searchParams.size > 0) {
      if (searchParams.get("page")) setPageNumber(+searchParams.get("page"));
    }
  }, [searchParams]);

  useEffect(() => {
    if (isFirstRender.current && searchParams.size > 0) {
      isFirstRender.current = false;
      return;
    }
    const controller = new AbortController();
    const variables = {
      page: pageNumber === 0 ? 1 : pageNumber,
      perPage: 50,
      type,
      sort: [sort],
      season,
      seasonYear,
      format,
    };
    const getTrendingList = async () => {
      setIsLoading(true);
      try {
        const { data } = await aniListRequests(
          advancedSearchQuery,
          variables,
          controller.signal
        );
        if (data) {
          setList(data.Page.media);
          setPageInfo(data.Page.pageInfo);
          setIsLoading(false);
          window.history.pushState(
            {},
            "",
            `${
              window.location.origin
            }/search/${type.toLowerCase()}/${category}?${createSearchParams({
              page: variables.page,
            }).toString()}`
          );
        }
      } catch (e) {
        console.log(e);
        setList([]);
        setIsLoading(false);
      }
    };

    getTrendingList();

    return () => {
      controller.abort();
    };
  }, [
    pageNumber,
    searchParams.size,
    setIsLoading,
    type,
    sort,
    category,
    season,
    seasonYear,
    format,
  ]);

  const renderList = (list) => {
    return list.map((item, i) => {
      return (
        <TableLikeCard
          key={item.id}
          type={item.type?.toLowerCase()}
          id={item.id}
          title={item.title?.userPreferred || item.title.english}
          image={item.coverImage.large || item.coverImage.medium}
          genres={item.genres}
          averageScore={item.averageScore}
          popularity={item.popularity}
          format={item.format}
          episodes={item.episodes}
          duration={item.duration}
          status={item.status}
          nextAiringEpisode={item.nextAiringEpisode}
          season={item.season}
          seasonYear={item.seasonYear}
          showRank={true}
          rank={i + 1 + (pageInfo.currentPage - 1) * pageInfo.perPage}
          startYear={item.startDate?.year}
          endYear={item.endDate?.year}
          chapters={item.chapters}
          volumes={item.volumes}
        />
      );
    });
  };
  const renderMobileList = (list) => {
    return list.map((item, i) => {
      return (
        <TableLikeCardMobile
          key={item.id}
          type={item.type?.toLowerCase()}
          id={item.id}
          title={item.title?.userPreferred || item.title.english}
          image={item.coverImage.large || item.coverImage.medium}
          genres={item.genres}
          averageScore={item.averageScore}
          popularity={item.popularity}
          format={item.format}
          episodes={item.episodes}
          duration={item.duration}
          status={item.status}
          nextAiringEpisode={item.nextAiringEpisode}
          season={item.season}
          seasonYear={item.seasonYear}
          showRank={true}
          rank={i + 1 + (pageInfo.currentPage - 1) * pageInfo.perPage}
          startYear={item.startDate?.year}
          endYear={item.endDate?.year}
          chapters={item.chapters}
          volumes={item.volumes}
        />
      );
    });
  };

  return (
    <div className="ranked-list-page">
      <AnimeRankedListsNav type={type} />
      <h1>{heading}</h1>
      {isLoading ? (
        <Spinner image={obito} />
      ) : (
        <>
          {list.length > 0 && (
            <div className="page-nav">
              {pageNumber > 1 && (
                <span onClick={() => setPageNumber((prev) => prev - 1)}>
                  <i className="fa-solid fa-chevron-left"></i> Prev
                </span>
              )}
              <span
                onClick={() =>
                  setPageNumber((prev) => (prev === 0 ? prev + 2 : prev + 1))
                }
              >
                Next <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          )}
          <div className="ranked-list">{!isMobileWidth ? renderList(list) : renderMobileList(list)}</div>
          {list.length > 0 && (
            <div className="page-nav page-nav-bot">
              {pageNumber > 1 && (
                <span onClick={() => setPageNumber((prev) => prev - 1)}>
                  <i className="fa-solid fa-chevron-left"></i> Prev
                </span>
              )}
              <span
                onClick={() =>
                  setPageNumber((prev) => (prev === 0 ? prev + 2 : prev + 1))
                }
              >
                Next <i className="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AnimeTrendingList;
