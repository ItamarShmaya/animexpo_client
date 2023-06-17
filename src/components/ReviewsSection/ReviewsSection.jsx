import { useEffect } from "react";
import { useState } from "react";
import "./ReviewsSection.css";
import { getEntryReviews } from "../../apis/animexpo/animexpo_requests.js";
import AddReview from "./AddReview/AddReview";
import Review from "./Review/Review";
import { NavLink } from "react-router-dom";

const ReviewsSection = ({ id, title, image, episodes, type }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviewsList = async () => {
      try {
        const reviewsList = await getEntryReviews(id, 5);
        setReviews(reviewsList);
      } catch (e) {
        console.log(e);
      }
    };
    getReviewsList();
  }, [id]);

  const renderReviews = (reviews) => {
    return reviews.map((review) => {
      return <Review key={review._id} review={review} />;
    });
  };
  return (
    <div className="reviews-section">
      <h1>Reviews</h1>
      {reviews.length > 0 ? (
        <>
          <NavLink to={`/${type}/${id}/reviews`}>
            <p>More reviews</p>
          </NavLink>
          <div className="reviews-list">{renderReviews(reviews)}</div>
        </>
      ) : (
        <div className="reviews-list no-reviews">No reviwes written</div>
      )}
      <div className="post-review">
        <AddReview
          id={id}
          setReviews={setReviews}
          title={title}
          image={image}
          episodes={episodes}
          type={type}
        />
      </div>
    </div>
  );
};
export default ReviewsSection;
