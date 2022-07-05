import "./CharactersAndActors.css";
import CharacterActorCard from "./CharacterActorCard/CharacterActorCard";
import { NavLink } from "react-router-dom";

const CharactersAndActors = ({ characters }) => {
  const sortCharactersList = (characterList) => {
    if (characterList.length <= 10) return characterList;

    const sortedCharacterList = [];
    for (let i = 0; sortedCharacterList.length < 10; i++) {
      const character = characterList[i];
      if (character.role.toLowerCase() === "main") {
        sortedCharacterList.push(character);
      } else {
        if (
          characterList.length - (i + 1) ===
          10 - sortedCharacterList.length
        ) {
          sortedCharacterList.push(character);
        } else {
          for (let j = 0; j < character.voice_actors.length; j++) {
            if (
              character.voice_actors[j].language.toLowerCase() === "japanese"
            ) {
              sortedCharacterList.push(character);
              break;
            }
          }
        }
      }
    }
    return sortedCharacterList;
  };

  const renderCards = (characterList) => {
    return characterList.map((character) => {
      let voiceActor = null;
      character.voice_actors.forEach((va, i) => {
        if (i === character.voice_actors.length - 1 && !voiceActor) {
          voiceActor = character.voice_actors[0];
        }
        if (va.language.toLowerCase() === "japanese") voiceActor = va;
      });
      return (
        <NavLink
          to={`/charcter/${character.character.mal_id}`}
          key={character.character.mal_id}
        >
          <CharacterActorCard
            char={character.character}
            role={character.role}
            voiceActor={voiceActor}
          />
        </NavLink>
      );
    });
  };

  return (
    <>
      <h1 className="characters-header">Characters & Voice Actors</h1>
      <div className="characters-container">
        {renderCards(sortCharactersList(characters))}
      </div>
    </>
  );
};
export default CharactersAndActors;
