import "./Characters.css";
import CharacterActorCard from "./CharacterActorCard/CharacterActorCard";
import { useEffect, useState } from "react";

const Characters = ({ characters, vaLang, setVaLang }) => {
  const renderCards = () => {
    return characters.edges.map((char) => {
      let voiceActor;
      if (vaLang) {
        voiceActor = char.voiceActors.find((va) => {
          return va.languageV2 === vaLang;
        });
      }
      return (
        <CharacterActorCard
          key={char.node.id}
          role={char.role}
          char={char.node}
          voiceActor={voiceActor}
        />
      );
    });
  };
  return (
    <>
      {vaLang ? <h2>Characters & Voice Actors</h2> : <h2>Characters</h2>}
      {vaLang && (
        <VALanguageDropDown
          characters={characters.edges}
          vaLang={vaLang}
          setVaLang={setVaLang}
        />
      )}
      <div className="characters-container">{renderCards()}</div>
    </>
  );
};
export default Characters;

const VALanguageDropDown = ({ characters, vaLang, setVaLang }) => {
  const [display, setDisplay] = useState("none");
  const [langs, setLangs] = useState([]);

  useEffect(() => {
    const char = characters.find((char) => char.role === "MAIN");
    const langs = {};
    char.voiceActors.forEach((va) => (langs[va.languageV2] = va.languageV2));
    const sorted = Object.keys(langs).sort();
    setLangs(sorted);
  }, [characters]);

  const renderOptions = () => {
    return langs.map((lang) => {
      return (
        <div
          className="lang-dropdown-option"
          key={lang}
          onClick={() => {
            setVaLang(lang);
          }}
        >
          {lang}
        </div>
      );
    });
  };

  return (
    <div
      className="va-lang-dropdown"
      onClick={() => setDisplay((prev) => (prev === "none" ? "flex" : "none"))}
    >
      <span>{vaLang}</span>
      <div className="lang-dropdown-options" style={{ display }}>
        {renderOptions()}
      </div>
    </div>
  );
};
