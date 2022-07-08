import { useState } from "react";
import { useRef } from "react";
import { changeAvatar } from "../../../../apis/animexpo/animexpo_updates.js";
import { useLoggedInUser } from "../../../../context/context_custom_hooks.js";
import { useLocalStorage } from "../../../../hooks/useLocalStorage.js";
import "./AvatarEditForm.css";

const AvatarEditForm = () => {
  const avatarFileRef = useRef();
  const { setLocalStorage } = useLocalStorage();
  const { loggedInUser } = useLoggedInUser();
  const [formatError, setFormatError] = useState(false);

  const onAvatarSubmit = async (e) => {
    e.preventDefault();
    if (!avatarFileRef.current.files[0]) return;

    const form = new FormData();
    if (avatarFileRef.current?.files?.[0]) {
      form.append("avatar", avatarFileRef.current.files[0]);
    }

    try {
      setFormatError(false);
      const updatedProfileData = await changeAvatar(
        loggedInUser.username,
        loggedInUser.token,
        form
      );
      setLocalStorage("loggedInUserProfileData", updatedProfileData);

      avatarFileRef.current.value = null;
    } catch (e) {
      if (e.response.data === "NotAnImage") {
        setFormatError(true);
      }
    }
  };
  return (
    <form className="avatar-form" onSubmit={onAvatarSubmit}>
      <p>Avatar</p>
      <div className="file-input-container">
        {formatError && <p className="wrong-info-alert">Wrong file format</p>}
        <p>File must be jpg, jpeg or png format.</p>
        <p>Maximum of 175 x 200 pixels (resized automatically)</p>
        <input name="avatar" type="file" ref={avatarFileRef} />
        <button type="submit">Change</button>
      </div>
    </form>
  );
};
export default AvatarEditForm;
