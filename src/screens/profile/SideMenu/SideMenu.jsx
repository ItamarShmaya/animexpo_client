import "./SideMenu.css";
import { NavLink } from "react-router-dom";
import { useLoggedInUser } from "../../../context/context_custom_hooks";

const SideMenu = ({ username }) => {
  const { loggedInUser } = useLoggedInUser();
  return (
    <aside className="profile-side-menu">
      <NavLink
        data-type={"Profile Page"}
        className="side-menu-item side-menu-list"
        to={`/profile/${username}`}
      >
        <i className="fa-solid fa-house-user"></i>
      </NavLink>
      <NavLink
        data-type={"Anime List"}
        className="side-menu-item side-menu-list"
        to={`/${username}/animelist`}
      >
        <i className="fa-solid fa-list"></i>
      </NavLink>
      <NavLink
        data-type={"Manga List"}
        className="side-menu-item side-menu-list"
        to={`/${username}/mangalist`}
      >
        <i className="fa-solid fa-list-ul"></i>
      </NavLink>
      {loggedInUser?.username === username && (
        <NavLink
          data-type={"Edit Profile"}
          className="side-menu-item side-menu-edit"
          to={`/${username}/editprofile`}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </NavLink>
      )}
    </aside>
  );
};
export default SideMenu;
