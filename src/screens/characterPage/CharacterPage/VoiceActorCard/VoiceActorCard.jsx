import "./VoiceActorCard.css";
import { NavLink } from "react-router-dom";

const VoiceActorCard = ({ lang, name, image, mal_id }) => {
  return (
    <NavLink to={`people/${mal_id}`}>
      <div className="voice-actor-card">
        <div className="image-container">
          <img src={image} alt="VA Pictures" />
        </div>
        <div className="some-info">
          <div className="name">{name}</div>
          <div className="language">{lang}</div>
        </div>
      </div>
    </NavLink>
  );
};
export default VoiceActorCard;
