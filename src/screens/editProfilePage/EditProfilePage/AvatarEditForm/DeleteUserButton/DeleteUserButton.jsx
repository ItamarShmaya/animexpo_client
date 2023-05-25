import "./DeleteUserButton.css";

const DeleteUserButton = ({ openConfirmWindow, setOpenConfirmWindow }) => {
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
