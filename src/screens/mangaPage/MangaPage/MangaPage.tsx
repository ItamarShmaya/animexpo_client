import { useEffect, useState, JSX } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import "../../animepage/AnimePage/AnimePage.css";
import { useNavigate, useParams } from "react-router-dom";
import ReviewsSection from "../../../components/ReviewsSection/ReviewsSection";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useLoggedInUser } from "../../../context/context_custom_hooks";
import EntryPageBanner from "../../animepage/AnimePage/EntryPageHero/EntryPageBanner/EntryPageBanner";
import EntryPageHero from "../../animepage/AnimePage/EntryPageHero/EntryPageHero";
import EntrySideInformation from "../../animepage/AnimePage/EntrySideInformation/EntrySideInformation";
import Characters from "../../animepage/AnimePage/CharachtersAndActors/Characters";
import EntryRecommendations from "../../animepage/AnimePage/EntryRecommendations/EntryRecommendations";
import AddToMangaListButton from "./AddToMangaListButton/AddToMangaListButton";
import {
  aniListRequests,
  mangaByIdQuery,
} from "../../../apis/aniList/aniList.queries";
import { entryPageRecommendationsSliderSettings } from "../../../components/ImageSlide/sliderSettings";
import { useSessionStorage } from "../../../hooks/useSessionStorage";
import naori from "../../../components/Spinner/spinnerImages/naori.png";
import {
  addToFavMangaList,
  removeFromFavMangaList,
} from "../../../apis/animexpo/animexpo_updates";
import { MangaPageApiResponse, MangaPageEntryType } from "./MangaPage.types";

const MangaPage = (): JSX.Element => {
  const [manga, setManga] = useState<MangaPageEntryType>();
  const [inList, setInList] = useState<boolean>(false);
  const [inFavList, setInFavList] = useState<boolean>(false);
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
      const mangaList = getLocalStorageUserData().mangaList;
      if (mangaList.list.find((myManga) => myManga.id === +id)) {
        setInList(true);
      } else {
        setInList(false);
      }
      const favoriteManga = getLocalStorageUserData().favoriteManga;
      if (favoriteManga.list.find((myManga) => myManga.id === +id)) {
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
      type: "MANGA",
    };
    const getMangaById = async () => {
      try {
        const { data }: { data: MangaPageApiResponse } = await aniListRequests(
          mangaByIdQuery,
          variables,
          controller.signal
        );

        if (data.Media) {
          setManga(data.Media);
          addEntryToUserCache("mangaList", data.Media);
        } else {
          throw new Error("Not Found");
        }
      } catch (e) {
        console.log(e);
        navigate("/");
      }
    };

    const manga = getEntryFromUserCache("mangaList", +id);
    manga ? setManga(manga as MangaPageEntryType) : getMangaById();

    return () => {
      controller.abort();
    };
  }, [navigate, id, addEntryToUserCache, getEntryFromUserCache]);

  return (
    <div className="entry-page">
      {manga ? (
        <>
          <EntryPageBanner bannerImage={manga.bannerImage} />
          <EntryPageHero
            entry={manga}
            inList={inList}
            setInList={setInList}
            AddToListButton={AddToMangaListButton}
            inFavList={inFavList}
            setInFavList={setInFavList}
            addToFavorite={addToFavMangaList}
            removeFromFavorite={removeFromFavMangaList}
            favoriteListName={"favoriteManga"}
          />
          <div className="info-and-chars">
            <div className="info">
              <EntrySideInformation entry={manga} />
            </div>
            <div className="chars">
              <Characters characters={manga.characters} />
            </div>
          </div>
          {manga.recommendations.edges.length > 0 && (
            <EntryRecommendations
              recommendations={manga.recommendations.edges}
              type={"manga"}
              sliderSettings={entryPageRecommendationsSliderSettings}
            />
          )}
          <ReviewsSection
            id={manga.id}
            title={manga.title.english}
            image={manga.coverImage.large}
            episodes={manga.volumes}
            type="anime"
          />
        </>
      ) : (
        <Spinner image={naori} />
      )}
    </div>
  );
};

export default MangaPage;
