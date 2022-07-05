import { useEffect, useState } from "react";
import "./EditProfilePage.css";
import { useLoggedInUser } from "../../../context/context_custom_hooks";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useNavigate, useParams } from "react-router-dom";

const EditProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [profileData, setProfileData] = useState(
    getLocalStorage("loggedInUserProfileData")
  );
  const [avatarInput, setAvatarInput] = useState(
    profileData.personalInfo.avatar
  );
  const [genderInput, setGenderInput] = useState(
    profileData.personalInfo.gender
  );
  const [birthdayInput, setBirthdayInput] = useState(
    profileData.personalInfo.birthday
  );
  const [aboutMe, setAboutMe] = useState(profileData.personalInfo.aboutMe);

  useEffect(() => {
    if (loggedInUser?.username !== username) navigate("/");
  }, [loggedInUser.username, username, navigate]);

  const onEditFormSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="editprofile-page">
      <main className="edit-profile-content">
        <h2>Edit</h2>
        <form onSubmit={onEditFormSubmit} className="edit-profile-form">
          <div className="edit-input">
            <label htmlFor="avatarImage">Avatar</label>
            <input
              id="avatarImage"
              type="file"
              value={avatarInput}
              onChange={({ target }) => setAvatarInput(target.value)}
            />
          </div>
          <div className="edit-input">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={genderInput}
              onChange={({ target }) => setGenderInput(target.value)}
            >
              <option value="Other">Other</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="edit-input">
            <label htmlFor="birthday">Birthday</label>
            <input
              id="birthday"
              type="date"
              value={birthdayInput}
              onChange={({ target }) => setBirthdayInput(target.value)}
              max={new Date().toISOString().slice(0, 10)}
            />
          </div>
          <div className="edit-input">
            <label htmlFor="aboutme">About Me</label>
            <textarea
              id="aboutme"
              type="date"
              value={aboutMe}
              onChange={({ target }) => setAboutMe(target.value)}
              rows="5"
              cols="35"
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
};
export default EditProfilePage;
