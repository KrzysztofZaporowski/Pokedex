import { useSearchParams } from "react-router-dom";
import { usePokemonList } from "../hooks/usePokemonList";
import { PokemonCard } from "../components/PokemonCard";
import { Pagination } from "../components/Pagination";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";
import styles from "./ListPage.module.css";

const PAGE_LIMIT = 20;

export function ListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = Number(searchParams.get("page") ?? "1");
  const currentPage =
    Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;

  const { data, isPending, isError, error, refetch, isPlaceholderData } =
    usePokemonList(currentPage, PAGE_LIMIT);

  const handlePageChange = (nextPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (nextPage <= 1) {
        next.delete("page");
      } else {
        next.set("page", String(nextPage));
      }
      return next;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isPending) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorMessage message={error.message} onRetry={() => refetch()} />;
  }

  if (data.items.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2>No Pokémon found.</h2>
        <p>The chosen criteria did not match any Pokémon.</p>
        <button
          type="button"
          className={styles.resetBtn}
          onClick={() => handlePageChange(1)}
        >
          Return to the first page
        </button>
      </div>
    );
  }
  return (
    <section>
      <title>List of Pokémon</title>
      <header className={styles.header}>
        <h1 className={styles.title}>Pokédex</h1>
        <p className={styles.subtitle}>Available Pokémon: {data.totalCount}</p>
      </header>
      <div
        className={`${styles.grid} ${isPlaceholderData ? styles.gridFetching : ""}`}
      >
        {data.items.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
        disabled={isPlaceholderData}
      />
    </section>
  );
}
