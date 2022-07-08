import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Review.css";

const Review = ({ review, episodes, type }) => {
  const [hasOverflow, setHasOverflow] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const reviewTextRef = useRef();

  useEffect(() => {
    if (reviewTextRef.current.clientHeight > 200) {
      setHasOverflow(true);
    }
  }, []);

  const onReviewContentButtonClick = () => {
    setTextVisible((prev) => !prev);
  };

  return (
    <>
      <div className="review">
        <div className="review-info">
          <div className="user-avatar">
            <img
              src={review.author.profileData.personalInfo.avatar.secure_url}
              alt={review.author.username}
            />
          </div>
          <div className="review-details">
            <div className="review-details__left-side">
              <div className="author">
                <p>
                  <NavLink to={`/profile/${review.author.username}`}>
                    {review.author.username}
                  </NavLink>
                </p>
                <p>
                  ({"\u00A0"}
                  <NavLink to={`/profile/${review.author.username}/reviews`}>
                    All reviews
                  </NavLink>
                  {"\u00A0"})
                </p>
              </div>
              <p>{new Date(review.createdAt).toDateString().slice(3)}</p>
            </div>
            <div className="review-details__right-side">
              {type === "anime" && (
                <p>
                  Watched {review.progress} out of {episodes}
                </p>
              )}
              {type === "manga" && (
                <p>
                  Read {review.progress} out of {episodes}
                </p>
              )}
              <p>Score: {review.score}</p>
            </div>
          </div>
        </div>
        <div className="review-content ">
          <div className={textVisible ? "" : "overflow-hidden"}>
            <p ref={reviewTextRef} className="display-linebreak review-text">
              {review.text}
            </p>
          </div>
          {hasOverflow && (
            <p
              className="review-content-button"
              onClick={onReviewContentButtonClick}
            >
              {textVisible ? "Show less" : "Show more"}
            </p>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};
export default Review;
