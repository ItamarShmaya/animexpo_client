import { useEffect } from "react";
import { useState } from "react";
import { postReview } from "../../../apis/animexpo/animexpo_requests.js";
import { useLoggedInUser } from "../../../context/context_custom_hooks.js";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import "./AddReview.css";

const AddReview = ({ id, title, image, episodes, type, setReviews }) => {
  const { getLocalStorage, saveToLoggedUser } = useLocalStorage();
  const { loggedInUser } = useLoggedInUser();
  const [reviewContent, setReviewContent] = useState("");
  const [score, setScore] = useState("");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState("");
  const [notLoggedInError, setNotLoggedInError] = useState(false);
  const [notOnListError, setNotOnListError] = useState(false);
  const [textValidationError, setTextValidationError] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      const userList = getLocalStorage("loggedUser")[`${type}List`];
      const entry = userList.list.find((item) => item.id === id);
      if (entry) {
        setScore(entry.score);
        setStatus(entry.status.toLowerCase());
        setProgress(entry.progress);
        return;
      }
    }
    setScore("");
    setStatus("");
    setProgress("");
  }, [loggedInUser, id, type, getLocalStorage]);

  const onReviewSubmit = async (e) => {
    e.preventDefault();
    if (!loggedInUser) return setNotLoggedInError(true);
    if (type === "anime") {
      const list = getLocalStorage("loggedUser").animeList;
      const anime = list.list.find((anime) => anime.id === id);
      if (!anime) return setNotOnListError(true);
    }
    if (type === "manga") {
      const list = getLocalStorage("loggedUser").mangaList;
      const manga = list.list.find((manga) => manga.id === id);
      if (!manga) return setNotOnListError(true);
    }

    if (reviewContent.trim().length < 10) return setTextValidationError(true);
    try {
      const body = {
        author: loggedInUser._id,
        text: reviewContent,
        id,
        title,
        image,
        score,
        progress,
        status,
        episodes: episodes || 1,
        type,
      };
      const updatedReviewsList = await postReview(loggedInUser.token, body);
      setReviews(updatedReviewsList);
      const profileData = getLocalStorage("loggedUser").profileData;
      profileData.personalInfo.reviewsCount += 1;
      saveToLoggedUser("profileData", profileData);
      setReviewContent("");
      setScore("");
      setStatus("");
      setProgress("");
      setNotOnListError(false);
      setNotLoggedInError(false);
      setTextValidationError(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onProgressChange = ({ target }) => {
    if (target.value >= (episodes || 1)) {
      setProgress(episodes || 1);
      setStatus("completed");
      return;
    }

    if (target.value <= 0) {
      setProgress(1);
      if (type === "anime") setStatus("watching");
      if (type === "manga") setStatus("reading");
      return;
    }

    if (target.value < (episodes || 1) && status === "completed") {
      setProgress(target.value);
      if (type === "anime") setStatus("watching");
      if (type === "manga") setStatus("reading");
    }

    setProgress(target.value);
  };

  const onStatusChange = ({ target }) => {
    if (target.value === "completed") {
      setStatus(target.value);
      setProgress(episodes || 1);
      return;
    }
    setStatus(target.value);
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
            value={status}
            onChange={onStatusChange}
            required
          >
            <option value="">Status</option>
            <option value="completed">Completed</option>
            {type === "anime" && <option value="watching">Watching</option>}
            {type === "manga" && <option value="reading">Reading</option>}
            <option value="dropped">Dropped</option>
          </select>
          <select
            className="review-stats-field"
            value={score}
            onChange={({ target }) => setScore(target.value)}
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
              value={progress}
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
