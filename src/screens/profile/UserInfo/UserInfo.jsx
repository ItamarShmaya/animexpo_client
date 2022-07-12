import "./UserInfo.css";
import Avatar from "../Avatar/Avatar";
import { NavLink } from "react-router-dom";
import UserFunction from "../UserFunction/UserFunction";
import ProfileFriends from "../ProfileFriends/ProfileFriends";

const UserInfo = ({ profile, username, setViewedProfile }) => {
  const { gender, birthday, joined, avatar, reviewsCount } =
    profile.personalInfo;

  return (
    <>
      <Avatar image={avatar.secure_url} />
      <UserFunction setViewedProfile={setViewedProfile} />
      <div className="presonnal-info">
        {gender && <div>Gender: {gender}</div>}
        <div>Birthday: {new Date(birthday).toDateString().slice(3)}</div>
        <div>Joined: {new Date(joined).toDateString().slice(3)}</div>
        <hr />
        <NavLink to={`/profile/${username}/reviews`}>
          <div>
            <span className="left">Reviews:</span>
            <span className="right">{reviewsCount}</span>
          </div>
        </NavLink>
      </div>
      <ProfileFriends friendsList={profile.friendsList.list} />
    </>
  );
};
export default UserInfo;
