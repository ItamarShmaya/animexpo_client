import "./UserInfo.css";
import Avatar from "../Avatar/Avatar";

const UserInfo = ({ profile, reviewsCount }) => {
  const { gender, birthday, joined, avatar } = profile.personalInfo;

  return (
    <>
      <Avatar image={avatar.secure_url} />
      <div className="presonnal-info">
        {gender && <div>Gender: {gender}</div>}
        <div>Birthday: {new Date(birthday).toDateString().slice(3)}</div>
        <div>Joined: {new Date(joined).toDateString().slice(3)}</div>
        <div>Reviews: {reviewsCount}</div>
      </div>
    </>
  );
};
export default UserInfo;
