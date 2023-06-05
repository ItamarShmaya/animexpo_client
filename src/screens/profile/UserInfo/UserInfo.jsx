import "./UserInfo.css";
import Avatar from "../Avatar/Avatar";
import UserFunction from "../UserFunction/UserFunction";
import ProfileFriends from "../ProfileFriends/ProfileFriends";
import PersonnalInfo from "../personnalInfo/PersonnalInfo";

const UserInfo = ({ viewedProfile, username, setViewedProfile }) => {
  const { gender, birthday, joined, avatar, reviewsCount } =
    viewedProfile.personalInfo;

  return (
    <>
      <Avatar image={avatar.secure_url} />
      <UserFunction
        viewedProfile={viewedProfile}
        setViewedProfile={setViewedProfile}
      />
      <hr />
      <PersonnalInfo
        username={username}
        gender={gender}
        birthday={birthday}
        joined={joined}
        reviewsCount={reviewsCount}
      />
      <hr />
      <ProfileFriends friendsList={viewedProfile.friendsList.list} />
    </>
  );
};
export default UserInfo;
