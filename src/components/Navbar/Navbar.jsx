import "./Navbar.css";
import Logo from "../Logo/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import LoginWindow from "../LoginWindow/LoginWindow";
import { useLoggedInUser } from "../../context/context_custom_hooks";
import {
  getUserNotifications,
  logoutUser,
} from "../../apis/animexpo/animexpo_requests.js";
import NotificationWindow from "./NotificationWindow/NotificationWindow";
import { updateNotificationsToRead } from "../../apis/animexpo/animexpo_updates";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(null);
  const formWrapperRef = useRef();
  const {
    loggedInUser,
    setLoggedInUser,
    notifications,
    setNotifications,
    socket,
  } = useLoggedInUser();
  const navigate = useNavigate();

  useEffect(() => {
    socket?.on("recieve_notifs", ({ notifs }) => {
      setNotifications(notifs);
    });
    // eslint-disable-next-line
  }, [socket]);

  useEffect(() => {
    const getUserNotifs = async () => {
      try {
        const notifs = await getUserNotifications(
          loggedInUser.username,
          loggedInUser.token
        );
        if (notifs) setNotifications(notifs);
      } catch (e) {
        console.log(e);
      }
    };
    if (loggedInUser) getUserNotifs();
    // eslint-disable-next-line
  }, [loggedInUser]);

  useEffect(() => {
    if (open) {
      const onBodyClick = ({ target }) => {
        if (formWrapperRef.current.contains(target)) return;
        setOpen(false);
      };

      document.body.addEventListener("click", onBodyClick, { capture: true });

      return () => {
        document.body.removeEventListener("click", onBodyClick, {
          capture: true,
        });
      };
    }
  }, [open]);

  const onLogoutButtonClick = async () => {
    try {
      const response = await logoutUser(loggedInUser);
      if (response.status === 200) {
        setLoggedInUser(null);
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("loggedInUserAnimeList");
        localStorage.removeItem("loggedInUserFavCharsList");
        localStorage.removeItem("loggedInUserFavPeopleList");
        localStorage.removeItem("loggedInUserMangaList");
        localStorage.removeItem("loggedInUserProfileData");
        localStorage.removeItem("loggedInUserFriendsList");
        socket?.emit("logout", { socketId: socket.id });
        navigate(`/`);
      }
    } catch (e) {
      console.log(e);
      navigate(`/`);
      window.location.reload();
    }
  };

  const renderLoginWindow = () => {
    if (open) {
      return <LoginWindow formWrapperRef={formWrapperRef} setOpen={setOpen} />;
    }
  };

  useEffect(() => {
    if (notifOpen === false) {
      setNotifications([]);
      setNotifOpen(null);
      if (notifications.length > 0) {
        updateNotificationsToRead(loggedInUser.username, loggedInUser.token);
      }
    }
    // eslint-disable-next-line
  }, [
    notifOpen,
    loggedInUser?.username,
    loggedInUser?.token,
    notifications?.length,
  ]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <NavLink className="nav-item" to="/">
            <Logo firstColor={"#EEEBDD"} secondColor={"#84A9AC"} />
          </NavLink>
          <NavLink className="nav-item" to="/">
            Home
          </NavLink>
          {loggedInUser && (
            <NavLink
              className="nav-item"
              to={`/profile/${loggedInUser.username}`}
            >
              My Profle
            </NavLink>
          )}
        </div>
        <div className="navbar-right">
          {loggedInUser ? (
            <>
              {/* <NavLink to={`/profile/${loggedInUser.username}/notifications`}> */}
              <div className="notification-bell">
                <i
                  className="fa-solid fa-bell nav-item"
                  onClick={() => setNotifOpen((prev) => !prev)}
                ></i>
                {notifications.length > 0 && (
                  <span className="notification-badge">
                    {notifications.length}
                  </span>
                )}
                {notifOpen && (
                  <NotificationWindow
                    notifications={notifications}
                    setNotifOpen={setNotifOpen}
                  />
                )}
              </div>
              {/* </NavLink> */}
              <div className="nav-item" onClick={onLogoutButtonClick}>
                Logout
              </div>
            </>
          ) : (
            <div className="nav-item" onClick={() => setOpen((prev) => !prev)}>
              Login
            </div>
          )}
        </div>
      </nav>
      {renderLoginWindow()}
    </>
  );
};
export default Navbar;
