import { NavLink } from "react-router-dom";
import "./ProfileFriends.css";
import { UserInfo } from "../../../apis/animexpo/animexpo_updates.types";

const ProfileFriends = ({ friendsList }: { friendsList: UserInfo[] }) => {
  const renderFriends = (friendsList: UserInfo[]) => {
    const list = [...friendsList];
    if (list.length > 8) list.splice(8);
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
      <h3>Friends</h3>
      <div>{renderFriends(friendsList)}</div>
    </div>
  );
};
export default ProfileFriends;
