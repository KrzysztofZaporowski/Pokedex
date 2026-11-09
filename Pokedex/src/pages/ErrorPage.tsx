import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export function ErrorPage() {
  return (
    <section className={styles.wrapper}>
      <title>404 - Page Not Found</title>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Wild MissingNo. appeared!</h1>
      <p className={styles.description}>
        The page you are looking for does not exist.
      </p>
      <Link to="/" className={styles.homeLink}>
        Return to Pokédex
      </Link>
    </section>
  );
}
