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
import sharingan from "../../../components/Spinner/sharingan.png";

const AnimePage = () => {
  const [anime, setAnime] = useState(null);
  const [inList, setInList] = useState(false);
  const [vaLang, setVaLang] = useState("Japanese");
  const { id } = useParams();
  const navigate = useNavigate();
  const { getLocalStorage } = useLocalStorage();
  const { getEntryFromSessionStorage, addToEntrySessionStorage } =
    useSessionStorage();
  const { loggedInUser } = useLoggedInUser();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (loggedInUser) {
      const animeList = getLocalStorage("loggedInUserAnimeList");
      if (animeList.list.find((myAnime) => myAnime.id === +id)) {
        setInList(true);
      } else {
        setInList(false);
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
          addToEntrySessionStorage("animeList", data.Media);
        } else {
          throw new Error("Not Found");
        }
      } catch (e) {
        console.log(e);
        navigate("/");
      }
    };
    const anime = getEntryFromSessionStorage("animeList", id);
    anime ? setAnime(anime) : getAnimeById();
    return () => {
      controller.abort();
    };
  }, [
    navigate,
    id,
    addToEntrySessionStorage,
    getEntryFromSessionStorage,
    location,
  ]);

  return (
    <div className="entry-page">
      {anime ? (
        <>
          <EntryPageBanner bannerImage={anime.bannerImage} />
          <EntryPageHero
            entry={anime}
            inList={inList}
            setInList={setInList}
            AddButton={AddToAnimeListButton}
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
        <Spinner image={sharingan} />
      )}
    </div>
  );
};
export default AnimePage;
