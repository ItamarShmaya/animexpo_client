import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  removeFromMangaList,
  updateFieldInMangaListEntry,
} from "../../../apis/animexpo/animexpo_updates";
import { useLoggedInUser } from "../../../context/context_custom_hooks";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import "./MangaListItem.css";

const MangaListItem = ({ item, username, setUserList, number }) => {
  const {
    title,
    image,
    volumes,
    progress,
    type,
    comment,
    mal_id,
    status,
    score,
    _id,
  } = item;
  const [progressEditMode, setProgressEditMode] = useState(false);
  const [commentEditMode, setCommentEditMode] = useState(false);
  const [statusEditMode, setStatusEditMode] = useState(false);
  const [scoreEditMode, setScoreEditMode] = useState(false);
  const [progressInput, setProgressInput] = useState(progress);
  const [commentInput, setCommentInput] = useState(comment);
  const [statusInput, setStatusInput] = useState(status);
  const [scoreInput, setScoreInput] = useState(score);
  const { loggedInUser } = useLoggedInUser();
  const [isloggedInUserList, setIsLoggedInUserList] = useState(false);
  const { setLocalStorage } = useLocalStorage();
  const progressRef = useRef();
  const commentRef = useRef();
  const statusRef = useRef();
  const scoreRef = useRef();

  useEffect(() => {
    setIsLoggedInUserList(false);
    if (loggedInUser?.username === username) {
      setIsLoggedInUserList(true);
    }
  }, [loggedInUser?.username, username]);

  const updateMangaEntry = async (body) => {
    try {
      const updatedMangaList = await updateFieldInMangaListEntry(
        loggedInUser.username,
        loggedInUser.token,
        body
      );
      setUserList(updatedMangaList.list);
      setLocalStorage("loggedInUserMangaList", updatedMangaList);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (progressEditMode) {
      const onBodyClick = ({ target }) => {
        if (progressRef.current === target) return;
        setProgressEditMode(false);
        if (+progressInput !== progress) {
          let tempProgressInput = +progressInput;
          if (tempProgressInput >= volumes) {
            tempProgressInput = volumes;
            updateMangaEntry({ _id, progress: tempProgressInput });
          } else if (tempProgressInput < 0) tempProgressInput = 1;
          updateMangaEntry({ _id, progress: tempProgressInput });
        }
      };

      document.body.addEventListener("click", onBodyClick, { capture: true });

      return () => {
        document.body.removeEventListener("click", onBodyClick, {
          capture: true,
        });
      };
    }
    // eslint-disable-next-line
  }, [progressInput, progressEditMode]);

  useEffect(() => {
    if (commentEditMode) {
      const onBodyClick = ({ target }) => {
        if (commentRef.current === target) return;
        setCommentEditMode(false);
        if (commentInput !== comment) {
          updateMangaEntry({ _id, comment: commentInput });
        }
      };

      document.body.addEventListener("click", onBodyClick, { capture: true });

      return () => {
        document.body.removeEventListener("click", onBodyClick, {
          capture: true,
        });
      };
    }
    // eslint-disable-next-line
  }, [commentEditMode, commentInput]);

  useEffect(() => {
    if (statusEditMode) {
      const onBodyClick = ({ target }) => {
        if (statusRef.current === target) return;
        setStatusEditMode(false);
        if (statusInput !== status) {
          if (statusInput === "Completed") {
            updateMangaEntry({ _id, status: statusInput, progress: volumes });
          } else {
            updateMangaEntry({ _id, status: statusInput });
          }
        }
      };

      document.body.addEventListener("click", onBodyClick, { capture: true });

      return () => {
        document.body.removeEventListener("click", onBodyClick, {
          capture: true,
        });
      };
    }
    // eslint-disable-next-line
  }, [statusEditMode, statusInput]);

  useEffect(() => {
    if (scoreEditMode) {
      const onBodyClick = ({ target }) => {
        if (scoreRef.current === target) return;
        setScoreEditMode(false);
        if (scoreInput !== score) {
          updateMangaEntry({ _id, score: scoreInput });
        }
      };

      document.body.addEventListener("click", onBodyClick, { capture: true });

      return () => {
        document.body.removeEventListener("click", onBodyClick, {
          capture: true,
        });
      };
    }
    // eslint-disable-next-line
  }, [scoreEditMode, scoreInput]);

  const renderProgressCol = () => {
    if (!isloggedInUserList) {
      return (
        <>
          <span>{progress || 1}</span>/{volumes || 1}
        </>
      );
    } else {
      return (
        <>
          {progressEditMode ? (
            <input
              ref={progressRef}
              onChange={({ target }) => setProgressInput(target.value)}
              value={progressInput}
              type="number"
              min={1}
              max={volumes || 1}
            />
          ) : (
            <span
              className=" editable"
              onClick={() => setProgressEditMode(true)}
            >
              {progress || 1}
            </span>
          )}
          /{volumes || 1}
        </>
      );
    }
  };

  const renderCommentCol = () => {
    if (!isloggedInUserList) {
      return <>{comment}</>;
    } else {
      return (
        <>
          {commentEditMode ? (
            <input
              ref={commentRef}
              onChange={({ target }) => setCommentInput(target.value)}
              value={commentInput}
              type="text"
            />
          ) : (
            <span className="editable" onClick={() => setCommentEditMode(true)}>
              {comment || "Edit"}
            </span>
          )}
        </>
      );
    }
  };

  const renderStatusCol = () => {
    if (!isloggedInUserList) {
      return <>{status}</>;
    } else {
      return (
        <>
          {statusEditMode ? (
            <select
              ref={statusRef}
              value={statusInput}
              onChange={({ target }) => setStatusInput(target.value)}
            >
              <option value="Reading">Reading</option>
              <option value="Completed">Completed</option>
              <option value="Dropped">Dropped</option>
            </select>
          ) : (
            <span className="editable" onClick={() => setStatusEditMode(true)}>
              {status}
            </span>
          )}
        </>
      );
    }
  };

  const renderScoreCol = () => {
    if (!isloggedInUserList) {
      return <>{score}</>;
    } else {
      return (
        <>
          {scoreEditMode ? (
            <select
              ref={scoreRef}
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
          ) : (
            <span className="editable" onClick={() => setScoreEditMode(true)}>
              {score}
            </span>
          )}
        </>
      );
    }
  };

  const onRemoveClick = async () => {
    try {
      const updatedMangaList = await removeFromMangaList(
        loggedInUser.username,
        loggedInUser.token,
        mal_id
      );
      setUserList(updatedMangaList.list);
      setLocalStorage("loggedInUserMangaList", updatedMangaList);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="list-item">
      <div className="mylist-item-number">{number}</div>
      <div className="mylist-item-img-container">
        <NavLink to={`/manga/${mal_id}`}>
          <img alt={title} src={image} />
        </NavLink>
      </div>
      <div className="mylist-item-title">{title}</div>
      <div className="mylist-item-type">{type}</div>
      <div className="mylist-item-episodes">{renderProgressCol()}</div>
      <div className="mylist-item-status">{renderStatusCol()}</div>
      <div className="mylist-item-score">{renderScoreCol()}</div>
      <div className="mylist-item-comment">{renderCommentCol()}</div>
      {isloggedInUserList && (
        <div className="mylist-item-remove">
          <button className="remove-button" onClick={onRemoveClick}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
};
export default MangaListItem;
