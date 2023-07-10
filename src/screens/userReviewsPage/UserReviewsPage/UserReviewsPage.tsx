import { useState, useEffect, JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserReviews } from "../../../apis/animexpo/animexpo_requests";
import UserReview from "../UserReview/UserReview";
import "./UserReviewsPage.css";
import { ReviewType } from "../../../apis/animexpo/animexpo_requests.types";

const UserReviewsPage = (): JSX.Element => {
  const { username } = useParams() as { username: string };
  const navigate = useNavigate();
  const [reviewsList, setReviewsList] = useState<ReviewType[]>([]);

  useEffect(() => {
    const getUserReviewsList = async () => {
      try {
        const userReviewsList = await getUserReviews(username);
        console.log(userReviewsList);
        if (userReviewsList) setReviewsList(userReviewsList);
      } catch (e: any) {
        if (e.message === "UserNotFound") navigate("/notfound");
      }
    };

    getUserReviewsList();
  }, [username, navigate]);

  const renderReview = () => {
    return reviewsList.map((review) => {
      return <UserReview key={review._id} review={review} />;
    });
  };

  return (
    <div className="user-reviews-page">
      <div className="reviews-list">{renderReview()}</div>
    </div>
  );
};
export default UserReviewsPage;
