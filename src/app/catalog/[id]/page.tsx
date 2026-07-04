import { fetchCamperById } from "@/services/api";
import { notFound } from "next/navigation";
import { iconMap } from "@/constants/icons";
import styles from "./page.module.css";
import Gallery from "@/components/Gallery/Gallery";
import VehicleDetails from "@/components/VehicleDetails/VehicleDetails";
export default async function CamperDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const camper = await fetchCamperById(id);
  if (!camper) {
    notFound();
  }

  const StarIcon = iconMap.star;
  const MapIcon = iconMap.map;

  return (
    <main className={styles.container}>
      <Gallery images={camper.gallery} />

      <div className={styles.infoWrapper}>
        <div className={styles.upperInfo}>
          <h1 className={styles.title}>{camper.name}</h1>

          <div className={styles.infoRow}>
            <div className={styles.rating}>
              {StarIcon && <StarIcon className={styles.icon} color="#ffc531" />}
              <span>
                {camper.rating} ({camper.reviews} Reviews)
              </span>
            </div>
            <div className={styles.location}>
              <MapIcon className={styles.icon} />
              <span>{camper.location}</span>
            </div>
          </div>

          <p className={styles.price}>€{camper.price.toFixed(2)}</p>

          <p className={styles.description}>{camper.description}</p>
        </div>
        <div className={styles.upperInfo}>
          <VehicleDetails camper={camper} />
        </div>
      </div>
    </main>
  );
}
