import { NavLink } from "react-router-dom";
import "./CharacterActorCard.css";

const CharacterActorCard = ({ char, role, voiceActor }) => {
  const { mal_id, images, name } = char;

  return (
    <div className="character-actor-card">
      <NavLink to={`/characters/${mal_id}`}>
        <div className="character block">
          <img alt={mal_id} src={images.jpg.image_url} />
          <div className="some-info">
            <span className="name">{name}</span>
            <span className="role">{role}</span>
          </div>
        </div>
      </NavLink>
      <NavLink to={`/people/${voiceActor.person.mal_id}`}>
        <div className="actor block">
          {voiceActor && (
            <>
              <div className="some-info">
                <span className="name">{voiceActor.person.name}</span>
                <span className="language">{voiceActor.language}</span>
              </div>
              <img
                alt={voiceActor.person.mal_id}
                src={voiceActor.person.images.jpg.image_url}
              />
            </>
          )}
        </div>
      </NavLink>
    </div>
  );
};
export default CharacterActorCard;
