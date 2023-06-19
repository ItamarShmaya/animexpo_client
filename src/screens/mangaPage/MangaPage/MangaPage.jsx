import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import "../../animepage/AnimePage/AnimePage.css";
import { useNavigate, useParams } from "react-router-dom";
import ReviewsSection from "../../../components/ReviewsSection/ReviewsSection";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import { useLoggedInUser } from "../../../context/context_custom_hooks.js";
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

const MangaPage = () => {
  const [manga, setManga] = useState(null);
  const [inList, setInList] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { getLocalStorage } = useLocalStorage();
  const { getEntryFromUserCache, addEntryToUserCache } =
    useSessionStorage();
  const { loggedInUser } = useLoggedInUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (loggedInUser) {
      const mangaList = getLocalStorage("loggedInUserMangaList");
      if (mangaList.list.find((myManga) => myManga.id === +id)) {
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
      type: "MANGA",
    };
    const getMangaById = async () => {
      try {
        const { data } = await aniListRequests(
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

    const manga = getEntryFromUserCache("mangaList", id);
    manga ? setManga(manga) : getMangaById();

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
            AddButton={AddToMangaListButton}
          />
          <div className="info-and-chars">
            <div className="info">
              <EntrySideInformation entry={manga} />
            </div>
            <div className="chars">
              <Characters characters={manga.characters} />
            </div>
          </div>
          {manga.recommendations.edges.length > 0 && <EntryRecommendations
            recommendations={manga.recommendations.edges}
            type={"manga"}
            sliderSettings={entryPageRecommendationsSliderSettings}
          />}
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
