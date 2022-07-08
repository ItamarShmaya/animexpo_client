import { useEffect, useState } from "react";
import "./EditProfilePage.css";
import { useLoggedInUser } from "../../../context/context_custom_hooks";
// import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useNavigate, useParams } from "react-router-dom";
import AvatarEditForm from "./AvatarEditForm/AvatarEditForm";
// import {
// updateProfileData,
// } from "../../../apis/animexpo/animexpo_updates";
// import { useRef } from "react";

const EditProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();
  // const { getLocalStorage, setLocalStorage } = useLocalStorage();
  // const profileData = getLocalStorage("loggedInUserProfileData");
  // const formRef = useRef();
  // const [genderInput, setGenderInput] = useState(
  // profileData.personalInfo.gender
  // );
  // const [birthdayInput, setBirthdayInput] = useState(
  // profileData.personalInfo.birthday
  // );
  // const [aboutMe, setAboutMe] = useState(profileData.personalInfo.aboutMe);
  // const [profileForm, setProfileForm] = useState({
  //   gender: profileData.personalInfo.gender,
  //   birthday: profileData.personalInfo.birthday,
  //   aboutMe: profileData.personalInfo.aboutMe,
  // });

  useEffect(() => {
    if (loggedInUser?.username !== username) navigate("/");
  }, [loggedInUser?.username, username, navigate]);

  // const onChange = ({ target: { name, value } }) =>
  //   setProfileForm({ ...profileForm, [name]: value });

  // const onEditFormSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(formRef.current);

  //   if (avatarFileRef.current?.files?.[0]) {
  //     formData.append("avatar", avatarFileRef.current.files[0]);
  //   }

  //   try {
  //     const updatedProfileData = await updateProfileData(
  //       loggedInUser.username,
  //       loggedInUser.token,
  //       formData
  //     );
  //     console.log(updatedProfileData);
  //   } catch (e) {
  //     if (e.response.data === "NotAnImage") {
  //       console.log("asd");
  //     }
  //   }
  // };

  return (
    <div className="editprofile-page">
      <main className="edit-profile-content">
        <h2>Edit</h2>
        <AvatarEditForm />
        {/* <form
          onSubmit={onEditFormSubmit}
          className="edit-profile-form"
          ref={formRef}
        >
          <div className="edit-input">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={genderInput}
              onChange={onChange}
            >
              <option value=""></option>
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
              onChange={onChange}
              max={new Date().toISOString().slice(0, 10)}
            />
          </div>
          <div className="edit-input">
            <label htmlFor="aboutme">About Me</label>
            <textarea
              id="aboutme"
              type="date"
              value={aboutMe}
              onChange={onChange}
              rows="5"
              cols="35"
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form> */}
      </main>
    </div>
  );
};
export default EditProfilePage;
