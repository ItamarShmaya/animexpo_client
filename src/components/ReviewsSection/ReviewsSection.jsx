import { useEffect } from "react";
import { useState } from "react";
import "./ReviewsSection.css";
import { getEntryReviews } from "../../apis/animexpo/animexpo_requests.js";
import AddReview from "./AddReview/AddReview";
import Review from "./Review/Review";
import { NavLink } from "react-router-dom";

const ReviewsSection = ({ mal_id, title, image, episodes, type }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviewsList = async () => {
      try {
        const reviewsList = await getEntryReviews(mal_id, 5);
        setReviews(reviewsList);
      } catch (e) {
        console.log(e);
      }
    };
    getReviewsList();
  }, [mal_id]);

  const renderReviews = (reviews) => {
    return reviews.map((review) => {
      return <Review key={review._id} review={review} />;
    });
  };
  return (
    <div className="reviews-section">
      <h1>Reviews</h1>
      <NavLink to={`/${type}/${mal_id}/reviews`}>
        <p>More reviews</p>
      </NavLink>
      <div className="reviews-list">{renderReviews(reviews)}</div>
      <div className="post-review">
        <AddReview
          mal_id={mal_id}
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
