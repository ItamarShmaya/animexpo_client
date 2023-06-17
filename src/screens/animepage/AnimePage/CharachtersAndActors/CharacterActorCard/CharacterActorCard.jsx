import { NavLink } from "react-router-dom";
import "./CharacterActorCard.css";

const CharacterActorCard = ({ char, role, voiceActor }) => {
  return (
    <div className="character-actor-card">
      {char && <CharacterBlock char={char} role={role} />}
      {voiceActor && <ActorBlock voiceActor={voiceActor} />}
    </div>
  );
};
export default CharacterActorCard;

const CharacterBlock = ({ char, role }) => {
  const { id, image, name } = char;
  return (
    <NavLink to={`/characters/${id}`}>
      <div className="character block">
        <img alt={name} src={image.large} />
        <div className="some-info">
          <span className="name">{name.userPreferred}</span>
          <span className="role">
            {role[0] + role.substring(1).toLowerCase()}
          </span>
        </div>
      </div>
    </NavLink>
  );
};

const ActorBlock = ({ voiceActor }) => {
  const { id, name, languageV2, image } = voiceActor;
  return (
    <NavLink to={`/people/${id}`}>
      <div className="actor block">
        <div className="some-info">
          <span className="name">{name.userPreferred}</span>
          <span className="language">{languageV2}</span>
        </div>
        <img alt={id} src={image.large} />
      </div>
    </NavLink>
  );
};
