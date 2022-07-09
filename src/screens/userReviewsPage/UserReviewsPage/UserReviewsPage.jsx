import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserReviews } from "../../../apis/animexpo/animexpo_requests.js";
import UserReview from "../UserReview/UserReview.jsx";
import "./UserReviewsPage.css";

const UserReviewsPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    const getUserReviewsList = async () => {
      try {
        const userReviewsList = await getUserReviews(username);
        if (userReviewsList) setReviewsList(userReviewsList);
      } catch (e) {
        if (e.message === "UserNotFound") navigate("/notfound");
      }
    };

    getUserReviewsList();
  }, [username, navigate]);

  const renderReview = (reviewsList) => {
    return reviewsList.map((review) => {
      return <UserReview key={review._id} review={review} />;
    });
  };

  return (
    <div className="user-reviews-page">
      <div className="reviews-list">{renderReview(reviewsList)}</div>
    </div>
  );
};
export default UserReviewsPage;
