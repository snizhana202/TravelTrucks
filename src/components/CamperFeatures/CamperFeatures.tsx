import styles from "./CamperFeatures.module.css";
import { iconMap } from "@/constants/icons";
import { Camper } from "@/types/camper";

interface Props {
  camper: Pick<Camper, "transmission" | "engine" | "form" | "amenities">;
  showIcons?: boolean;
  limit?: number;
}

export default function CamperFeatures({
  camper,
  showIcons = true,
  limit,
}: Props) {
  const features = [
    { key: "transmission", label: camper.transmission },
    { key: "engine", label: camper.engine },
    { key: "form", label: camper.form },
    ...camper.amenities.map((amenity) => ({ key: amenity, label: amenity })),
  ];

  const displayFeatures = limit ? features.slice(0, limit) : features;

  return (
    <ul className={styles.list}>
      {displayFeatures.map(({ key, label }) => {
        const Icon = showIcons
          ? iconMap[label as keyof typeof iconMap] ||
            iconMap[key as keyof typeof iconMap]
          : null;
        return (
          <li key={key} className="tag">
            {Icon && <Icon className={styles.icon} />}
            <span>{label.replace("_", " ")}</span>
          </li>
        );
      })}
    </ul>
  );
}
