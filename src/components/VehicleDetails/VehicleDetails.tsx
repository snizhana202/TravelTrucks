import styles from "./VehicleDetails.module.css";
import { Camper } from "@/types/camper";
import CamperFeatures from "@/components/CamperFeatures/CamperFeatures";

export default function VehicleDetails({ camper }: { camper: Camper }) {
  const details = [
    { label: "Form", value: camper.form },
    { label: "Length", value: camper.length },
    { label: "Width", value: camper.width },
    { label: "Height", value: camper.height },
    { label: "Tank", value: camper.tank },
    { label: "Consumption", value: camper.consumption },
  ];

  return (
    <div>
      <h3 className={styles.title}>Vehicle details</h3>
      <CamperFeatures camper={camper} showIcons={false} />
      <hr className={styles.divider} />
      <ul className={styles.list}>
        {details.map(({ label, value }) => (
          <li key={label} className={styles.item}>
            <span>{label}</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
