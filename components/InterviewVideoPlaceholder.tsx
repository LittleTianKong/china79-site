import Image from "next/image";
import styles from "./InterviewVideoPlaceholder.module.css";

type InterviewVideoPlaceholderProps = {
  label: string;
  seriesLabel?: string;
  variant?: "navy" | "light";
};

export default function InterviewVideoPlaceholder({
  label,
  seriesLabel = "China79 Interviews",
  variant = "navy",
}: InterviewVideoPlaceholderProps) {
  return (
    <div
      className={`${styles.placeholder} ${styles[variant]}`}
      role="img"
      aria-label={`${seriesLabel}: ${label}`}
    >
      <div className={styles.artwork} aria-hidden="true">
        <Image
          className={styles.logo}
          src={variant === "light" ? "/china79-logo.svg" : "/china79-logo-light.svg"}
          alt=""
          width={1338}
          height={328}
        />
        <svg className={styles.frame} viewBox="0 0 800 450" fill="none" focusable="false">
          <path className={styles.corners} d="M32 80V32H80M720 32H768V80M768 370V418H720M80 418H32V370" />
          <path className={styles.leftWave} d="M292 177C270 200 270 250 292 273M266 151C228 189 228 261 266 299M240 125C186 178 186 272 240 325" />
          <path className={styles.rightWave} d="M508 177C530 200 530 250 508 273M534 151C572 189 572 261 534 299M560 125C614 178 614 272 560 325" />
          <path className={styles.rule} d="M336 225H358M442 225H464" />
        </svg>
        <span className={styles.play}>
          <svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
            <path d="M9 5.5 19 12 9 18.5Z" />
          </svg>
        </span>
        <div className={styles.caption}>
          <span className={styles.series}>{seriesLabel}</span>
          <span className={styles.label}>{label}</span>
        </div>
      </div>
    </div>
  );
}
