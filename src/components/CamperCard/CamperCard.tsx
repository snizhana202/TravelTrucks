import Image from "next/image";
import { Camper } from "@/types/camper";
import styles from "./CamperCard.module.css";
import { iconMap } from "@/constants/icons";

export default function CamperCard({ camper }: { camper: Camper }) {
  const StarIcon = iconMap.star;
  const MapIcon = iconMap.map;

  const features = [
    {
      icon: iconMap[camper.transmission.toLowerCase()],
      label: camper.transmission,
    },
    { icon: iconMap[camper.engine.toLowerCase()], label: camper.engine },
    { icon: iconMap[camper.form.toLowerCase()], label: camper.form },
  ];

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
        <div className={styles.camperHeader}>
          <h3>{camper.name}</h3>
          <p>€{camper.price.toFixed(2)}</p>
        </div>

        <div className={styles.info}>
          <div className={styles.rating}>
            {StarIcon && <StarIcon className={styles.icon} color="#FFC531" />}
            {camper.rating} ({camper.totalReviews} Reviews)
          </div>
          <div className={styles.location}>
            {MapIcon && <MapIcon className={styles.icon} />}
            {camper.location}
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.tags}>
          {features.map((item, i) => (
            <span key={i} className={styles.tag}>
              {item.icon && typeof item.icon === "function" && (
                <item.icon className={styles.icon} />
              )}
              {item.label.replace("_", " ")}
            </span>
          ))}
        </div>

        <button className={styles.button}>Show more</button>
      </div>
    </div>
  );
}
