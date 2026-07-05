import { fetchCamperById, fetchReviewsByCamperId } from "@/services/api";
import { notFound } from "next/navigation";
import { iconMap } from "@/constants/icons";
import styles from "./page.module.css";
import Gallery from "@/components/Gallery/Gallery";
import VehicleDetails from "@/components/VehicleDetails/VehicleDetails";
import { ReviewsList } from "@/components/ReviewsList/ReviewsList";
import { BookingForm } from "@/components/BookingForm/BookingForm";

export default async function CamperDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const [camper, reviews] = await Promise.all([
    fetchCamperById(id),
    fetchReviewsByCamperId(id),
  ]);

  if (!camper) {
    notFound();
  }

  const StarIcon = iconMap.star;
  const MapIcon = iconMap.map;

  return (
    <main className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.galleryWrapper}>
          <Gallery images={camper.gallery} />
        </div>

        <div className={styles.infoWrapper}>
          <div className={styles.upperInfo}>
            <h1 className={styles.title}>{camper.name}</h1>

            <div className={styles.infoRow}>
              <div className={styles.rating}>
                {StarIcon && (
                  <StarIcon className={styles.icon} color="#ffc531" />
                )}
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
      </div>

      <section className={styles.bookingSection}>
        <h2 className={styles.title}>Reviews</h2>
        <div className={styles.lowerInfo}>
          <div className={styles.reviewsColumn}>
            <ReviewsList reviews={reviews} />
          </div>
          <div className={styles.formColumn}>
            <BookingForm camperId={id} />
          </div>
        </div>
      </section>
    </main>
  );
}
