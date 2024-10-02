"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "../styles/layout.module.css";

export const Nav = () => {
	const pathname = usePathname();

	return (
		<nav className={styles.nav}>
			<Link
				className={`${styles.link} ${
					pathname === "pages/board" ? styles.active : ""
				}`}
				href="/pages/board"
			>
				Home
			</Link>
			|
			<Link
				className={`${styles.link} ${
					pathname === "pages/quotes" ? styles.active : ""
				}`}
				href="/pages/quotes"
			>
				Quotes
			</Link>
		</nav>
	);
};
