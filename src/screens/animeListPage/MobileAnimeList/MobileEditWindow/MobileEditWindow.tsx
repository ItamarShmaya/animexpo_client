import { useState, useRef, useEffect, JSX } from "react";
import "./MobileEditWindow.css";
import { useLoggedInUser } from "../../../../context/context_custom_hooks";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { MobileEditWindowProps } from "./MobileEditWindow.types";

const MobileEditWindow = ({
  item,
  isEdit,
  setIsEdit,
  userList,
  setUserList,
  updateEntry,
}: MobileEditWindowProps): JSX.Element => {
  const {
    title,
    episodes,
    volumes,
    progress,
    score,
    status,
    comment,
    _id,
    id,
  } = item;
  const [statusInput, setStatusInput] = useState<string>(status);
  const [scoreInput, setScoreInput] = useState<string>(score.toString());
  const [progressInput, setProgressInput] = useState<string>(
    progress.toString()
  );
  const [commentInput, setCommentInput] = useState<string>(comment);
  const mobileItemEditFormRef = useRef<HTMLFormElement>(null);
  const { loggedInUser } = useLoggedInUser();
  const { getLocalStorageUserData, saveToLoggedUser } = useLocalStorage();

  const onEditFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
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
      updateEntry(
        loggedInUser,
        getLocalStorageUserData,
        saveToLoggedUser,
        id,
        userList,
        setUserList,
        {
          _id,
          status: statusInput,
          score: +scoreInput,
          progress: +progressInput,
          comment: commentInput,
        }
      );
      setIsEdit(false);
      return;
    }
  };

  useEffect(() => {
    if (isEdit) {
      const onBodyClick = (e: MouseEvent): void => {
        const target = e.target as Node;
        if (mobileItemEditFormRef.current?.contains(target)) return;
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

  const onStatusInputChange = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    if (target.value === "Completed") {
      if (episodes) setProgressInput(episodes.toString());
      else if (volumes) setProgressInput(volumes.toString());
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
              <option value="Watching">Watching</option>
              <option value="Completed">Completed</option>
              <option value="Dropped">Dropped</option>
              <option value="On Hold">On Hold</option>
              <option value="Plan to Watch">Plan to Watch</option>
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
              data-max={episodes || volumes}
            >
              <input
                id="progress"
                type="number"
                value={progressInput}
                min={1}
                max={episodes || volumes}
                onChange={({ target }) => setProgressInput(target.value)}
              />
            </div>
          </div>
          <div className="mobile-item-edit-input-group">
            <label htmlFor="comment">Comment</label>
            <div className="mobile-item-edit-comment-input">
              <textarea
                id="comment"
                value={commentInput}
                onChange={({ target }) => setCommentInput(target.value)}
              ></textarea>
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
export default MobileEditWindow;
