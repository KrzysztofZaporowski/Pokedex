import { POKEMON_TYPES } from "../api/pokemon.types";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  searchValue: string;
  selectedType: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onClear: () => void;
}

export function SearchBar({
  searchValue,
  selectedType,
  onSearchChange,
  onTypeChange,
  onClear,
}: SearchBarProps) {
  const hastActiveFilter = Boolean(searchValue.trim() || selectedType);

  return (
    <div className={styles.toolbar} role="search">
      <input
        type="search"
        className={styles.searchInput}
        placeholder="Search Pokémon by name..."
        aria-label="Search Pokémon by name..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        className={styles.typeSelect}
        aria-label="Filter Pokemon by type"
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
      >
        <option value="">All types</option>
        {POKEMON_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      {hastActiveFilter && (
        <button type="button" className={styles.clearButton} onClick={onClear}>
          Clear filters
        </button>
      )}
    </div>
  );
}
