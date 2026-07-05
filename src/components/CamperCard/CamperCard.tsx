import Image from "next/image";
import { Camper } from "@/types/camper";
import styles from "./CamperCard.module.css";
import { iconMap } from "@/constants/icons";
import Link from "next/link";
import CamperFeatures from "@/components/CamperFeatures/CamperFeatures";

export default function CamperCard({ camper }: { camper: Camper }) {
  const StarIcon = iconMap.star;
  const MapIcon = iconMap.map;

  return (
    <div className={styles.card}>
      <Image
        src={camper.coverImage}
        alt={camper.name}
        width={290}
        height={310}
        className={styles.image}
      />

      <div className={styles.content}>
        <div className={styles.camperContent}>
          <div className={styles.camperHeader}>
            <h3>{camper.name}</h3>
            <p>€{camper.price.toFixed(2)}</p>
          </div>

          <div className={styles.info}>
            <div className={styles.rating}>
              {StarIcon && <StarIcon className={styles.icon} color="#ffc531" />}
              <span>
                {camper.rating} ({camper.totalReviews} Reviews)
              </span>
            </div>
            <div className={styles.location}>
              {MapIcon && <MapIcon className={styles.icon} />}
              <span>{camper.location}</span>
            </div>
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <CamperFeatures camper={camper} limit={3} />
        <Link
          href={`/catalog/${camper.id}`}
          className={styles.button}
          target="_blank"
          rel="noopener noreferrer"
        >
          Show more
        </Link>
      </div>
    </div>
  );
}
