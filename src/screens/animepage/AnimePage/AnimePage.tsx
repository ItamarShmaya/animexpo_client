import "./AnimePage.css";
import { useEffect, useState, JSX } from "react";
import EntryPageHero from "./EntryPageHero/EntryPageHero";
import Spinner from "../../../components/Spinner/Spinner";
import EntrySideInformation from "./EntrySideInformation/EntrySideInformation";
import EntryRecommendations from "./EntryRecommendations/EntryRecommendations";
import Trailer from "./Trailer/Trailer";
import EntryPageBanner from "./EntryPageHero/EntryPageBanner/EntryPageBanner";
import ReviewsSection from "../../../components/ReviewsSection/ReviewsSection";
import AddToAnimeListButton from "./AddToAnimeListButton/AddToAnimeListButton";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useLoggedInUser } from "../../../context/context_custom_hooks";
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
import { AnimePageApiResponse, AnimePageEntryType } from "./AnimePage.types";

const AnimePage = (): JSX.Element => {
  const [anime, setAnime] = useState<AnimePageEntryType>();
  const [inList, setInList] = useState<boolean>(false);
  const [inFavList, setInFavList] = useState<boolean>(false);
  const [vaLang, setVaLang] = useState<string>("Japanese");
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const { getLocalStorageUserData } = useLocalStorage();
  const { getEntryFromUserCache, addEntryToUserCache } = useSessionStorage();
  const { loggedInUser } = useLoggedInUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (loggedInUser) {
      const animeList = getLocalStorageUserData().animeList;
      const favoriteAnimeList = getLocalStorageUserData().favoriteAnime;
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
  }, [id, loggedInUser, getLocalStorageUserData]);

  useEffect(() => {
    const controller = new AbortController();

    const variables = {
      id,
      type: "ANIME",
    };
    const getAnimeById = async (): Promise<void> => {
      try {
        const { data }: { data: AnimePageApiResponse } = await aniListRequests(
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
    const anime = getEntryFromUserCache("animeList", +id);
    anime ? setAnime(anime as AnimePageEntryType) : getAnimeById();

    return () => {
      controller.abort();
    };
  }, [navigate, id, addEntryToUserCache, getEntryFromUserCache]);

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
            AddToListButton={AddToAnimeListButton}
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
            title={anime.title?.userPreferred || anime.title?.english}
            image={anime.coverImage?.large || anime.coverImage?.medium}
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
