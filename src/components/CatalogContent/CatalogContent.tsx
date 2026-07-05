"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useCampers } from "@/hooks/useCampers";
import CamperList from "@/components/CamperList/CamperList";
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar";
import styles from "@/components/CatalogContent/CatalogContent.module.css";
import Loader from "@/components/Loader/Loader";
import EmptyState from "@/components/NotFound/NotFount";

export default function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const VALID_FORMS = [
    "alcove",
    "panel_van",
    "integrated",
    "semi_integrated",
  ] as const;
  const VALID_TRANSMISSIONS = ["automatic", "manual"] as const;
  const VALID_ENGINES = ["diesel", "petrol", "hybrid", "electric"] as const;

  const getValidValue = <T extends string>(
    value: string | null,
    validValues: readonly T[],
  ): T | undefined => {
    return validValues.includes(value as T) ? (value as T) : undefined;
  };

  const filters = {
    location: searchParams.get("location") || undefined,
    form: getValidValue(searchParams.get("form"), VALID_FORMS),
    transmission: getValidValue(
      searchParams.get("transmission"),
      VALID_TRANSMISSIONS,
    ),
    engine: getValidValue(searchParams.get("engine"), VALID_ENGINES),
  };

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCampers(filters);
  const campers = data?.pages.flatMap((p) => p.campers) || [];
  const isEmpty = status === "success" && campers.length === 0;

  const handleClearFilters = () => {
    router.push("/catalog");
  };

  if (status === "pending") return <Loader />;

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <FilterSidebar key={searchParams.toString()} />
      </aside>
      <section className={styles.list}>
        {isEmpty ? (
          <EmptyState onClearFilters={handleClearFilters} />
        ) : (
          <CamperList
            campers={campers}
            hasNextPage={!!hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </section>
    </div>
  );
}
