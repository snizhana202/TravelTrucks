import { iconMap } from "@/constants/icons";
import styles from "./ReviewCard.module.css";
import { Review } from "@/types/camper";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const { reviewer_name, reviewer_rating, comment } = review;

  const StarFilled = iconMap.star;
  const StarEmpty = iconMap.starDefault;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          {reviewer_name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className={styles.name}>{reviewer_name}</p>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => {
              return i < reviewer_rating ? (
                <StarFilled key={i} className={styles.starFilled} />
              ) : (
                <StarEmpty key={i} className={styles.starEmpty} />
              );
            })}
          </div>
        </div>
      </div>
      <p className={styles.comment}>{comment}</p>
    </div>
  );
};
