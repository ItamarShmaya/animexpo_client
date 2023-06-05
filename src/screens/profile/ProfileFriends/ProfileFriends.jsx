import { NavLink } from "react-router-dom";
import "./ProfileFriends.css";

const ProfileFriends = ({ friendsList }) => {
  const renderFriends = (friendsList) => {
    const list = [...friendsList];
    if (list > 8) list.splice(8);
    return list.map((friend) => {
      return (
        <NavLink key={friend.username} to={`/profile/${friend.username}`}>
          <div className="friend-avatar-container" data-type={friend.username}>
            <img src={friend.avatar.secure_url} alt={friend.username} />
          </div>
        </NavLink>
      );
    });
  };
  return (
    <div className="friends">
      <h2>Friends</h2>
      <div>{renderFriends(friendsList)}</div>
    </div>
  );
};
export default ProfileFriends;
