// components/CamperCard.tsx
import Image from "next/image";
import { Camper } from "@/types/camper";
import styles from "./CamperCard.module.css";
import { iconMap } from "@/constants/icons";

export default function CamperCard({ camper }: { camper: Camper }) {
  const features = [
    { label: camper.transmission, key: camper.transmission.toLowerCase() },
    { label: camper.engine, key: camper.engine.toLowerCase() },
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
            <Image
              src={camper.rating > 0 ? iconMap.star : iconMap.starDefault}
              alt="rating"
              width={16}
              height={16}
            />
            {camper.rating} ({camper.totalReviews} Reviews)
          </div>
          <div className={styles.location}>
            <Image src={iconMap.map} alt="location" width={16} height={16} />
            {camper.location}
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.tags}>
          {features.map((item, index) => {
            const iconPath = iconMap[item.key];

            return (
              <span key={index} className={styles.tag}>
                {iconPath && (
                  <Image
                    src={iconPath}
                    alt={item.label}
                    width={20}
                    height={20}
                    className={styles.icon}
                  />
                )}
                {item.label}
              </span>
            );
          })}
        </div>

        <button className={styles.button}>Show more</button>
      </div>
    </div>
  );
}
