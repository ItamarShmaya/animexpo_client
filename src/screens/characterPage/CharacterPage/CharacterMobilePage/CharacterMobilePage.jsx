import AddToFavoriteCharButton from "../AddToFavoriteCharButton/AddToFavoriteCharButton";
import RemoveFromFavoriteButton from "../RemoveFromFavoriteButton/RemoveFromFavoriteButton";
import "./CharacterMobilePage.css";
import "../CharacterPage.css";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import AppearanceCard from "../AppearanceCard/AppearanceCard";
import VoiceActorCard from "../VoiceActorCard/VoiceActorCard";

const CharacterMobilePage = ({
  id,
  name,
  description,
  image,
  inFavorites,
  setInFavorites,
  animeList,
  mangaList,
  voiceActors,
}) => {
  const [cleanDescription, setCleanDescription] = useState();

  // useEffect(() => {
  //   if (cleanDescription) {
  //     const spoiler = document.querySelectorAll(".spoiler");
  //     spoiler.forEach((el) => el.addEventListener("click", onSpoilerClick));
  //   }
  // }, [cleanDescription]);

  // const onSpoilerClick = (e) => {
  //   console.log(e.currentTarget.onBefore);
  //   e.currentTarget.children[0].style.display = "inline";
  // };

  useEffect(() => {
    const cleanDes = DOMPurify.sanitize(description, {
      USE_PROFILES: { html: true },
    });
    setCleanDescription(cleanDes);
    // const s = cleanDes
    //   .replace(/(?<=:)__/g, "</strong>")
    //   .replace(/__/g, "<strong>")
    //   .replace(/(?<=:)_/g, "</em>")
    //   .replace(/_/g, "<em>")
    //   .replace(/(~!)/g, `<p class=spoiler><span class=spoiler-content>`)
    //   .replace(/(!~)/g, "</span></p>");
    // // console.log(s);
    // setCleanDescription(s);
  }, [description]);

  const renderAnimeAppearances = (animeList) => {
    return animeList.map((anime) => {
      return (
        <AppearanceCard
          key={anime.node.id}
          role={anime.characterRole}
          image={anime.node.coverImage.large}
          title={anime.node.title.english || anime.node.title.userPreferred}
          id={anime.node.id}
          type="anime"
        />
      );
    });
  };

  const renderMangaAppearances = (mangaList) => {
    return mangaList.map((manga) => {
      return (
        <AppearanceCard
          key={manga.node.id}
          role={manga.characterRole}
          image={manga.node.coverImage.large}
          title={manga.node.title.english || manga.node.title.userPreferred}
          id={manga.node.id}
          type="manga"
        />
      );
    });
  };

  const renderVoiceActor = (voiceActors) => {
    return voiceActors.map((va) => {
      return (
        <VoiceActorCard
          key={va.id}
          lang={va.languageV2}
          image={va.image.large}
          name={va.name.userPreferred}
          id={va.id}
        />
      );
    });
  };

  return (
    <div className="mobile">
      <div className="char-poster">
        <img src={image} alt={name} />
        <div className="add-to-list-container">
          {inFavorites ? (
            <RemoveFromFavoriteButton id={id} setInFavorites={setInFavorites} />
          ) : (
            <AddToFavoriteCharButton
              id={id}
              name={name}
              image={image}
              setInFavorites={setInFavorites}
            />
          )}
        </div>
      </div>
      <div className="character-about display-linebreak">
        <h1>{name}</h1>
        <hr />
        <p dangerouslySetInnerHTML={{ __html: cleanDescription }}></p>
      </div>
      <div className="voice-actors">
        <h1 className="voice-actors-header">Voice Actors</h1>
        <hr />
        {voiceActors.length ? (
          renderVoiceActor(voiceActors)
        ) : (
          <p>No voice actors added</p>
        )}
      </div>
      <div className="appearance">
        <h1>Anime</h1>
        <hr />
        <div className="anime-appearance">
          {renderAnimeAppearances(animeList)}
        </div>
        <h1>Manga</h1>
        <hr />
        <div className="manga-appearance">
          {renderMangaAppearances(mangaList)}
        </div>
      </div>
    </div>
  );
};

export default CharacterMobilePage;
