import "./AnimePage.css";
import { useEffect, useState } from "react";
import EntryPageHero from "./EntryPageHero/EntryPageHero";
import Spinner from "../../../components/Spinner/Spinner";
import EntrySideInformation from "./EntrySideInformation/EntrySideInformation";
import EntryRecommendations from "./EntryRecommendations/EntryRecommendations";
import Trailer from "./Trailer/Trailer";
import EntryPageBanner from "./EntryPageHero/EntryPageBanner/EntryPageBanner";
import ReviewsSection from "../../../components/ReviewsSection/ReviewsSection";
import AddToAnimeListButton from "./AddToAnimeListButton/AddToAnimeListButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import { useLoggedInUser } from "../../../context/context_custom_hooks.js";
import {
  aniListRequests,
  animeByIdQuery,
} from "../../../apis/aniList/aniList.queries";
import Characters from "./CharachtersAndActors/Characters";
import { entryPageRecommendationsSliderSettings } from "../../../components/ImageSlide/sliderSettings";
import { useSessionStorage } from "../../../hooks/useSessionStorage";
import fugaku from "../../../components/Spinner/spinnerImages/fugaku.png";
import {
  addToFavAnimeList,
  removeFromFavAnimeList,
} from "../../../apis/animexpo/animexpo_updates";

const AnimePage = () => {
  const [anime, setAnime] = useState(null);
  const [inList, setInList] = useState(false);
  const [inFavList, setInFavList] = useState(false);
  const [vaLang, setVaLang] = useState("Japanese");
  const { id } = useParams();
  const navigate = useNavigate();
  const { getLocalStorage } = useLocalStorage();
  const { getEntryFromUserCache, addEntryToUserCache } = useSessionStorage();
  const { loggedInUser } = useLoggedInUser();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (loggedInUser) {
      const animeList = getLocalStorage("loggedUser").animeList;
      const favoriteAnimeList = getLocalStorage("loggedUser").favoriteAnime;
      if (animeList.list.find((myAnime) => myAnime.id === +id)) {
        setInList(true);
      } else {
        setInList(false);
      }
      if (favoriteAnimeList.list.find((myAnime) => myAnime.id === +id)) {
        setInFavList(true);
      } else {
        setInFavList(false);
      }
    }
  }, [id, loggedInUser, getLocalStorage]);

  useEffect(() => {
    const controller = new AbortController();

    const variables = {
      id,
      type: "ANIME",
    };
    const getAnimeById = async () => {
      try {
        const { data } = await aniListRequests(
          animeByIdQuery,
          variables,
          controller.signal
        );

        if (data.Media) {
          setAnime(data.Media);
          addEntryToUserCache("animeList", data.Media);
        } else {
          throw new Error("Not Found");
        }
      } catch (e) {
        console.log(e);
        navigate("/");
      }
    };
    const anime = getEntryFromUserCache("animeList", id);
    anime ? setAnime(anime) : getAnimeById();
    return () => {
      controller.abort();
    };
  }, [navigate, id, addEntryToUserCache, getEntryFromUserCache, location]);

  return (
    <div className="entry-page">
      {anime ? (
        <>
          <EntryPageBanner bannerImage={anime.bannerImage} />
          <EntryPageHero
            entry={anime}
            inList={inList}
            setInList={setInList}
            inFavList={inFavList}
            setInFavList={setInFavList}
            AddButton={AddToAnimeListButton}
            addToFavorite={addToFavAnimeList}
            removeFromFavorite={removeFromFavAnimeList}
            favoriteListName={"favoriteAnime"}
          />
          <div className="info-and-chars">
            <div className="info">
              <EntrySideInformation entry={anime} />
            </div>
            <div className="chars">
              <Characters
                characters={anime.characters}
                vaLang={vaLang}
                setVaLang={setVaLang}
              />
            </div>
          </div>
          {anime.recommendations.edges.length > 0 && (
            <EntryRecommendations
              recommendations={anime.recommendations.edges}
              type={"anime"}
              sliderSettings={entryPageRecommendationsSliderSettings}
            />
          )}
          {anime.trailer && <Trailer trailer={anime.trailer} />}
          <ReviewsSection
            id={anime.id}
            title={anime.title.english}
            image={anime.coverImage.large}
            episodes={anime.episodes}
            type={"anime"}
          />
        </>
      ) : (
        <Spinner image={fugaku} />
      )}
    </div>
  );
};
export default AnimePage;
