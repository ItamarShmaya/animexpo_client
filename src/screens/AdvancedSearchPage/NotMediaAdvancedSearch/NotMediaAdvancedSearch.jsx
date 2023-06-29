import { useEffect, useRef, useState } from "react";
import "./NotMediaAdvancedSearch.css";
import { aniListRequests } from "../../../apis/aniList/aniList.queries";
import { useSearchParams } from "react-router-dom";
import Card from "../../../components/Card/Card";
import PageNav from "../../../components/PageNav/PageNav";
import madara from "../../../components/Spinner/spinnerImages/madara-eternal.png";
import { capitalizeWord } from "../../../helpers/helpers";
import Spinner from "../../../components/Spinner/Spinner";

const NotMediaAdvancedSearch = ({ type, heading, query, sort }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );
  const isFirstRender = useRef(true);
  const [cardHeight, setCardHeight] = useState(
    window.innerWidth > 1040
      ? 225
      : window.innerWidth > 815
      ? 150
      : window.innerWidth > 740
      ? 160
      : window.innerWidth > 670
      ? 175
      : window.innerWidth > 590
      ? 225
      : window.innerWidth > 535
      ? 185
      : window.innerWidth > 475
      ? 160
      : window.innerWidth > 400
      ? 150
      : window.innerWidth > 350
      ? 200
      : window.innerWidth > 315
      ? 170
      : window.innerWidth > 300
      ? 150
      : 120
  );
  const [cardWidth, setCardWidth] = useState(
    window.innerWidth > 1040
      ? 150
      : window.innerWidth > 815
      ? 100
      : window.innerWidth > 740
      ? 110
      : window.innerWidth > 670
      ? 125
      : window.innerWidth > 590
      ? 150
      : window.innerWidth > 535
      ? 135
      : window.innerWidth > 475
      ? 120
      : window.innerWidth > 400
      ? 100
      : window.innerWidth > 350
      ? 135
      : window.innerWidth > 315
      ? 120
      : window.innerWidth > 300
      ? 110
      : 90
  );
  console.log(window.clientWidth);
  const mediaQuery1040 = matchMedia("(max-width: 1040px)");
  mediaQuery1040.addEventListener("change", () => {
    if (mediaQuery1040.matches) {
      setCardHeight(150);
      setCardWidth(100);
    } else {
      setCardHeight(225);
      setCardWidth(150);
    }
  });
  const mediaQuery815 = matchMedia("(max-width: 815px)");
  mediaQuery815.addEventListener("change", () => {
    if (mediaQuery815.matches) {
      setCardHeight(160);
      setCardWidth(110);
    } else {
      setCardHeight(150);
      setCardWidth(100);
    }
  });
  const mediaQuery740 = matchMedia("(max-width: 740px)");
  mediaQuery740.addEventListener("change", () => {
    if (mediaQuery740.matches) {
      setCardHeight(175);
      setCardWidth(125);
    } else {
      setCardHeight(160);
      setCardWidth(110);
    }
  });
  const mediaQuery670 = matchMedia("(max-width: 670px)");
  mediaQuery670.addEventListener("change", () => {
    if (mediaQuery670.matches) {
      setCardHeight(225);
      setCardWidth(150);
    } else {
      setCardHeight(175);
      setCardWidth(125);
    }
  });
  const mediaQuery590 = matchMedia("(max-width: 590px)");
  mediaQuery590.addEventListener("change", () => {
    if (mediaQuery590.matches) {
      setCardHeight(185);
      setCardWidth(135);
    } else {
      setCardHeight(225);
      setCardWidth(175);
    }
  });
  const mediaQuery535 = matchMedia("(max-width: 535px)");
  mediaQuery535.addEventListener("change", () => {
    if (mediaQuery535.matches) {
      setCardHeight(160);
      setCardWidth(120);
    } else {
      setCardHeight(185);
      setCardWidth(135);
    }
  });
  const mediaQuery475 = matchMedia("(max-width: 475px)");
  mediaQuery475.addEventListener("change", () => {
    if (mediaQuery475.matches) {
      setCardHeight(150);
      setCardWidth(100);
    } else {
      setCardHeight(160);
      setCardWidth(120);
    }
  });
  const mediaQuery400 = matchMedia("(max-width: 400px)");
  mediaQuery400.addEventListener("change", () => {
    if (mediaQuery400.matches) {
      setCardHeight(200);
      setCardWidth(135);
    } else {
      setCardHeight(150);
      setCardWidth(100);
    }
  });
  const mediaQuery350 = matchMedia("(max-width: 350px)");
  mediaQuery350.addEventListener("change", () => {
    if (mediaQuery350.matches) {
      setCardHeight(170);
      setCardWidth(120);
    } else {
      setCardHeight(200);
      setCardWidth(135);
    }
  });
  const mediaQuery315 = matchMedia("(max-width: 315px)");
  mediaQuery315.addEventListener("change", () => {
    if (mediaQuery315.matches) {
      setCardHeight(150);
      setCardWidth(110);
    } else {
      setCardHeight(170);
      setCardWidth(120);
    }
  });
  const mediaQuery300 = matchMedia("(max-width: 300px)");
  mediaQuery300.addEventListener("change", () => {
    if (mediaQuery300.matches) {
      setCardHeight(120);
      setCardWidth(90);
    } else {
      setCardHeight(150);
      setCardWidth(100);
    }
  });

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
      sort: searchParams.get("search") ? sort.searchMatch : sort.favouritesDesc,
    };

    searchParams.get("search")
      ? setSearchInput(searchParams.get("search"))
      : setSearchInput("");

    const getData = async () => {
      setIsLoading(true);
      try {
        const { data } = await aniListRequests(
          query,
          variables,
          controller.signal
        );

        if (data) {
          type === "character" && setList(data.Page.characters);
          type === "staff" && setList(data.Page.staff);
          setIsLoading(false);
          setPageInfo(data.Page.pageInfo);
        }
      } catch (e) {
        console.log(e);
        setList([]);
        setIsLoading(false);
      }
    };

    getData();

    return () => {
      controller.abort();
    };
  }, [searchParams, query, sort.searchMatch, sort.favouritesDesc, type]);

  const renderCards = (list) => {
    return list.map((char, i) => {
      return (
        <Card
          key={char.id}
          type={type}
          id={char.id}
          title={char.name.userPreferred}
          image={char.image.large || char.image.medium}
          rank={i + 1 + (pageInfo.currentPage - 1) * pageInfo.perPage}
          showRank={searchParams.get("search") ? false : true}
          cardHeight={cardHeight}
          cardWidth={cardWidth}
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
    <div className="search-list-page">
      <h1>
        {searchInput === ""
          ? `Most Favorite ${capitalizeWord(heading)}`
          : `Search ${capitalizeWord(heading)}`}
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
        <div className="char-list-container">{renderCards(list)}</div>
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

export default NotMediaAdvancedSearch;
