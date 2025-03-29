"use client";

import Right from "@/components/icons/Right";
import Image from "next/image";
import styles from "./Hero.module.css"; // Import CSS module

export default function Hero() {
	return (
		<section className={styles.hero}>
			<div className={styles.container}>
				{/* Text Section */}
				<div className={styles.textSection}>
					<h1 className={styles.title}>
						<span className={styles.highlight}>Pizza</span> and <br />
						friends are <br />
						all we need
					</h1>
					<p className={styles.subtitle}>
						Pizza is the missing piece that makes every day complete, <br />a
						simple yet delicious joy in life.
					</p>
					<div className={styles.buttonGroup}>
						<button className={styles.primaryButton}>
							Order now
							<Right />
						</button>
						<button className={styles.secondaryButton}>
							Learn more
							<Right />
						</button>
					</div>
				</div>

				{/* Image Section */}
				<div className={styles.imageContainer}>
					<Image
						src="/lady.png"
						layout="fill"
						objectFit="contain"
						alt="pizza"
						className={styles.heroImage}
					/>
				</div>
			</div>
		</section>
	);
}
