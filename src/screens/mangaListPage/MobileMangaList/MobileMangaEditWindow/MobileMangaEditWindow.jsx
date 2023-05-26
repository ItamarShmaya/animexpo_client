import { useState, useRef, useEffect } from "react";
import "./MobileMangaEditWindow.css";
import { updateFieldInMangaListEntry } from "../../../../apis/animexpo/animexpo_updates";
import { useLoggedInUser } from "../../../../context/context_custom_hooks";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";

const MobileMangaEditWindow = ({
  item,
  isEdit,
  setIsEdit,
  userList,
  setUserList,
}) => {
  const { title, volumes, progress, score, status, comment, _id, mal_id } =
    item;
  const [statusInput, setStatusInput] = useState(status);
  const [scoreInput, setScoreInput] = useState(score);
  const [progressInput, setProgressInput] = useState(progress);
  const [commentInput, setCommentInput] = useState(comment);
  const mobileItemEditFormRef = useRef();
  const { loggedInUser } = useLoggedInUser();
  const { getLocalStorage, setLocalStorage } = useLocalStorage();

  const updateMangaEntry = async (body) => {
    try {
      const updatedMangaListEntry = await updateFieldInMangaListEntry(
        loggedInUser.username,
        loggedInUser.token,
        body
      );

      const index = userList.findIndex((item) => item.mal_id === mal_id);
      const updatedUserList = [...userList];
      updatedUserList[index] = updatedMangaListEntry;
      setUserList(updatedUserList);
      const mangaList = getLocalStorage("loggedInUserMangaList");
      mangaList.list = [...updatedUserList];
      setLocalStorage("loggedInUserMangaList", mangaList);
    } catch (e) {
      console.log(e);
    }
  };
  const onEditFormSubmit = (e) => {
    e.preventDefault();
    if (
      statusInput.toString() === status.toString() &&
      scoreInput.toString() === score.toString() &&
      progressInput.toString() === progress.toString() &&
      commentInput.toString() === comment.toString()
    ) {
      setIsEdit(false);
      return;
    } else {
      updateMangaEntry({
        _id,
        status: statusInput,
        score: scoreInput,
        progress: progressInput,
        comment: commentInput,
      });
      setIsEdit(false);
      return;
    }
  };

  useEffect(() => {
    if (isEdit) {
      const onBodyClick = ({ target }) => {
        if (mobileItemEditFormRef.current.contains(target)) return;
        setIsEdit(false);
      };

      document.body.addEventListener("click", onBodyClick, { capture: true });

      return () => {
        document.body.removeEventListener("click", onBodyClick, {
          capture: true,
        });
      };
    }
  }, [isEdit, setIsEdit]);

  const onStatusInputChange = ({ target }) => {
    if (target.value === "Completed") {
      setProgressInput(volumes);
    }
    setStatusInput(target.value);
  };

  return (
    <div className="mobile-edit-item-overlay">
      <div className="mobile-item-edit-window-container">
        <form
          ref={mobileItemEditFormRef}
          className="mobile-item-edit-form"
          onSubmit={onEditFormSubmit}
        >
          <h1>{title}</h1>
          <div className="mobile-item-edit-input-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={statusInput}
              onChange={onStatusInputChange}
            >
              <option value="Reading">Reading</option>
              <option value="Completed">Completed</option>
              <option value="Dropped">Dropped</option>
            </select>
          </div>
          <div className="mobile-item-edit-input-group">
            <label htmlFor="score">Score</label>
            <select
              id="score"
              value={scoreInput}
              onChange={({ target }) => setScoreInput(target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div className="mobile-item-edit-input-group">
            <label htmlFor="progress">Progress</label>
            <div
              className="mobile-item-edit-progress-input"
              data-volumes={volumes}
            >
              <input
                id="progress"
                type="number"
                value={progressInput}
                min={1}
                max={volumes}
                onChange={({ target }) => setProgressInput(target.value)}
              />
            </div>
          </div>
          <div className="mobile-item-edit-input-group">
            <label htmlFor="comment">Comment</label>
            <div
              className="mobile-item-edit-comment-input"
              data-maxlength={"*150 Characters Limit"}
            >
              <input
                id="comment"
                type="text"
                value={commentInput}
                maxLength={150}
                onChange={({ target }) => setCommentInput(target.value)}
              />
            </div>
          </div>
          <div className="mobile-item-edit-form-buttons">
            <button
              className="cool-btn"
              type="button"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
            <button className="cool-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default MobileMangaEditWindow;
