import Image from "next/image";
import styles from "./DatasetCover.module.css";

type DatasetCoverProps = {
  title: string;
  seriesLabel: string;
  periodLabel: string;
};

export default function DatasetCover({
  title,
  seriesLabel,
  periodLabel,
}: DatasetCoverProps) {
  return (
    <div className={styles.cover} aria-hidden="true">
      <div className={styles.sheet}>
        <div className={styles.masthead}>
          <Image
            className={styles.logo}
            src="/china79-logo-light.svg"
            alt=""
            width={1338}
            height={328}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.series}>{seriesLabel}</div>
          <div className={styles.title}>{title}</div>
          <div className={styles.period}>{periodLabel}</div>
        </div>

        <svg
          className={styles.archive}
          viewBox="0 0 240 116"
          fill="none"
          focusable="false"
        >
          <path
            className={styles.archiveRules}
            d="M28 20H212M28 45H212M28 70H212M28 95H212M67 20V95M120 20V95M173 20V95"
          />
          <path className={styles.redBracket} d="M45 6H10V109H45" />
          <path className={styles.paleBracket} d="M195 6H230V109H195" />
        </svg>

        <div className={styles.credit}>
          <span className={styles.author}>Michael C. Rhind-Tutt</span>
          <span className={styles.publisher}>China79 Initiative</span>
        </div>
      </div>
    </div>
  );
}
