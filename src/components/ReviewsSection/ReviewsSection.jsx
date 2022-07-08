import { useEffect } from "react";
import { useState } from "react";
import "./ReviewsSection.css";
import { getEntryReviews } from "../../apis/animexpo/animexpo_requests.js";
import AddReview from "./AddReview/AddReview";
import Review from "./Review/Review";

const ReviewsSection = ({ mal_id, title, image, episodes, type }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviewsList = async () => {
      try {
        const reviewsList = await getEntryReviews(mal_id);
        setReviews(reviewsList);
      } catch (e) {
        console.log(e);
      }
    };
    getReviewsList();
  }, [mal_id]);

  const renderReviews = (reviews) => {
    return reviews.map((review) => {
      return (
        <Review
          key={review._id}
          review={review}
          episodes={episodes}
          type={type}
        />
      );
    });
  };
  return (
    <div className="reviews-section">
      <h1>Reviews</h1>
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
