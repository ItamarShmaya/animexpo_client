import "./DropdownMenu.css";
import { NavLink } from "react-router-dom";

const DropdownMenu = ({ username, setDropdownOpen, onLogoutButtonClick }) => {
  return (
    <div className="drop-down-menu">
      <div className="dropdown-item logged-user">{username}</div>
      <NavLink
        to={`/profile/${username}`}
        className="dropdown-item"
        onClick={() => setDropdownOpen(false)}
      >
        Profile
      </NavLink>
      <NavLink
        to={`/${username}/animelist`}
        className="dropdown-item"
        onClick={() => setDropdownOpen(false)}
      >
        Anime List
      </NavLink>
      <NavLink
        to={`/${username}/mangalist`}
        className="dropdown-item"
        onClick={() => setDropdownOpen(false)}
      >
        Manga List
      </NavLink>
      <div className="dropdown-item" onClick={onLogoutButtonClick}>
        <i className="fa-solid fa-right-from-bracket"></i> Logout
      </div>
    </div>
  );
};
export default DropdownMenu;
