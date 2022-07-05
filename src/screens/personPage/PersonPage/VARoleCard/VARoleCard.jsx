import { NavLink } from "react-router-dom";
import "./VARoleCard.css";

const VARoleCard = ({ role, anime, character }) => {
  return (
    <div className="va-role-card">
      <NavLink to={`/anime/${anime.mal_id}`}>
        <div className="anime-role">
          <img src={anime.images.jpg.image_url} alt="" />
          <p>{anime.title}</p>
        </div>
      </NavLink>
      <NavLink to={`/characters/${character.mal_id}`}>
        <div className="character-role">
          <div className="basic-info">
            <p className="name">{character.name}</p>
            <p className="role">{role}</p>
          </div>
          <img src={character.images.jpg.image_url} alt="" />
        </div>
      </NavLink>
    </div>
  );
};
export default VARoleCard;
