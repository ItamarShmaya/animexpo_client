import "./DropdownMenu.css";
import { NavLink } from "react-router-dom";

const DropdownMenu = ({
  username,
  setDropdownOpen,
  onLogoutButtonClick,
  dropdownMenuRef,
}) => {
  return (
    <div className="drop-down-menu" ref={dropdownMenuRef}>
      <div className="dropdown-item logged-user">{username}</div>
      <NavLink to={"/"} onClick={() => setDropdownOpen(false)}>
        <div className="dropdown-item">
          <div className="dropdown-icon-wrapper">
            <i className="fa-solid fa-house"></i>
          </div>
          <span>Home</span>
        </div>
      </NavLink>
      <NavLink
        to={`/profile/${username}`}
        onClick={() => setDropdownOpen(false)}
      >
        <div className="dropdown-item">
          <div className="dropdown-icon-wrapper">
            <i className="fa-solid fa-user"></i>
          </div>
          <span>Profile</span>
        </div>
      </NavLink>
      <NavLink to={`/search/anime`} onClick={() => setDropdownOpen(false)}>
        <div className="dropdown-item">
          <div className="dropdown-icon-wrapper">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <span>Search</span>
        </div>
      </NavLink>
      <NavLink
        to={`/${username}/animelist`}
        onClick={() => setDropdownOpen(false)}
      >
        <div className="dropdown-item">
          <div className="dropdown-icon-wrapper">
            <i className="fa-solid fa-list"></i>
          </div>
          <span>AnimeList</span>
        </div>
      </NavLink>
      <NavLink
        to={`/${username}/mangalist`}
        onClick={() => setDropdownOpen(false)}
      >
        <div className="dropdown-item">
          <div className="dropdown-icon-wrapper">
            <i className="fa-solid fa-list"></i>
          </div>
          <span>MangaList</span>
        </div>
      </NavLink>

      <div className="dropdown-item" onClick={onLogoutButtonClick}>
        <div className="dropdown-icon-wrapper">
          <i className="fa-solid fa-right-from-bracket"></i>
        </div>
        <span>Logout</span>
      </div>
    </div>
  );
};
export default DropdownMenu;
