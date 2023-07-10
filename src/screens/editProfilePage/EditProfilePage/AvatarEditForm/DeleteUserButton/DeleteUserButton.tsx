import "./DeleteUserButton.css";
import { JSX } from "react";

const DeleteUserButton = ({
  openConfirmWindow,
  setOpenConfirmWindow,
}: {
  openConfirmWindow: boolean;
  setOpenConfirmWindow: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const onDeleteBtnClick = () => {
    if (!openConfirmWindow) setOpenConfirmWindow(true);
  };

  return (
    <div className="delete-user">
      <p className="label">Delete User</p>
      <button className="cool-btn" onClick={onDeleteBtnClick}>
        Delete
      </button>
    </div>
  );
};

export default DeleteUserButton;
