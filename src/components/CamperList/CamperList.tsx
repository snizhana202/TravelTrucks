import CamperCard from "../CamperCard/CamperCard";
import { Camper } from "@/types/camper";
import styles from "./CamperList.module.css";

interface CamperListProps {
  campers: Camper[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

export default function CamperList({
  campers,
  hasNextPage,
  fetchNextPage,
}: CamperListProps) {
  return (
    <div className={styles.list}>
      {campers.map((camper) => (
        <CamperCard key={camper.id} camper={camper} />
      ))}

      {hasNextPage && (
        <div className={styles.buttonWrapper}>
          <button
            onClick={() => fetchNextPage()}
            className={styles.loadMoreBtn}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
