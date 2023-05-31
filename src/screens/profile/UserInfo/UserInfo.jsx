import "./UserInfo.css";
import Avatar from "../Avatar/Avatar";
import UserFunction from "../UserFunction/UserFunction";
import ProfileFriends from "../ProfileFriends/ProfileFriends";
import PersonnalInfo from "../personnalInfo/PersonnalInfo";

const UserInfo = ({ profile, username, setViewedProfile }) => {
  const { gender, birthday, joined, avatar, reviewsCount } =
    profile.personalInfo;

  return (
    <>
      <Avatar image={avatar.secure_url} />
      <UserFunction setViewedProfile={setViewedProfile} />
      <hr />
      <PersonnalInfo
        username={username}
        gender={gender}
        birthday={birthday}
        joined={joined}
        reviewsCount={reviewsCount}
      />
      <hr />
      <ProfileFriends friendsList={profile.friendsList.list} />
    </>
  );
};
export default UserInfo;
