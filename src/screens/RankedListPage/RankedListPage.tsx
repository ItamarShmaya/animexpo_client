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
import { useSearchParams } from "react-router-dom";
import TableLikeCardMobile from "../AdvancedSearchPage/TableLikeCard/TableLikeCardMobile/TableLikeCardMobile";
import PageNav from "../../components/PageNav/PageNav";
import { RankedListPageProrps } from "./RankedListPage.types";
import {
  ApiPageInfoType,
  ApiMediaEntryType,
} from "../../apis/aniList/aniListTypes.types";

const AnimeTrendingList = ({
  mediaType,
  mediaSort,
  season,
  seasonYear,
  heading,
  mediaFormat,
}: RankedListPageProrps): JSX.Element => {
  const [list, setList] = useState<ApiMediaEntryType[] | []>([]);
  const [pageInfo, setPageInfo] = useState<ApiPageInfoType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileWidth, setIsMobileWidth] = useState<boolean>(
    window.innerWidth <= 1000 ? true : false
  );
  const query = matchMedia("(max-width: 1000px)");
  query.addEventListener("change", () => {
    query.matches ? setIsMobileWidth(true) : setIsMobileWidth(false);
  });

  useEffect(() => {
    const controller = new AbortController();
    const paramPage = searchParams.get("page");
    const variables = {
      page: paramPage ? +paramPage : 1,
      perPage: 50,
      mediaType,
      sort: [mediaSort],
      season,
      seasonYear,
      format: mediaFormat,
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
    mediaType,
    mediaSort,
    season,
    seasonYear,
    mediaFormat,
  ]);

  const renderList = (list: ApiMediaEntryType[] | []) => {
    return list.map((item, i) => {
      const rank =
        pageInfo && pageInfo.currentPage && pageInfo.perPage
          ? i + 1 + (pageInfo.currentPage - 1) * pageInfo.perPage
          : 0;
      return (
        <TableLikeCard
          key={item.id}
          type={item.type?.toLowerCase()}
          id={item.id}
          title={item.title?.userPreferred || item.title?.english}
          image={item.coverImage?.large || item.coverImage?.medium}
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
          rank={rank}
          startYear={item.startDate?.year}
          endYear={item.endDate?.year}
          chapters={item.chapters}
          volumes={item.volumes}
        />
      );
    });
  };
  const renderMobileList = (list: ApiMediaEntryType[] | []) => {
    return list.map((item, i) => {
      const rank =
        pageInfo && pageInfo.currentPage && pageInfo.perPage
          ? i + 1 + (pageInfo.currentPage - 1) * pageInfo.perPage
          : undefined;
      return (
        <TableLikeCardMobile
          key={item.id}
          type={item.type?.toLowerCase()}
          id={item.id}
          title={item.title?.userPreferred || item.title?.english}
          image={item.coverImage?.large || item.coverImage?.medium}
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
          showRank={rank ? true : false}
          rank={rank && rank}
          startYear={item.startDate?.year}
          endYear={item.endDate?.year}
          chapters={item.chapters}
          volumes={item.volumes}
        />
      );
    });
  };

  const onPrevClick = () => {
    const page = pageInfo?.currentPage ? pageInfo?.currentPage - 1 : 1;
    const queryParams: { page: string; search?: string } = {
      page: page.toString(),
    };
    const searchString = searchParams.get("search");
    if (searchString) {
      queryParams.search = searchString;
    }

    setSearchParams(queryParams);
  };

  const onNextClick = () => {
    const page = pageInfo?.currentPage ? pageInfo?.currentPage + 1 : 1;
    const queryParams: { page: string; search?: string } = {
      page: page.toString(),
    };
    const searchString = searchParams.get("search");
    if (searchString) {
      queryParams.search = searchString;
    }
    setSearchParams(queryParams);
  };

  return (
    <div className="ranked-list-page">
      <AnimeRankedListsNav mediaType={mediaType} />
      <h1>{heading}</h1>
      <div className="ranked-list-container">
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
    </div>
  );
};

export default AnimeTrendingList;
