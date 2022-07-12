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
import { useNavigate, useParams } from "react-router-dom";
import ReviewsSection from "../../../components/ReviewsSection/ReviewsSection";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";

const AnimePage = () => {
  const [anime, setAnime] = useState({});
  const [pictures, setPictures] = useState(null);
  const [characters, setCharacters] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const [watching, setWatching] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { getLocalStorage } = useLocalStorage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const animeList = getLocalStorage("loggedInUserAnimeList");
    if (animeList.list.find((myAnime) => myAnime.mal_id === +id)) {
      setWatching(true);
    } else {
      setWatching(false);
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    let timeOutId;
    const fetchAnimeData = async () => {
      timeOutId = setTimeout(async () => {
        try {
          const animeResponse = await getAnimeById(id);
          animeResponse && setAnime(animeResponse.data);
        } catch (e) {
          navigate("/error");
        }
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
        try {
          const picturesResponse = await getAnimePicturesById(id);
          picturesResponse && setPictures(picturesResponse.data);
        } catch (e) {
          navigate("/error");
        }
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
        try {
          const charactersResponse = await getAnimeCharactersById(id);
          charactersResponse && setCharacters(charactersResponse.data);
        } catch (e) {
          navigate("/error");
        }
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
        try {
          const recommendationResponse = await getAnimeRecommendationsById(id);
          recommendationResponse &&
            setRecommendations(recommendationResponse.data);
        } catch (e) {
          navigate("/error");
        }
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
      {Object.keys(anime).length > 0 && (
        <ReviewsSection
          mal_id={anime.mal_id}
          title={anime.title}
          image={anime.images.jpg.image_url}
          episodes={anime.episodes}
          type="anime"
        />
      )}
    </div>
  );
};
export default AnimePage;
