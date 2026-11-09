import { useState } from "react";
import { Link } from "react-router-dom";
import type { PokemonListItem } from "../api/pokemon";
import { useTeamStore } from "../features/team/useTeamStore";
import { MAX_TEAM_SIZE } from "../features/team/team.types";
import styles from "./PokemonCard.module.css";

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;

  const members = useTeamStore((state) => state.members);
  const addMember = useTeamStore((state) => state.addMember);
  const removeMember = useTeamStore((state) => state.removeMember);

  const isInTeam = members.some((item) => item.id === pokemon.id);
  const isTeamFull = members.length >= MAX_TEAM_SIZE;

  const handleTeamClick = () => {
    if (isInTeam) {
      removeMember(pokemon.id);
    } else {
      addMember(pokemon);
    }
  };

  return (
    <article className={styles.card}>
      <Link to={`/pokemon/${pokemon.name}`} className={styles.cardLink}>
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
      <button
        type="button"
        className={`${styles.teamBtn} ${isInTeam ? styles.teamBtnActive : ""}`}
        onClick={handleTeamClick}
        disabled={!isInTeam && isTeamFull}
      >
        {isInTeam
          ? "Remove from Team"
          : isTeamFull
            ? "Team Full"
            : "Add to Team"}
      </button>
    </article>
  );
}
