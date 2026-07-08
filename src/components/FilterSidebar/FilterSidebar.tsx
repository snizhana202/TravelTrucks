"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./FilterSidebar.module.css";
import { CamperFilters } from "@/types/camper";
import { iconMap } from "@/constants/icons";

interface ApiResponse {
  campers: Array<{
    location: string;
  }>;
}

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

  const [availableLocations, setAvailableLocations] = useState<string[]>([]);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    fetch(`${baseUrl}/campers`)
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        if (data.campers && Array.isArray(data.campers)) {
          const locations = [
            ...new Set(data.campers.map((c) => c.location)),
          ].sort();
          setAvailableLocations(locations);
        }
      })
      .catch((err) => console.error("Error:", err));
  }, []);

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
      const sanitizedValue = value.replace(/[^a-zA-Z\s-,]/g, "");

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
      params.set("location", rawLocation);
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

  const MapIcon = iconMap.map;
  const CrossIcon = iconMap.cross;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.filters}>
        <div className={styles.chooseLocation}>
          <h3 className={styles.title}>Location</h3>
          <div className={styles.inputWrapper}>
            {MapIcon && (
              <MapIcon
                className={`${styles.inputIcon} ${!tempFilters.location ? styles.inactive : ""}`}
              />
            )}
            <input
              type="text"
              placeholder="City"
              value={tempFilters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className={`${styles.locationInput} ${error ? styles.inputError : ""}`}
              list="location-list"
            />
            <datalist id="location-list">
              {availableLocations.map((loc) => (
                <option key={loc} value={loc} />
              ))}
            </datalist>
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
          {CrossIcon && <CrossIcon className={styles.clearIcon} />}
          Clear filters
        </button>
      </div>
    </aside>
  );
}
