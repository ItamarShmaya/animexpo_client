import "./SideMenu.css";
import { NavLink } from "react-router-dom";
import { useLoggedInUser } from "../../../context/context_custom_hooks";
import { useEffect, useRef, useState, JSX } from "react";

const SideMenu = ({ username }: { username: string }): JSX.Element => {
  const { loggedInUser } = useLoggedInUser();
  const sideMenuRef = useRef<HTMLElement>(null);
  const [calcMid, setCalcMid] = useState<number>(0);

  useEffect(() => {
    if (sideMenuRef) {
      if (window.visualViewport && sideMenuRef.current) {
        const toppx =
          window.visualViewport.height / 2 -
          sideMenuRef.current.clientHeight / 2;
        setCalcMid(toppx);
      }
    }
  }, []);

  return (
    <aside
      ref={sideMenuRef}
      className="profile-side-menu"
      style={{ top: `${calcMid}px` }}
    >
      <NavLink
        data-type={"Home"}
        className="side-menu-item side-menu-list"
        to={"/"}
      >
        <i className="fa-solid fa-home"></i>
      </NavLink>
      <NavLink
        data-type={"Profile Page"}
        className="side-menu-item side-menu-list"
        to={`/profile/${username}`}
      >
        <i className="fa-solid fa-user"></i>
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
