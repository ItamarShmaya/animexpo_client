import "./AnimeListItem.css";
import { useRef, useState, useEffect, JSX } from "react";
import { NavLink } from "react-router-dom";
import { useLoggedInUser } from "../../../../context/context_custom_hooks";
import {
  removeFromAnimeList,
  updateFieldInAnimeListEntry,
} from "../../../../apis/animexpo/animexpo_updates";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { AnimeListItemProps } from "./AnimeListItem.types";
import {
  UpdateMediaEntryBody,
  UserAnimeEntry,
} from "../../../../apis/animexpo/animexpo_updates.types";

const AnimeListItem = ({
  item,
  username,
  userList,
  setUserList,
  itemPosition,
  dispatch,
}: AnimeListItemProps): JSX.Element => {
  const {
    title,
    image,
    episodes,
    progress,
    format,
    comment,
    id,
    status,
    score,
    _id,
  } = item as UserAnimeEntry;
  const [progressEditMode, setProgressEditMode] = useState<boolean>(false);
  const [commentEditMode, setCommentEditMode] = useState<boolean>(false);
  const [statusEditMode, setStatusEditMode] = useState<boolean>(false);
  const [scoreEditMode, setScoreEditMode] = useState<boolean>(false);
  const [progressInput, setProgressInput] = useState<string>(
    progress.toString()
  );
  const [commentInput, setCommentInput] = useState<string>(comment);
  const [statusInput, setStatusInput] = useState<string>(status);
  const [scoreInput, setScoreInput] = useState<string>(score.toString());
  const { loggedInUser } = useLoggedInUser();
  const [isloggedInUserList, setIsLoggedInUserList] = useState(false);
  const { getLocalStorage, saveToLoggedUser } = useLocalStorage();
  const progressRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const scoreRef = useRef<HTMLSelectElement>(null);
  const [commentTimeoudID, setCommentTimeoutID] =
    useState<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setIsLoggedInUserList(false);
    if (loggedInUser?.username === username) {
      setIsLoggedInUserList(true);
    }
  }, [loggedInUser?.username, username]);

  const updateAnimeEntry = async (
    body: UpdateMediaEntryBody
  ): Promise<void> => {
    try {
      const updatedAnimeListEntry = await updateFieldInAnimeListEntry(
        loggedInUser.username,
        loggedInUser.token,
        body
      );

      dispatch({
        type: "update_entry",
        id,
        updatedListEntry: updatedAnimeListEntry,
      });

      const FullListEntryIndex = userList.findIndex((entry) => entry.id === id);
      const updatedFullUserList = [...userList];
      updatedFullUserList[FullListEntryIndex] = updatedAnimeListEntry;
      setUserList(updatedFullUserList);

      const animeList = getLocalStorage("loggedUser").animeList;
      animeList.list = [...updatedFullUserList];
      saveToLoggedUser("animeList", animeList);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (progressEditMode) {
      const onBodyClick = ({ target }: MouseEvent): void => {
        if (progressRef.current === target) return;
        setProgressEditMode(false);
        if (+progressInput !== progress) {
          let tempProgressInput = +progressInput;
          if (tempProgressInput >= episodes) {
            tempProgressInput = episodes;
            updateAnimeEntry({ _id, progress: tempProgressInput });
          } else if (tempProgressInput < 0) tempProgressInput = 1;
          updateAnimeEntry({ _id, progress: tempProgressInput });
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
      const onBodyClick = ({ target }: MouseEvent): void => {
        if (commentRef.current === target) return;
        setCommentEditMode(false);
        if (commentInput !== comment) {
          updateAnimeEntry({ _id, comment: commentInput });
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
      const onBodyClick = ({ target }: MouseEvent): void => {
        if (statusRef.current === target) return;
        setStatusEditMode(false);
        if (statusInput !== status) {
          if (statusInput === "Completed") {
            updateAnimeEntry({ _id, status: statusInput, progress: episodes });
          } else {
            updateAnimeEntry({ _id, status: statusInput });
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
      const onBodyClick = ({ target }: MouseEvent): void => {
        if (scoreRef.current === target) return;
        setScoreEditMode(false);
        if (+scoreInput !== score) {
          updateAnimeEntry({ _id, score: +scoreInput });
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
          <span>{progress || 1}</span>/{episodes || 1}
        </>
      );
    } else {
      return (
        <>
          {progressEditMode ? (
            <input
              ref={progressRef}
              onChange={({
                target,
              }: React.ChangeEvent<HTMLInputElement>): void =>
                setProgressInput(target.value)
              }
              value={progressInput}
              type="number"
              min={1}
              max={episodes || 1}
            />
          ) : (
            <span
              className=" editable"
              onClick={() => setProgressEditMode(true)}
            >
              {progress || 1}
            </span>
          )}
          /{episodes || 1}
        </>
      );
    }
  };

  const renderCommentCol = () => {
    const onCommentMouseEnter = (
      e: React.MouseEvent<HTMLSpanElement>
    ): void => {
      const target = e.currentTarget.parentElement?.children[1] as HTMLElement;
      target.style.display = "flex";
      const commentHeight = +window
        .getComputedStyle(target)
        .height.slice(0, -2);
      const availableSpace =
        window.innerHeight - e.currentTarget.getBoundingClientRect().bottom;
      if (availableSpace < commentHeight) {
        target.style.top = `calc(-${commentHeight}px + 100%)`;
      }
    };

    const onCommentMouseLeave = (
      e: React.MouseEvent<HTMLSpanElement>
    ): void => {
      const currentTarget = e.currentTarget.parentElement
        ?.children[1] as HTMLElement;
      setCommentTimeoutID(
        setTimeout(() => {
          currentTarget.style.display = "none";
        }, 100)
      );
    };
    
    if (!isloggedInUserList) {
      return (
        comment && (
          <span
            className="entry-comment"
            onMouseEnter={onCommentMouseEnter}
            onMouseLeave={onCommentMouseLeave}
          >
            <i className="fa-solid fa-comment"></i>
          </span>
        )
      );
    } else {
      return commentEditMode ? (
        <div className="comment-edit-window">
          <h3>{title}</h3>
          <textarea
            ref={commentRef}
            onChange={({
              target,
            }: React.ChangeEvent<HTMLTextAreaElement>): void =>
              setCommentInput(target.value)
            }
            value={commentInput}
          ></textarea>
        </div>
      ) : (
        <span
          className="entry-comment editable"
          onClick={(e: React.MouseEvent<HTMLSpanElement>): void => {
            setCommentEditMode(true);
            const target = e.currentTarget.parentElement
              ?.children[1] as HTMLElement;
            target.style.display = "none";
          }}
          onMouseEnter={onCommentMouseEnter}
          onMouseLeave={onCommentMouseLeave}
        >
          <i className="fa-solid fa-comment"></i>
        </span>
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
              <option value="Watching">Watching</option>
              <option value="Completed">Completed</option>
              <option value="Dropped">Dropped</option>
              <option value="On Hold">On Hold</option>
              <option value="Plan to Watch">Plan to Watch</option>
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
              onChange={({ target }: React.ChangeEvent<HTMLSelectElement>) =>
                setScoreInput(target.value)
              }
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
      const updatedAnimeList = await removeFromAnimeList(
        loggedInUser.username,
        loggedInUser.token,
        id
      );

      dispatch({ type: "remove_entry", id });
      setUserList(updatedAnimeList.list);
      saveToLoggedUser("animeList", updatedAnimeList);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className={`list-item ${isloggedInUserList ? "nine-grid" : "eight-grid"}`}
    >
      <div className="mylist-item-number">{itemPosition}</div>
      <div className="mylist-item-img-container">
        <NavLink to={`/anime/${id}`}>
          <img alt={title} src={image} />
        </NavLink>
      </div>
      <div className="mylist-item-title">{title}</div>
      <div className="mylist-item-type">{format}</div>
      <div className="mylist-item-episodes">{renderProgressCol()}</div>
      <div className="mylist-item-status">{renderStatusCol()}</div>
      <div className="mylist-item-score">{renderScoreCol()}</div>
      <div className="mylist-item-comment">
        {
          <>
            {renderCommentCol()}
            <div
              className="comment-wrapper"
              onMouseEnter={(e) => {
                clearTimeout(commentTimeoudID);
                e.currentTarget.style.display = "flex";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.display = "none";
              }}
            >
              <div className="comment-container">{comment || "Edit"}</div>
            </div>
          </>
        }
      </div>
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

export default AnimeListItem;
