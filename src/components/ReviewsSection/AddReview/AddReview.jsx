import { useState } from "react";
import { postReview } from "../../../apis/animexpo/animexpo_requests.js";
import { useLoggedInUser } from "../../../context/context_custom_hooks.js";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import "./AddReview.css";

const AddReview = ({ mal_id, title, image, episodes, type, setReviews }) => {
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const { loggedInUser } = useLoggedInUser();
  const [reviewContent, setReviewContent] = useState("");
  const [score, setScore] = useState("");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState("");

  const onReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        author: loggedInUser._id,
        text: reviewContent,
        mal_id,
        title,
        image,
        score,
        progress,
        status,
      };
      const updatedReviewsList = await postReview(loggedInUser.token, body);
      setReviews(updatedReviewsList);
      const profileData = getLocalStorage("loggedInUserProfileData");
      profileData.personalInfo.reviewsCount += 1;
      setLocalStorage("loggedInUserProfileData", profileData);
      setReviewContent("");
    } catch (e) {
      console.log(e);
    }
  };

  const onProgressChange = ({ target }) => {
    if (target.value >= episodes) {
      setProgress(episodes);
      setStatus("completed");
      return;
    }

    if (target.value <= 0) {
      setProgress(1);
      if (type === "anime") setStatus("watching");
      if (type === "manga") setStatus("reading");
      return;
    }
    console.log(status);
    if (target.value < episodes && status === "completed") {
      setProgress(target.value);
      if (type === "anime") setStatus("watching");
      if (type === "manga") setStatus("reading");
    }

    setProgress(target.value);
  };

  const onStatusChange = ({ target }) => {
    if ((target.value = "completed")) {
      setStatus(target.value);
      setProgress(episodes);
      return;
    }
    setStatus(target.value);
  };
  return (
    <>
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
            <span className="review-episodes">/{episodes}</span>
          </div>
        </div>
        <textarea
          className="review-textarea"
          placeholder="Review"
          value={reviewContent}
          onChange={({ target }) => setReviewContent(target.value)}
        ></textarea>
        <button type="submit" className="review-button">
          Submit
        </button>
      </form>
    </>
  );
};
export default AddReview;
