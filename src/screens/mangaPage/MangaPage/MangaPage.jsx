import { useEffect, useState } from "react";
import {
  getMangaById,
  getMangaPicturesById,
  getMangaCharactersById,
  getMangaRecommendationsById,
} from "../../../apis/jikan/jikan_api_requests";
import "./MangaPage.css";
import MangaHero from "./MangaHero/MangaHero";
import MangaBanner from "./MangaHero/MangaBanner/MangaBanner";
import MangaInformation from "./MangaInformation/MangaInformation";
import MangaCharacters from "./MangaCharacters/MangaCharacters";
import MangaRecommendations from "./MangaRecommendations/MangaRecommendations";
import Spinner from "../../../components/Spinner/Spinner";
import "../../animepage/AnimePage/AnimePage.css";
import { useParams } from "react-router-dom";

const MangaPage = () => {
  const [manga, setManga] = useState({});
  const [pictures, setPictures] = useState(null);
  const [characters, setCharacters] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const [watching, setWatching] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    let timeOutId;
    const fetchMangaData = async () => {
      timeOutId = setTimeout(async () => {
        const mangaResponse = await getMangaById(id);
        mangaResponse && setManga(mangaResponse.data);
      }, 1000);
    };
    fetchMangaData();
    return () => {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
    };
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    let timeOutId;
    const fetchMangaPictures = async () => {
      timeOutId = setTimeout(async () => {
        const picturesResponse = await getMangaPicturesById(id);
        picturesResponse && setPictures(picturesResponse.data);
      }, 2000);
    };
    fetchMangaPictures();
    return () => {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
    };
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    let timeOutId;
    const fetchMangaCharacters = async () => {
      timeOutId = setTimeout(async () => {
        const charactersResponse = await getMangaCharactersById(id);
        charactersResponse && setCharacters(charactersResponse.data);
      }, 3000);
    };
    fetchMangaCharacters();
    return () => {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
    };
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    let timeOutId;
    const fetchMagnaRecommendations = async () => {
      timeOutId = setTimeout(async () => {
        const recommendationResponse = await getMangaRecommendationsById(id);
        recommendationResponse &&
          setRecommendations(recommendationResponse.data);
      }, 4000);
    };
    fetchMagnaRecommendations();
    return () => {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
    };
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className="anime-page">
      <div className="anime-hero">
        {pictures && Object.keys(manga).length > 0 && (
          <MangaBanner pictures={pictures} images={manga.images} />
        )}
        {Object.keys(manga).length > 0 ? (
          <MangaHero
            manga={manga}
            watching={watching}
            setWatching={setWatching}
          />
        ) : (
          <Spinner />
        )}
      </div>
      <div className="main-content">
        {Object.keys(manga).length > 0 && <MangaInformation manga={manga} />}

        <div className="main-content-right-side">
          {Object.keys(characters).length > 0 && (
            <MangaCharacters characters={characters} />
          )}
        </div>
      </div>
      {Object.keys(recommendations).length > 0 && (
        <MangaRecommendations recommendations={recommendations} />
      )}
    </div>
  );
};

export default MangaPage;
