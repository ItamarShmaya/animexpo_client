import { useEffect, useRef, useState } from "react";
import "./FavoriteCharactersPage.css";
import {
  aniListRequests,
  getFavoriteCharactersQuery,
} from "../../apis/aniList/aniList.queries";
import { useSearchParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import PageNav from "../../components/PageNav/PageNav";
import Spinner from "../../components/Spinner/Spinner";
import madara from "../../components/Spinner/spinnerImages/madara-eternal.png";
import { CharacterSort } from "../../apis/aniList/types";

const FavoriteCharactersPage = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timeoutId = setTimeout(() => {
      const queryParams = {
        page: 1,
      };
      if (searchInput !== "" && searchInput !== searchParams.get("search")) {
        queryParams.search = searchInput;
        setSearchParams(queryParams);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchInput, setSearchParams, searchParams]);

  useEffect(() => {
    const controller = new AbortController();

    const variables = {
      page: searchParams.get("page") ? +searchParams.get("page") : 1,
      perPage: 50,
      search: searchParams.get("search")
        ? searchParams.get("search")
        : undefined,
      sort: searchParams.get("search")
        ? CharacterSort.searchMatch
        : CharacterSort.favouritesDesc,
    };

    searchParams.get("search")
      ? setSearchInput(searchParams.get("search"))
      : setSearchInput("");

    const getFavoriteCharacter = async () => {
      setIsLoading(true);
      try {
        const { data } = await aniListRequests(
          getFavoriteCharactersQuery,
          variables,
          controller.signal
        );

        if (data) {
          setList(data.Page.characters);
          setIsLoading(false);
          setPageInfo(data.Page.pageInfo);
        }
      } catch (e) {
        console.log(e);
        setList([]);
        setIsLoading(false);
      }
    };

    getFavoriteCharacter();

    return () => {
      controller.abort();
    };
  }, [searchParams]);

  const renderCharactersCards = (characters) => {
    return characters.map((char, i) => {
      return (
        <Card
          key={char.id}
          type={"character"}
          id={char.id}
          title={char.name.userPreferred}
          image={char.image.large || char.image.medium}
          rank={i + 1 + (pageInfo.currentPage - 1) * pageInfo.perPage}
          showRank={searchParams.get("search") ? false : true}
          cardHeight={225}
          cardWidth={150}
          titleFontSize={15}
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
    <div className="characters-list-page">
      <h1>
        {searchInput === "" ? "Most Favorite Characters" : "Search Characters"}
      </h1>
      <div className="search-input">
        <label htmlFor="search">Search</label>
        <div className="search-input-container">
          {searchInput === "" && (
            <div className="placeholder">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          )}
          <input
            type="text"
            name="search"
            value={searchInput}
            onChange={({ target }) => setSearchInput(target.value)}
          />
          {searchInput !== "" && (
            <span
              className="inline-icon clear-all"
              onClick={() => {
                setSearchParams({});
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
          )}
        </div>
      </div>
      {list.length > 0 && (
        <PageNav
          pageNumber={pageInfo?.currentPage}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          hasNextPage={pageInfo?.hasNextPage}
        />
      )}
      {!isLoading ? (
        <div className="char-list-container">{renderCharactersCards(list)}</div>
      ) : (
        <Spinner image={madara} />
      )}
      {list.length > 0 && (
        <PageNav
          pageNumber={pageInfo?.currentPage}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          hasNextPage={pageInfo?.hasNextPage}
          mid={true}
        />
      )}
    </div>
  );
};

export default FavoriteCharactersPage;
