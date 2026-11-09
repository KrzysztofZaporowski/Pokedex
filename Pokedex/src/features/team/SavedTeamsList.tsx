import { Link } from "react-router-dom";
import { useTeamStore } from "./useTeamStore";
import styles from "./SavedTeamsList.module.css";

export function SavedTeamsList() {
  const savedTeams = useTeamStore((state) => state.savedTeams);
  const deleteSavedTeam = useTeamStore((state) => state.deleteSavedTeam);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Saved Teams ({savedTeams.length})</h2>

      {savedTeams.length === 0 ? (
        <div className={styles.emptySaved}>
          <p>
            You have not saved any teams yet. Build a squad above and save it!
          </p>
        </div>
      ) : (
        <div className={styles.list}>
          {savedTeams.map((team) => (
            <article key={team.id} className={styles.teamCard}>
              <div className={styles.teamHeader}>
                <div>
                  <h3 className={styles.teamName}>{team.name}</h3>
                  <p className={styles.teamDescription}>{team.description}</p>
                </div>

                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => deleteSavedTeam(team.id)}
                >
                  Delete
                </button>
              </div>

              <div className={styles.membersRow}>
                {team.members.map((pokemon) => (
                  <Link
                    key={pokemon.id}
                    to={`/pokemon/${pokemon.name}`}
                    className={styles.memberChip}
                  >
                    <img
                      src={pokemon.imageUrl}
                      alt={pokemon.name}
                      width={64}
                      height={64}
                      loading="lazy"
                      className={styles.memberImg}
                    />
                    <span className={styles.memberName}>{pokemon.name}</span>
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
