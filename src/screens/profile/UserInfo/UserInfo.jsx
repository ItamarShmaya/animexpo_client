import "./UserInfo.css";
import Avatar from "../Avatar/Avatar";

const UserInfo = ({ user }) => {
  const { gender, birthday, joined, avatar } = user.personalInfo;
  return (
    <>
      <Avatar image={avatar.secure_url} />
      <div className="presonnal-info">
        <div>Gender: {gender}</div>
        <div>Birthday: {new Date(birthday).toDateString().slice(3)}</div>
        <div>Joined: {new Date(joined).toDateString().slice(3)}</div>
      </div>
    </>
  );
};
export default UserInfo;
