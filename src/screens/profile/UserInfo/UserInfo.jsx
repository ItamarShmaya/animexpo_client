import "./UserInfo.css";
import Avatar from "../Avatar/Avatar";
import { NavLink } from "react-router-dom";

const UserInfo = ({ profile, username }) => {
  const { gender, birthday, joined, avatar, reviewsCount } =
    profile.personalInfo;

  return (
    <>
      <Avatar image={avatar.secure_url} />
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
    </>
  );
};
export default UserInfo;
