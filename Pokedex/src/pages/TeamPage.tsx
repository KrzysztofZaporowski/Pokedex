import { Link } from "react-router-dom";
import { useTeamStore } from "../features/team/useTeamStore";
import { MAX_TEAM_SIZE } from "../features/team/team.types";
import { PokemonCard } from "../components/PokemonCard";
import styles from "./TeamPage.module.css";

export function TeamPage() {
  const members = useTeamStore((state) => state.members);
  const clearTeam = useTeamStore((state) => state.clearTeam);

  return (
    <section>
      <title>My team | Pokedex</title>

      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            Current Team ({members.length}/{MAX_TEAM_SIZE})
          </h1>
        </div>

        {members.length > 0 && (
          <button type="button" className={styles.clearBtn} onClick={clearTeam}>
            Clear Team
          </button>
        )}

        {members.length === 0 ? (
          <div className={styles.empty}>
            <h2>Your team is empty</h2>
            <p>Go to Pokedex and select up to 6 Pokémon for your squad.</p>
            <Link to="/" className={styles.browseLink}>
              Go to Pokedex
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {members.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </header>
    </section>
  );
}
