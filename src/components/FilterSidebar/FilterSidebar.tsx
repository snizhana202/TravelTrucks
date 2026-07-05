"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./FilterSidebar.module.css";
import Image from "next/image";
import { CamperFilters } from "@/types/camper";

const FORMS = [
  { label: "Alcove", value: "alcove" },
  { label: "Panel Van", value: "panel_van" },
  { label: "Integrated", value: "integrated" },
  { label: "Semi Integrated", value: "semi_integrated" },
];

const ENGINES = [
  { label: "Diesel", value: "diesel" },
  { label: "Petrol", value: "petrol" },
  { label: "Hybrid", value: "hybrid" },
  { label: "Electric", value: "electric" },
];

const TRANSMISSIONS = [
  { label: "Automatic", value: "automatic" },
  { label: "Manual", value: "manual" },
];

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tempFilters, setTempFilters] = useState<CamperFilters>({
    location: searchParams.get("location") ?? "",
    form: (searchParams.get("form") as CamperFilters["form"]) || undefined,
    engine:
      (searchParams.get("engine") as CamperFilters["engine"]) || undefined,
    transmission:
      (searchParams.get("transmission") as CamperFilters["transmission"]) ||
      undefined,
  });

  const [error, setError] = useState("");

  const handleFilterChange = (key: keyof CamperFilters, value: string) => {
    if (key === "location") {
      let sanitizedValue = value.replace(/[^a-zA-Z\s-,]/g, "");

      if (/^[\s-,]/.test(sanitizedValue)) {
        sanitizedValue = sanitizedValue.slice(1);
      }

      sanitizedValue = sanitizedValue.replace(
        /[\s-]{2,}/g,
        (match) => match[0],
      );

      setTempFilters((prev) => ({ ...prev, [key]: sanitizedValue }));
      setError("");
    } else {
      setTempFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    const rawLocation = tempFilters.location?.trim() || "";

    if (rawLocation) {
      const city = rawLocation.split(",")[0].trim();
      const formattedLocation =
        city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

      params.set("location", formattedLocation);
    }
    if (tempFilters.form) params.set("form", tempFilters.form);
    if (tempFilters.engine) params.set("engine", tempFilters.engine);
    if (tempFilters.transmission)
      params.set("transmission", tempFilters.transmission);

    router.push(`/catalog?${params.toString()}`);
  };

  const clearFilters = () => {
    setTempFilters({
      location: "",
      form: undefined,
      engine: undefined,
      transmission: undefined,
    });
    router.push("/catalog");
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.filters}>
        <div className={styles.chooseLocation}>
          <h3 className={styles.title}>Location</h3>
          <div className={styles.inputWrapper}>
            <Image
              src={
                tempFilters.location ? "/icons/map.svg" : "/icons/map-gray.svg"
              }
              alt="Location Icon"
              width={24}
              height={24}
              className={styles.inputIcon}
            />
            <input
              type="text"
              placeholder="City"
              value={tempFilters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className={`${styles.locationInput} ${error ? styles.inputError : ""}`}
            />
          </div>
          {error && <span className={styles.errorMessage}>{error}</span>}
        </div>

        <div className={styles.filterGroup}>
          <h2 className={styles.maintitle}>Filters</h2>

          <div className={styles.section}>
            <h3 className={styles.title}>Camper form</h3>
            <div className={styles.radioGroupColumn}>
              {FORMS.map((f) => (
                <label key={f.value} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="form"
                    value={f.value}
                    checked={tempFilters.form === f.value}
                    onChange={() => handleFilterChange("form", f.value)}
                  />
                  <span className={styles.labelText}>{f.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.title}>Engine</h3>
            <div className={styles.radioGroupColumn}>
              {ENGINES.map((e) => (
                <label key={e.value} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="engine"
                    value={e.value}
                    checked={tempFilters.engine === e.value}
                    onChange={() => handleFilterChange("engine", e.value)}
                  />
                  <span className={styles.labelText}>{e.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.title}>Transmission</h3>
            <div className={styles.radioGroupColumn}>
              {TRANSMISSIONS.map((t) => (
                <label key={t.value} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="transmission"
                    value={t.value}
                    checked={tempFilters.transmission === t.value}
                    onChange={() => handleFilterChange("transmission", t.value)}
                  />
                  <span className={styles.labelText}>{t.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button onClick={applyFilters} className={styles.searchBtn}>
          Search
        </button>
        <button onClick={clearFilters} className={styles.clearBtn}>
          <Image
            src="/icons/close.svg"
            alt="Clear"
            className={styles.clearIcon}
            width={24}
            height={24}
          />
          Clear filters
        </button>
      </div>
    </aside>
  );
}
