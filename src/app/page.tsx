import Link from "next/link";
import styles from "../components/Hero/Hero.module.css";

export default function Home() {
  return (
    <section className={styles.hero}>
      <div className={styles.titleContainer}>
      <h1 className={styles.title}>Campers of your dreams</h1>
      <p className={styles.subtitle}>
        You can find everything you want in our catalog
      </p>
      </div>
      <Link href="/catalog" className={styles.button}>
        View Now
      </Link>
    </section>
  );
}
