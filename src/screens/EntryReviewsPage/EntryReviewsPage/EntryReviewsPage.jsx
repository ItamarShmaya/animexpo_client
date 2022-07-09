import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEntryReviews } from "../../../apis/animexpo/animexpo_requests";
import Review from "../../../components/ReviewsSection/Review/Review";
import "./EntryReviewsPage.css";

const EntryReviewsPage = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getAllReviews = async () => {
      console.log(id);
      try {
        const reviewsList = await getEntryReviews(id, 0);
        console.log(reviewsList);
        setReviews(reviewsList);
      } catch (e) {}
    };

    getAllReviews();
  }, [id]);

  const renderReviews = (reviewsList) => {
    return reviewsList.map((review) => {
      return <Review review={review} />;
    });
  };
  return (
    <div className="entry-reviews-page">
      <div className="reviews-list">{renderReviews(reviews)}</div>
    </div>
  );
};
export default EntryReviewsPage;
