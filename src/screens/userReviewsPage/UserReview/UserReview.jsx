import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./UserReview.css";

const UserReview = ({ review }) => {
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
            <img src={review.image} alt={review.title} />
          </div>
          <div className="review-details">
            <div className="review-details__left-side">
              <div className="author">
                <p>
                  <NavLink to={`/${review.type}/${review.mal_id}`}>
                    {review.title}
                  </NavLink>
                </p>
                <p>
                  ({"\u00A0"}
                  <NavLink to={`/${review.type}/${review.mal_id}/reviews`}>
                    All reviews
                  </NavLink>
                  {"\u00A0"})
                </p>
              </div>
              <p>{new Date(review.createdAt).toDateString().slice(3)}</p>
            </div>
            <div className="review-details__right-side">
              {review.type === "anime" && (
                <p>
                  Watched {review.progress} out of {review.episodes}
                </p>
              )}
              {review.type === "manga" && (
                <p>
                  Read {review.progress} out of {review.episodes}
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
export default UserReview;
