import styles from "./NotFound.module.css";
import Image from "next/image";
import { iconMap } from "@/constants/icons";
import { useRouter } from "next/navigation";

export default function EmptyState({
  onClearFilters,
}: {
  onClearFilters: () => void;
}) {
  const router = useRouter();
  const CrossIcon = iconMap.cross;
  return (
    <div className={styles.wrapper}>
      <Image
        src="/not-found.png"
        alt="No campers"
        width={488}
        height={463}
        className={styles.notfoundimg}
      />
      <h2 className={styles.title}>No campers found</h2>
      <p className={styles.text}>
        We could not find any campers that match your filters. <br />
        Try adjusting your search or clearing some filters.
      </p>
      <div className={styles.buttonGroup}>
        <button onClick={onClearFilters} className={styles.clearBtn}>
          {CrossIcon && <CrossIcon size={20} />}
          Clear filters
        </button>
        <button
          onClick={() => router.push("/catalog")}
          className={styles.viewBtn}
        >
          View all campers
        </button>
      </div>
    </div>
  );
}
