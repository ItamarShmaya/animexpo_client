import { useEffect, useState, JSX } from "react";
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
import { MediaSeason } from "../../apis/aniList/aniListTypes";
import Section from "./Section/Section";
import { Month } from "../../helpers/helpres.types";
import { landingPageData } from "./LandingPageTypes";

const LandingPage = (): JSX.Element => {
  const [landingPageData, setLandingPageData] = useState<landingPageData>();
  const { getUserSessionStorage, setUserSessionStorage } = useSessionStorage();
  const [cardMeasurement, setCardMeasurement] = useState<{
    height: number;
    width: number;
  }>({
    height: window.innerWidth > 400 ? 225 : window.innerWidth > 300 ? 175 : 120,
    width: window.innerWidth > 400 ? 150 : window.innerWidth > 300 ? 125 : 90,
  });
  const query400 = matchMedia("(max-width: 400px)");
  query400.addEventListener("change", () => {
    query400.matches
      ? setCardMeasurement({
          height: 175,
          width: 125,
        })
      : setCardMeasurement({
          height: 225,
          width: 150,
        });
  });
  const query300 = matchMedia("(max-width: 300px)");
  query300.addEventListener("change", () => {
    query300.matches
      ? setCardMeasurement({
          height: 120,
          width: 90,
        })
      : setCardMeasurement({
          height: 175,
          width: 125,
        });
  });

  useEffect(() => {
    const controller = new AbortController();

    const getLadingPageData = async () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      let currentSeasonYear = currentDate.getFullYear();
      const currentSeason = getCurrentSeason((currentMonth + 1) as Month);
      const nextSeason = getNextSeason((currentMonth + 1) as Month);
      const nextSeasonYear =
        nextSeason === MediaSeason.spring
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

    const landingPageData = getUserSessionStorage()?.landingPageData;
    landingPageData ? setLandingPageData(landingPageData) : getLadingPageData();

    return () => {
      controller.abort();
    };
  }, [getUserSessionStorage, setUserSessionStorage]);

  return (
    <div className="lading-page">
      <div className="hero">
        <SearchBar />
      </div>
      <div className="lists-container">
        {landingPageData ? (
          <>
            <Section
              list={landingPageData?.trending?.media}
              heading={"Trending Now"}
              type={"anime"}
              showRank={true}
              sliderSettings={landingPageSliderSettings}
              titleFontSize={14}
              category={"trending"}
              cardHeight={cardMeasurement.height}
              cardWidth={cardMeasurement.width}
            />
            <Section
              list={landingPageData?.thisSeason?.media}
              heading={"Popular This Season"}
              type={"anime"}
              showRank={true}
              sliderSettings={landingPageSliderSettings}
              titleFontSize={14}
              category={"this-season"}
              cardHeight={cardMeasurement.height}
              cardWidth={cardMeasurement.width}
            />
            <Section
              list={landingPageData?.nextSeason?.media}
              heading={"Upcoming Next Season"}
              type={"anime"}
              showRank={true}
              sliderSettings={landingPageSliderSettings}
              titleFontSize={14}
              category={"next-season"}
              cardHeight={cardMeasurement.height}
              cardWidth={cardMeasurement.width}
            />
            <Section
              list={landingPageData?.top?.media}
              heading={"Top Anime"}
              type={"anime"}
              showRank={true}
              sliderSettings={landingPageSliderSettings}
              titleFontSize={14}
              category={"top"}
              cardHeight={cardMeasurement.height}
              cardWidth={cardMeasurement.width}
            />
            <Section
              list={landingPageData?.popular?.media}
              heading={"All Time Popular"}
              type={"anime"}
              showRank={true}
              sliderSettings={landingPageSliderSettings}
              titleFontSize={14}
              category={"popular"}
              cardHeight={cardMeasurement.height}
              cardWidth={cardMeasurement.width}
            />
            <Section
              list={landingPageData?.topManga?.media}
              heading={"Top Manga"}
              type={"manga"}
              showRank={true}
              sliderSettings={landingPageSliderSettings}
              titleFontSize={14}
              category={"top"}
              cardHeight={cardMeasurement.height}
              cardWidth={cardMeasurement.width}
            />
            <Section
              list={landingPageData?.topCharacters?.characters}
              heading={"Favorite Characters"}
              type={"character"}
              showRank={true}
              sliderSettings={landingPageSliderSettings}
              titleFontSize={14}
              category={"favorite"}
              cardHeight={cardMeasurement.height}
              cardWidth={cardMeasurement.width}
            />
          </>
        ) : (
          <Spinner image={baru} />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
