import { useNavigate } from "react-router-dom";
import { JSX } from "react";
import { useLoggedInUser } from "../../../../../../context/context_custom_hooks";
import "./DeleteAccountConfirmWindow.css";
import { deleteUser } from "../../../../../../apis/animexpo/animexpo_updates";

const DeleteAccountConfirmWindow = ({
  setOpenConfirmWindow,
}: {
  setOpenConfirmWindow: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const { loggedInUser, setLoggedInUser, socket } = useLoggedInUser();
  const navigate = useNavigate();

  const onConfirmBtnClick = async (e: React.MouseEvent): Promise<void> => {
    try {
      const res = await deleteUser(loggedInUser.username, loggedInUser.token);
      if (res.delete === "success") {
        setLoggedInUser(null);
        localStorage.removeItem("loggedUser");
        socket?.emit("logout");
        socket?.disconnect();
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
