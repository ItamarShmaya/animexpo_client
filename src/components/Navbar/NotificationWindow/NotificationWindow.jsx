import { NavLink } from "react-router-dom";
import { useLoggedInUser } from "../../../context/context_custom_hooks.js";
import "./NotificationWindow.css";

const NotificationWindow = ({ notifications, setNotifOpen }) => {
  const { loggedInUser } = useLoggedInUser();
  const renderNotifications = (notificationList) => {
    return notificationList.map((notif) => {
      return (
        <div className="notification-msg" key={notif._id}>
          <div className="notif-heading">
            <p>Friend List</p>
            <p>{new Date(notif.createdAt).toUTCString()}</p>
          </div>

          <div className="notification-msg_left">
            <div className="notif-avatar">
              <img
                src={notif.requester.avatar.secure_url}
                alt={notif.requester.username}
              />
            </div>
            <p onClick={() => setNotifOpen(false)}>
              <NavLink to={`/profile/${notif.requester.username}`}>
                {notif.requester.username}
                {"\u00A0"}
              </NavLink>
              {notif.type === 1 && "sent you a friend request"}
              {notif.type === 2 && "accepted your friend request"}
              {notif.type === 3 && "rejected your friend request"}
              {notif.type === 4 && "removed you from their friend list"}
            </p>
          </div>
          <div className="notification-msg_right"></div>
          <hr />
        </div>
      );
    });
  };
  return (
    <div className="notification-window">
      {notifications.length > 0 ? (
        renderNotifications(notifications)
      ) : (
        <div className="notification-msg">No new notifications</div>
      )}
      <div className="notification-msg">
        <NavLink
          to={`/profile/${loggedInUser.username}/notifications`}
          onClick={() => setNotifOpen(false)}
        >
          All notifications
        </NavLink>
      </div>
    </div>
  );
};
export default NotificationWindow;
