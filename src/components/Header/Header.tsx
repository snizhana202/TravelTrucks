"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        <Image
          src="/logo.svg"
          alt="TravelTrucks Logo"
          width={136}
          height={16}
          priority
        />
      </Link>
      <nav className={styles.nav}>
        <Link
          href="/"
          className={`${styles.navLink} ${pathname === "/" ? styles.active : ""}`}
        >
          Home
        </Link>
        <Link
          href="/catalog"
          className={`${styles.navLink} ${pathname === "/catalog" ? styles.active : ""}`}
        >
          Catalog
        </Link>
      </nav>
    </header>
  );
}
