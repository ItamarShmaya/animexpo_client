import "./MangaCharacters.css";
import MangaCharacterCard from "./MangaCharacterCard/MangaCharacterCard";
import { NavLink } from "react-router-dom";

const MangaCharacters = ({ characters }) => {
  const renderMangaCharacters = (characterList) => {
    return characterList.map((character) => {
      return (
        <NavLink
          key={character.character.mal_id}
          to={`character/${character.character.mal_id}`}
        >
          <MangaCharacterCard character={character} />
        </NavLink>
      );
    });
  };
  return (
    <>
      <h1 className="characters-header">Characters</h1>
      <div className="characters-container">
        {renderMangaCharacters(characters.slice(0, 10))}
      </div>
    </>
  );
};
export default MangaCharacters;
