import { useEffect, useState } from "react";
import "./AnimeAdvancedSearch.css";
import {
  aniListRequests,
  getGenresAndTagsQuery,
} from "../../../apis/aniList/aniList.queries";
import MediaSearchMenu from "../MediaSearchMenu/MediaSearchMenu";
import { useSessionStorage } from "../../../hooks/useSessionStorage";
import Spinner from "../../../components/Spinner/Spinner";
import rai from "../../../components/Spinner/spinnerImages/rai.png";
import MediaAdvancedSearchResultItem from "../MediaAdvancedSearchResultItem/MediaAdvancedSearchResultItem";

const AnimeAdvancedSearch = () => {
  const [list, setList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getUserSessionStorage, setUserSessionStorage } = useSessionStorage();
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  useEffect(() => {
    const controller = new AbortController();

    const getGenresAndTags = async () => {
      try {
        const { data } = await aniListRequests(
          getGenresAndTagsQuery,
          {},
          controller.signals
        );
        if (data) {
          setGenres(data.genres);
          setTags(data.tags);
          setUserSessionStorage("genres", data.genres);
          setUserSessionStorage("tags", data.tags);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const userCache = getUserSessionStorage();
    if (!userCache.genres || !userCache.tags) getGenresAndTags();
    else {
      setGenres(userCache.genres);
      setTags(userCache.tags);
    }

    return () => {
      controller.abort();
    };
  }, [getUserSessionStorage, setUserSessionStorage]);

  const renderSearchResults = () => {
    return list.map((item) => {
      return (
        <MediaAdvancedSearchResultItem
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
          duration={item.duration}
          status={item.status}
          nextAiringEpisode={item.nextAiringEpisode}
          season={item.season}
          seasonYear={item.seasonYear}
          showRank={false}
        />
      );
    });
  };

  return (
    <div>
      <MediaSearchMenu
        setList={setList}
        genres={genres}
        tags={tags}
        setIsLoading={setIsLoading}
        setIsFirstSearch={setIsFirstSearch}
      />
      {isLoading ? (
        <Spinner image={rai} />
      ) : isFirstSearch ? (
        <div className="search-message">
          Enter search parameters to start the search
        </div>
      ) : list.length > 0 ? (
        <div className="advanced-search-results-container">
          {renderSearchResults()}
        </div>
      ) : (
        <div className="search-message">
          no results found <i className="fa-solid fa-face-frown-open"></i> Try
          again with different parameters
        </div>
      )}
    </div>
  );
};

export default AnimeAdvancedSearch;
