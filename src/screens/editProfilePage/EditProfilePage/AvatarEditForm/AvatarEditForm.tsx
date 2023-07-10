import { useState, useRef, JSX } from "react";
import { changeAvatar } from "../../../../apis/animexpo/animexpo_updates";
import { useLoggedInUser } from "../../../../context/context_custom_hooks";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import "./AvatarEditForm.css";

const AvatarEditForm = (): JSX.Element => {
  const avatarFileRef = useRef<HTMLInputElement>(null);
  const { saveToLoggedUser } = useLocalStorage();
  const { loggedInUser } = useLoggedInUser();
  const [formatError, setFormatError] = useState(false);

  const onAvatarSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (avatarFileRef?.current?.files && !avatarFileRef.current.files[0])
      return;

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
      saveToLoggedUser("profileData", updatedProfileData);

      if (avatarFileRef.current) avatarFileRef.current.value = "";
    } catch (e: any) {
      if (e.response.data === "NotAnImage") {
        setFormatError(true);
      }
    }
  };
  return (
    <form className="avatar-form" onSubmit={onAvatarSubmit}>
      <p className="label">Avatar</p>
      <div className="file-input-container">
        {formatError && <p className="wrong-info-alert">Wrong file format</p>}
        <p>File must be jpg, jpeg or png format.</p>
        <p>Maximum of 175 x 200 pixels (resized automatically)</p>
        <input name="avatar" type="file" ref={avatarFileRef} />
        <button type="submit" className="cool-btn">
          Change
        </button>
      </div>
    </form>
  );
};
export default AvatarEditForm;
