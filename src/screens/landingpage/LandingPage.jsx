import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { landingPageSliderSettings } from "../../components/ImageSlide/sliderSettings";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import "./LandingPage.css";
import {
  aniListRequests,
  landingPageQuery,
} from "../../apis/aniList/aniList.queries";
import baru from "../../components/Spinner/spinnerImages/baru.png";
import Spinner from "../../components/Spinner/Spinner";
import { getCurrentSeason, getNextSeason } from "../../helpers/helpers";
import { MediaSeason } from "../../apis/aniList/types";
import Section from "./Section/Section";

const LandingPage = () => {
  const [landingPageData, setLandingPageData] = useState(null);
  const { getUserSessionStorage, setUserSessionStorage } = useSessionStorage();

  useEffect(() => {
    const controller = new AbortController();

    const getLadingPageData = async () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      let currentSeasonYear = currentDate.getFullYear();
      const currentSeason = getCurrentSeason(currentMonth);
      const nextSeason = getNextSeason(currentMonth);
      const nextSeasonYear =
        nextSeason === MediaSeason.fall
          ? currentSeasonYear + 1
          : currentSeasonYear;
      const variables = {
        season: currentSeason,
        seasonYear: currentSeasonYear,
        nextSeason: nextSeason,
        nextSeasonYear: nextSeasonYear,
      };
      try {
        const { data } = await aniListRequests(
          landingPageQuery,
          variables,
          controller.signal
        );

        data && setUserSessionStorage("landingPageData", data);
        data && setLandingPageData(data);
      } catch (e) {
        console.log(e);
      }
    };

    const landingPageData = getUserSessionStorage().landingPageData;
    landingPageData ? setLandingPageData(landingPageData) : getLadingPageData();

    return () => {
      controller.abort();
    };
  }, [getUserSessionStorage, setUserSessionStorage]);

  return (
    <>
      <div className="hero">
        <SearchBar />
      </div>
      {landingPageData ? (
        <div className="lists-container">
          <Section
            list={landingPageData?.trending?.media}
            heading={"Trending Now"}
            type={"anime"}
            showRank={true}
            sliderSettings={landingPageSliderSettings}
            titleFontSize={14}
            category={"trending"}
          />
          <Section
            list={landingPageData?.thisSeason?.media}
            heading={"Popular This Season"}
            type={"anime"}
            showRank={true}
            sliderSettings={landingPageSliderSettings}
            titleFontSize={14}
            category={"this-season"}
          />
          <Section
            list={landingPageData?.nextSeason?.media}
            heading={"Upcoming Next Season"}
            type={"anime"}
            showRank={true}
            sliderSettings={landingPageSliderSettings}
            titleFontSize={14}
            category={"next-season"}
          />
          <Section
            list={landingPageData?.top?.media}
            heading={"Top Anime"}
            type={"anime"}
            showRank={true}
            sliderSettings={landingPageSliderSettings}
            titleFontSize={14}
            category={"top"}
          />
          <Section
            list={landingPageData?.popular?.media}
            heading={"All Time Popular"}
            type={"anime"}
            showRank={true}
            sliderSettings={landingPageSliderSettings}
            titleFontSize={14}
            category={"popular"}
          />
          <Section
            list={landingPageData?.topManga?.media}
            heading={"Top Manga"}
            type={"manga"}
            showRank={true}
            sliderSettings={landingPageSliderSettings}
            titleFontSize={14}
            category={"top"}
          />
          <Section
            list={landingPageData?.topCharacters?.characters}
            heading={"Favorite Characters"}
            type={"character"}
            showRank={true}
            sliderSettings={landingPageSliderSettings}
            titleFontSize={14}
            category={"favorite"}
          />
        </div>
      ) : (
        <Spinner image={baru} />
      )}
    </>
  );
};

export default LandingPage;
