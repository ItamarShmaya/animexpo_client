import { useEffect, useState } from "react";
import AnimeRankedListsNav from "./RankedListsNav";
import {
  aniListRequests,
  advancedSearchQuery,
} from "../../apis/aniList/aniList.queries";
import Spinner from "../../components/Spinner/Spinner";
import obito from "../../components/Spinner/spinnerImages/obito.png";
import TableLikeCard from "../AdvancedSearchPage/TableLikeCard/TableLikeCard";
import "./RankedListPage.css";
import {
  useSearchParams,
} from "react-router-dom";
import TableLikeCardMobile from "../AdvancedSearchPage/TableLikeCard/TableLikeCardMobile/TableLikeCardMobile";
import PageNav from "../../components/PageNav/PageNav";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileWidth, setIsMobileWidth] = useState(
    window.innerWidth <= 1000 ? true : false
  );
  const query = matchMedia("(max-width: 1000px)");
  query.addEventListener("change", () => {
    query.matches ? setIsMobileWidth(true) : setIsMobileWidth(false);
  });

  useEffect(() => {
    const controller = new AbortController();
    const variables = {
      page: searchParams.get("page") ? +searchParams.get("page") : 1,
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
    searchParams,
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

  const onPrevClick = () => {
    const queryParams = {
      page: pageInfo?.currentPage - 1,
    };
    if (searchParams.get("search"))
      queryParams.search = searchParams.get("search");
    setSearchParams(queryParams);
  };

  const onNextClick = () => {
    const queryParams = {
      page: pageInfo?.currentPage + 1,
    };
    if (searchParams.get("search"))
      queryParams.search = searchParams.get("search");
    setSearchParams(queryParams);
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
            <PageNav
              pageNumber={pageInfo?.currentPage}
              onPrevClick={onPrevClick}
              onNextClick={onNextClick}
              hasNextPage={pageInfo?.hasNextPage}
            />
          )}
          <div className="ranked-list">
            {!isMobileWidth ? renderList(list) : renderMobileList(list)}
          </div>
          {list.length > 0 && (
            <PageNav
              pageNumber={pageInfo?.currentPage}
              onPrevClick={onPrevClick}
              onNextClick={onNextClick}
              hasNextPage={pageInfo?.hasNextPage}
              mid={true}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AnimeTrendingList;
