import { Review } from "@/types/camper";
import { ReviewCard } from "@/components/ReviewCard/ReviewCard";
import styles from "./ReviewsList.module.css";

interface ReviewsListProps {
  reviews: Review[];
}

export const ReviewsList = ({ reviews }: ReviewsListProps) => {
  if (!reviews || reviews.length === 0) {
    return <p>There are currently no reviews</p>;
  }

  return (
    <div className={styles.reviewWrapper}>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};
