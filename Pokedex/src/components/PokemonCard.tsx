import { useState } from "react";
import { Link } from "react-router-dom";
import type { PokemonListItem } from "../api/pokemon";
import styles from "./PokemonCard.module.css";

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;

  return (
    <Link to={`/pokemon/${pokemon.name}`} className={styles.card}>
      <span className={styles.number}>{formattedId}</span>

      {hasImageError ? (
        <div className={styles.placeholder}>Image not found</div>
      ) : (
        <img
          src={pokemon.imageUrl}
          alt={pokemon.name}
          width={140}
          height={140}
          loading="lazy"
          decoding="async"
          className={styles.image}
          onError={() => setHasImageError(true)}
        />
      )}
      <h2 className={styles.name}>{pokemon.name}</h2>
    </Link>
  );
}
