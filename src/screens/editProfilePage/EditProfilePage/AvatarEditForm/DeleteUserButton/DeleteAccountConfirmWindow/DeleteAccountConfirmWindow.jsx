import { useNavigate } from "react-router-dom";
import { useLoggedInUser } from "../../../../../../context/context_custom_hooks";
import "./DeleteAccountConfirmWindow.css";
import { deleteUser } from "../../../../../../apis/animexpo/animexpo_updates";

const DeleteAccountConfirmWindow = ({ setOpenConfirmWindow }) => {
  const { loggedInUser, setLoggedInUser, socket } = useLoggedInUser();
  const navigate = useNavigate();

  const onConfirmBtnClick = async (e) => {
    try {
      const res = await deleteUser(loggedInUser.username, loggedInUser.token);
      if (res.data.delete === "success") {
        setLoggedInUser(null);
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("loggedInUserAnimeList");
        localStorage.removeItem("loggedInUserFavCharsList");
        localStorage.removeItem("loggedInUserFavPeopleList");
        localStorage.removeItem("loggedInUserMangaList");
        localStorage.removeItem("loggedInUserProfileData");
        localStorage.removeItem("loggedInUserFriendsList");
        socket?.emit("logout", { socketId: socket.id });
        navigate(`/`);
      } else throw new Error("Ran into some problems deleting the account");
    } catch (e) {
      console.log(e);
      navigate(`/`);
      window.location.reload();
    }
  };

  const onCancelBtnClick = () => {
    setOpenConfirmWindow(false);
  };
  return (
    <div className="confirm-window-overlay">
      <div className="delete-account-confirm-window">
        <p>
          Proceeding with this action will delete your account{" "}
          <span>PERMENANTLY</span>
        </p>
        <div className="btn-group">
          <button type="button" onClick={onConfirmBtnClick}>
            Confirm
          </button>
          <button type="button" onClick={onCancelBtnClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteAccountConfirmWindow;
