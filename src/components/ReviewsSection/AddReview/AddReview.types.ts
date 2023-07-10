import { ReviewType } from "../../../apis/animexpo/animexpo_requests.types";

export interface AddReviewProps {
  id: number;
  title: string | undefined;
  image: string | undefined;
  episodes: number | undefined;
  type: "anime" | "manga";
  setReviews: React.Dispatch<React.SetStateAction<ReviewType[]>>;
}
