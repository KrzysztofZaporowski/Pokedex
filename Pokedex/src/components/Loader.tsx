import styles from "./Loader.module.css";

interface LoaderProps {
  label?: string;
}

export function Loader({ label = "Loading..." }: LoaderProps) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.spinner}></div>
      <p>{label}</p>
    </div>
  );
}
