import "./VoiceActorCard.css";
import { NavLink } from "react-router-dom";

const VoiceActorCard = ({ lang, name, image, id }) => {
  return (
    <NavLink to={`/staff/${id}`}>
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
