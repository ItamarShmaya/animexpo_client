import { useState, useEffect, JSX } from "react";
import { useParams } from "react-router-dom";
import { getEntryReviews } from "../../../apis/animexpo/animexpo_requests";
import Review from "../../../components/ReviewsSection/Review/Review";
import "./EntryReviewsPage.css";
import { ReviewType } from "../../../apis/animexpo/animexpo_requests.types";

const EntryReviewsPage = (): JSX.Element => {
  const { id } = useParams() as { id: string };
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  useEffect(() => {
    const getAllReviews = async () => {
      try {
        const reviewsList = await getEntryReviews(+id, 0);
        setReviews(reviewsList);
      } catch (e) {}
    };

    getAllReviews();
  }, [id]);

  const renderReviews = () => {
    return reviews.map((review) => {
      return <Review key={review._id} review={review} />;
    });
  };
  return (
    <div className="entry-reviews-page">
      <div className="reviews-list">{renderReviews()}</div>
    </div>
  );
};
export default EntryReviewsPage;
