"use client";

import styles from "./Loader.module.css";
import { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className={styles.overlay}>
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.text}>Loading tracks...</p>
        <p className={styles.subText}>
          Please wait while we fetch the best travel trucks for you
        </p>
      </div>
    </div>
  );
}
