import "./AnimePage.css";
import {
  getAnimeById,
  getAnimePicturesById,
  getAnimeCharactersById,
  getAnimeRecommendationsById,
} from "../../../apis/jikan/jikan_api_requests";
import { useEffect, useState } from "react";
import AnimeHero from "./AnimeHero/AnimeHero";
import Spinner from "../../../components/Spinner/Spinner";
import AnimeInformation from "./AnimeInformation/AnimeInformation";
import CharactersAndActors from "./CharachtersAndActors/CharactersAndActors";
import AnimeRecommendations from "./AnimeRecommendations/AnimeRecommendations";
import Trailer from "./Trailer/Trailer";
import AnimeBanner from "./AnimeHero/AnimeBanner/AnimeBanner";
import { useParams } from "react-router-dom";

const AnimePage = () => {
  const [anime, setAnime] = useState({});
  const [pictures, setPictures] = useState(null);
  const [characters, setCharacters] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const [watching, setWatching] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    let timeOutId;
    const fetchAnimeData = async () => {
      timeOutId = setTimeout(async () => {
        const animeResponse = await getAnimeById(id);
        animeResponse && setAnime(animeResponse.data);
      }, 1000);
    };
    fetchAnimeData();
    return () => {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
    };
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    let timeOutId;
    const fetchAnimePictures = async () => {
      timeOutId = setTimeout(async () => {
        const picturesResponse = await getAnimePicturesById(id);
        picturesResponse && setPictures(picturesResponse.data);
      }, 2000);
    };
    fetchAnimePictures();
    return () => {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
    };
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    let timeOutId;
    const fetchAnimeCharacters = async () => {
      timeOutId = setTimeout(async () => {
        const charactersResponse = await getAnimeCharactersById(id);
        charactersResponse && setCharacters(charactersResponse.data);
      }, 3000);
    };
    fetchAnimeCharacters();
    return () => {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
    };
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    let timeOutId;
    const fetchAnimeRecommendations = async () => {
      timeOutId = setTimeout(async () => {
        const recommendationResponse = await getAnimeRecommendationsById(id);
        recommendationResponse &&
          setRecommendations(recommendationResponse.data);
      }, 4000);
    };
    fetchAnimeRecommendations();
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
        {pictures && Object.keys(anime).length > 0 && (
          <AnimeBanner pictures={pictures} images={anime.images} />
        )}
        {Object.keys(anime).length > 0 ? (
          <AnimeHero
            anime={anime}
            watching={watching}
            setWatching={setWatching}
          />
        ) : (
          <Spinner />
        )}
      </div>
      <div className="main-content">
        {Object.keys(anime).length > 0 && <AnimeInformation anime={anime} />}

        <div className="main-content-right-side">
          {Object.keys(characters).length > 0 && (
            <CharactersAndActors characters={characters} />
          )}
        </div>
      </div>
      {Object.keys(recommendations).length > 0 && (
        <AnimeRecommendations recommendations={recommendations} />
      )}
      {Object.keys(anime).length > 0 && anime.trailer.embed_url && (
        <Trailer trailer={anime.trailer} />
      )}
    </div>
  );
};
export default AnimePage;
