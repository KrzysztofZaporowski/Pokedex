import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePokemonList } from "../hooks/usePokemonList";
import { useDebounce } from "../hooks/useDebounce";
import { SearchBar } from "../components/SearchBar";
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
  const selectedType = searchParams.get("type") ?? "";
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 300);

  const { data, isPending, isError, error, refetch, isPlaceholderData } =
    usePokemonList(currentPage, PAGE_LIMIT, selectedType, debouncedSearch);

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

  const handleTypeChange = (newType: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (!newType) {
        next.delete("type");
      } else {
        next.set("type", newType);
      }
      next.delete("page");
      return next;
    });
  };
  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    if (currentPage > 1) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete("page");
        return next;
      });
    }
  };
  const handleClearFilters = () => {
    setSearchInput("");
    setSearchParams({});
  };

  return (
    <section>
      <title>List of Pokémon</title>
      <header className={styles.header}>
        <h1 className={styles.title}>Pokédex</h1>
        {data && (
          <p className={styles.subtitle}>
            Available Pokémon: {data.totalCount}
          </p>
        )}
      </header>

      <SearchBar
        searchValue={searchInput}
        selectedType={selectedType}
        onSearchChange={handleSearchChange}
        onTypeChange={handleTypeChange}
        onClear={handleClearFilters}
      />
      {isPending ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage message={error.message} onRetry={() => refetch()} />
      ) : data.items.length === 0 ? (
        <div className={styles.empty}>
          <h2>No Pokémon found.</h2>
          <p>The chosen criteria did not match any Pokémon.</p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={handleClearFilters}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </section>
  );
}
