import { useState, useRef, useEffect } from "react";
import "./MobileEditWindow.css";
import { updateFieldInAnimeListEntry } from "../../../../apis/animexpo/animexpo_updates";
import { useLoggedInUser } from "../../../../context/context_custom_hooks";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";

const MobileEditWindow = ({ item, isEdit, setIsEdit, setUserList }) => {
  const { title, episodes, progress, score, status, _id } = item;
  const [statusInput, setStatusInput] = useState(status);
  const [scoreInput, setScoreInput] = useState(score);
  const [progressInput, setProgressInput] = useState(progress);
  const mobileItemEditFormRef = useRef();
  const { loggedInUser } = useLoggedInUser();
  const { setLocalStorage } = useLocalStorage();

  const updateAnimeEntry = async (body) => {
    try {
      const updatedAnimeList = await updateFieldInAnimeListEntry(
        loggedInUser.username,
        loggedInUser.token,
        body
      );

      setUserList(updatedAnimeList.list);
      setLocalStorage("loggedInUserAnimeList", updatedAnimeList);
    } catch (e) {
      console.log(e);
    }
  };
  const onEditFormSubmit = (e) => {
    e.preventDefault();
    if (
      statusInput === status &&
      scoreInput === score &&
      progressInput === progress
    ) {
      setIsEdit(false);
      return;
    } else {
      updateAnimeEntry({
        _id,
        status: statusInput,
        score: scoreInput,
        progress: progressInput,
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
              onChange={({ target }) => setStatusInput(target.value)}
            >
              <option value="Watching">Watching</option>
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
              data-episodes={episodes}
            >
              <input
                id="progress"
                type="number"
                value={progressInput}
                min={1}
                max={episodes}
                onChange={({ target }) => setProgressInput(target.value)}
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
export default MobileEditWindow;
