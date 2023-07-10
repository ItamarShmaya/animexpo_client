import { useState, useEffect, JSX } from "react";
import { postReview } from "../../../apis/animexpo/animexpo_requests";
import { useLoggedInUser } from "../../../context/context_custom_hooks";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import "./AddReview.css";
import { AddReviewProps } from "./AddReview.types";
import { UserMediaStatusType } from "../../../apis/animexpo/animexpo_updates.types";

const AddReview = ({
  id,
  title,
  image,
  episodes,
  type,
  setReviews,
}: AddReviewProps): JSX.Element => {
  const { getLocalStorageUserData, saveToLoggedUser } = useLocalStorage();
  const { loggedInUser } = useLoggedInUser();
  const [reviewContent, setReviewContent] = useState<string>("");
  const [scoreInput, setScoreInput] = useState<string>("");
  const [statusInput, setStatusInput] = useState<UserMediaStatusType | "">("");
  const [progressInput, setProgressInput] = useState<string>("");
  const [notLoggedInError, setNotLoggedInError] = useState<boolean>(false);
  const [notOnListError, setNotOnListError] = useState<boolean>(false);
  const [textValidationError, setTextValidationError] =
    useState<boolean>(false);

  useEffect(() => {
    if (loggedInUser) {
      let entry;
      if (type === "anime") {
        const animeList = getLocalStorageUserData().animeList;
        entry = animeList.list.find((item) => item.id === id);
      } else if (type === "manga") {
        const animeList = getLocalStorageUserData().mangaList;
        entry = animeList.list.find((item) => item.id === id);
      }

      if (entry) {
        setScoreInput(entry.score.toString());
        setStatusInput(entry.status);
        setProgressInput(entry.progress.toString());
        return;
      }
    }
    setScoreInput("");
    setStatusInput("");
    setProgressInput("");
  }, [loggedInUser, id, type, getLocalStorageUserData]);

  const onReviewSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!loggedInUser) return setNotLoggedInError(true);
    if (type === "anime") {
      const list = getLocalStorageUserData().animeList;
      const anime = list.list.find((anime) => anime.id === id);
      if (!anime) return setNotOnListError(true);
    }
    if (type === "manga") {
      const list = getLocalStorageUserData().mangaList;
      const manga = list.list.find((manga) => manga.id === id);
      if (!manga) return setNotOnListError(true);
    }

    if (reviewContent.trim().length < 10) return setTextValidationError(true);
    try {
      const body = {
        author: loggedInUser._id,
        text: reviewContent,
        id,
        title: title as string,
        image: image as string,
        score: +scoreInput,
        progress: +progressInput,
        status: statusInput as UserMediaStatusType,
        episodes: episodes || 1,
        type,
      };
      const updatedReviewsList = await postReview(loggedInUser.token, body);
      setReviews(updatedReviewsList);
      const profileData = getLocalStorageUserData().profileData;
      profileData.personalInfo.reviewsCount += 1;
      saveToLoggedUser("profileData", profileData);
      setReviewContent("");
      setScoreInput("");
      setStatusInput("");
      setProgressInput("");
      setNotOnListError(false);
      setNotLoggedInError(false);
      setTextValidationError(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onProgressChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    if (+target.value >= (episodes || 1)) {
      setProgressInput((episodes || 1).toString());
      setStatusInput("Completed");
      return;
    }

    if (+target.value <= 0) {
      setProgressInput("1");
      if (type === "anime") setStatusInput("Watching");
      if (type === "manga") setStatusInput("Reading");
      return;
    }

    if (+target.value < (episodes || 1) && statusInput === "Completed") {
      setProgressInput(target.value);
      if (type === "anime") setStatusInput("Watching");
      if (type === "manga") setStatusInput("Reading");
    }

    setProgressInput(target.value);
  };

  const onStatusChange = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>): void => {
    if (target.value === "Completed") {
      setStatusInput(target.value);
      setProgressInput((episodes || 1).toString());
      return;
    }
    setStatusInput(target.value as UserMediaStatusType);
  };
  return (
    <>
      {notLoggedInError && (
        <p className="review-error-message">Must log in first</p>
      )}
      {notOnListError && (
        <p className="review-error-message">
          This series must be on your list to review it
        </p>
      )}
      {textValidationError && (
        <p className="review-error-message">
          Review must be atleast 10 characters long
        </p>
      )}
      <h1>Write a review</h1>
      <form onSubmit={onReviewSubmit}>
        <div className="review-stats">
          <select
            className="review-stats-field"
            value={statusInput}
            onChange={onStatusChange}
            required
          >
            <option value="">Status</option>
            <option value="Completed">Completed</option>
            {type === "anime" && <option value="Watching">Watching</option>}
            {type === "manga" && <option value="Reading">Reading</option>}
            <option value="Dropped">Dropped</option>
            <option value="On Hold">On Hold</option>
            <option value="Dropped">Dropped</option>
            {type === "anime" && (
              <option value="Plan to Watch">Plan to Watch</option>
            )}
            {type === "manga" && (
              <option value="Plan to Read">Plan to Read</option>
            )}
          </select>
          <select
            className="review-stats-field"
            value={scoreInput}
            onChange={({ target }) => setScoreInput(target.value)}
            required
          >
            <option value="">Score</option>
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
          <div className="watched-episodes">
            <input
              className="review-stats-field"
              type="number"
              value={progressInput}
              onChange={onProgressChange}
              required
            />
            <span className="review-episodes">/{episodes || 1}</span>
          </div>
        </div>
        <textarea
          className="review-textarea"
          placeholder="Review"
          value={reviewContent}
          onChange={({ target }) => setReviewContent(target.value)}
          required
        ></textarea>
        <button type="submit" className="review-button">
          Submit
        </button>
      </form>
    </>
  );
};
export default AddReview;
