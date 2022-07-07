import "./CharacterPage.css";
import {
  getCharacterById,
  getCharacterPicturesById,
} from "../../../apis/jikan/jikan_api_requests.js";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import CharacterBanner from "./CharacterBanner/CharacterBanner";
import AddToFavoriteButton from "./AddToFavoriteCharButton/AddToFavoriteCharButton";
import Spinner from "../../../components/Spinner/Spinner";
import VoiceActorCard from "./VoiceActorCard/VoiceActorCard";
import AppearanceCard from "./AppearanceCard/AppearanceCard";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import { useLoggedInUser } from "../../../context/context_custom_hooks.js";
import RemoveFromFavoriteButton from "./RemoveFromFavoriteButton/RemoveFromFavoriteButton";

const CharacterPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  const [charPictures, setCharPictures] = useState({});
  const [inFavorites, setInFavorites] = useState(null);
  const { getLocalStorage } = useLocalStorage();
  const { loggedInUser } = useLoggedInUser();
  const navigate = useNavigate();

  useEffect(() => {
    const getCharacter = async () => {
      try {
        const character = await getCharacterById(id);
        if (character) {
          setCharacter(character);
        }
      } catch (e) {
        navigate("/error");
      }
    };
    getCharacter();
  }, [id, navigate]);

  useEffect(() => {
    const getCharacterPictures = async () => {
      try {
        const charPictures = await getCharacterPicturesById(id);
        if (charPictures) {
          setCharPictures(charPictures);
        }
      } catch (e) {
        navigate("/error");
      }
    };
    getCharacterPictures();
  }, [id, navigate]);

  const renderVoiceActor = (voiceActors) => {
    return voiceActors.map((va) => {
      return (
        <VoiceActorCard
          key={va.person.mal_id}
          lang={va.language}
          image={va.person.images.jpg.image_url}
          name={va.person.name}
          mal_id={va.person.mal_id}
        />
      );
    });
  };

  const renderAnimeAppearances = (animeList) => {
    return animeList.map((anime) => {
      return (
        <AppearanceCard
          key={anime.anime.mal_id}
          role={anime.role}
          image={anime.anime.images.jpg.image_url}
          title={anime.anime.title}
          mal_id={anime.anime.mal_id}
          type="anime"
        />
      );
    });
  };

  const renderMangaAppearances = (mangaList) => {
    return mangaList.map((manga) => {
      return (
        <AppearanceCard
          key={manga.manga.mal_id}
          role={manga.role}
          image={manga.manga.images.jpg.image_url}
          title={manga.manga.title}
          mal_id={manga.manga.mal_id}
          type="manga"
        />
      );
    });
  };

  const renderAddToButton = () => {
    if (loggedInUser) {
      const characterList = getLocalStorage("loggedInUserFavCharsList");
      if (
        characterList.list.find(
          (myChar) => myChar.mal_id === character.mal_id
        ) ||
        inFavorites
      ) {
        return (
          <RemoveFromFavoriteButton
            mal_id={character.mal_id}
            setInFavorites={setInFavorites}
          />
        );
      }
    }
    return (
      <AddToFavoriteButton
        character={character}
        setInFavorites={setInFavorites}
      />
    );
  };

  return (
    <div className="character-page">
      <div className="character-banner">
        {Object.keys(charPictures).length > 0 &&
          Object.keys(character).length > 0 && (
            <CharacterBanner
              charPictures={charPictures}
              images={character.images}
            />
          )}
      </div>
      {Object.keys(character).length > 0 ? (
        <div className="character-content">
          {/* Mobile */}
          <div className="mobile">
            <div className="char-poster">
              <img src={character.images.jpg.image_url} alt={character.name} />
              <div className="add-to-list-container">{renderAddToButton()}</div>
            </div>
            <div className="character-about display-linebreak">
              <h1>{character.name}</h1>
              <hr />
              <p>{character.about || "No biography written"}</p>
            </div>
            <div className="voice-actors">
              <h1 className="voice-actors-header">Voice Actors</h1>
              <hr />
              {character.voices.length ? (
                renderVoiceActor(character.voices)
              ) : (
                <p>No voice actors added</p>
              )}
            </div>
            <div className="appearance">
              <h1>Anime</h1>
              <hr />
              <div className="anime-appearance">
                {renderAnimeAppearances(character.anime)}
              </div>
              <h1>Manga</h1>
              <hr />
              <div className="manga-appearance">
                {renderMangaAppearances(character.manga)}
              </div>
            </div>
          </div>
          {/* Mobile */}
          <div className="character-content__left-side">
            <div className="char-poster">
              <img src={character.images.jpg.image_url} alt={character.name} />
              <div className="add-to-list-container">{renderAddToButton()}</div>
            </div>
            <div className="appearance">
              <h1>Anime</h1>
              <hr />
              <div className="anime-appearance">
                {renderAnimeAppearances(character.anime)}
              </div>
              <h1>Manga</h1>
              <hr />
              <div className="manga-appearance">
                {renderMangaAppearances(character.manga)}
              </div>
            </div>
          </div>
          <div className="character-content__right-side">
            <>
              <div className="character-about display-linebreak">
                <h1>{character.name}</h1>
                <hr />
                <p>{character.about || "No biography written"}</p>
              </div>
              <div className="voice-actors">
                <h1 className="voice-actors-header">Voice Actors</h1>
                <hr />
                {character.voices.length ? (
                  renderVoiceActor(character.voices)
                ) : (
                  <p>No voice actors added</p>
                )}
              </div>
            </>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
export default CharacterPage;
