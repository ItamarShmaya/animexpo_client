import { NavLink } from "react-router-dom";
import "./AppearanceCard.css";

const AppearanceCard = ({ type, mal_id, role, title, image }) => {
  return (
    <NavLink to={`/${type}/${mal_id}`}>
      <div className="appearance-card">
        <div className="image-container">
          <img src={image} alt={title} />
        </div>
        <div className="some-info">
          <div className="title">{title}</div>
          <div className="role">{role}</div>
        </div>
      </div>
    </NavLink>
  );
};
export default AppearanceCard;
