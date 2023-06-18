import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import CardsList from "../../components/CardsList/CardsList";
import Spinner from "../../components/Spinner/Spinner";
import { landingPageSliderSettings } from "../../components/ImageSlide/sliderSettings";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import "./LandingPage.css";
import axios from "axios";
import {
  url,
  headers,
  top25AnimeQuery,
  top25MangaQuery,
  top25CharactersQuery,
} from "../../apis/aniList/aniList.queries";
import baru from "../../components/Spinner/spinnerImages/baru.png";

const LandingPage = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [topManga, setTopManga] = useState([]);
  const [topCharacters, setTopCharacters] = useState([]);
  const { getLocalStorage, setLocalStorage } = useLocalStorage();

  useEffect(() => {
    const controller = new AbortController();

    const getTopAnime = async () => {
      try {
        const { data } = await axios({
          url,
          method: "POST",
          headers: headers,
          data: {
            query: top25AnimeQuery,
          },
          signal: controller.signal,
        });

        if (data.data.Page.media) {
          setLocalStorage("topAnime", data.data.Page.media);
          setTopAnime(data.data.Page.media);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const topAnime = getLocalStorage("topAnime");
    !topAnime ? getTopAnime() : setTopAnime(topAnime);

    return () => {
      controller.abort();
    };
  }, [getLocalStorage, setLocalStorage]);

  useEffect(() => {
    const controller = new AbortController();

    const getTopManga = async () => {
      try {
        const { data } = await axios({
          url,
          method: "POST",
          headers: headers,
          data: {
            query: top25MangaQuery,
          },
          signal: controller.signal,
        });

        if (data.data.Page.media) {
          setLocalStorage("topManga", data.data.Page.media);
          setTopManga(data.data.Page.media);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const topManga = getLocalStorage("topManga");
    !topManga ? getTopManga() : setTopManga(topManga);

    return () => {
      controller.abort();
    };
  }, [getLocalStorage, setLocalStorage]);

  useEffect(() => {
    const controller = new AbortController();

    const getTopCharacters = async () => {
      try {
        const { data } = await axios({
          url,
          method: "POST",
          headers: headers,
          data: {
            query: top25CharactersQuery,
          },
          signal: controller.signal,
        });

        if (data.data.Page.characters) {
          setLocalStorage("topCharacters", data.data.Page.characters);
          setTopCharacters(data.data.Page.characters);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const topCharacters = getLocalStorage("topCharacters");
    !topCharacters ? getTopCharacters() : setTopCharacters(topCharacters);

    return () => {
      controller.abort();
    };
  }, [getLocalStorage, setLocalStorage]);

  return (
    <>
      <div className="hero">
        <SearchBar />
      </div>
      {topAnime.length && topManga.length && topCharacters.length ? (
        <div className="lists-container">
          <section className="landing-page-section">
            <h1>Top Anime</h1>
            <CardsList
              list={topAnime}
              type="anime"
              showRank={true}
              sliderSettings={landingPageSliderSettings}
            />
          </section>
          <section className="landing-page-section">
            <h1>Top Manga</h1>
            <CardsList
              list={topManga}
              type="manga"
              showRank={true}
              sliderSettings={landingPageSliderSettings}
            />
          </section>
          <section className="landing-page-section">
            <h1>Favorite Characters</h1>
            <CardsList
              list={topCharacters}
              type="characters"
              showRank={true}
              sliderSettings={landingPageSliderSettings}
            />
          </section>
        </div>
      ) : (
        <Spinner image={baru} />
      )}
    </>
  );
};

export default LandingPage;
