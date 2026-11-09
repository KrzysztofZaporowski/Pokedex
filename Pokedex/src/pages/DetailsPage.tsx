import { useParams, useNavigate } from "react-router-dom";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";
import { useTeamStore } from "../features/team/useTeamStore";
import { MAX_TEAM_SIZE } from "../features/team/team.types";
import styles from "./DetailsPage.module.css";

const MAX_BASE_STAT = 255;

export function DetailsPage() {
  const { name = "" } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const {
    data: pokemon,
    isPending,
    isError,
    error,
    refetch,
  } = usePokemonDetails(name);

  const members = useTeamStore((state) => state.members);
  const addMember = useTeamStore((state) => state.addMember);
  const removeMember = useTeamStore((state) => state.removeMember);

  if (isPending) {
    return <Loader label={`Loading ${name}...`} />;
  }

  if (isError) {
    return (
      <div className={styles.container}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate("/")}
        >
          ← Back to Pokédex
        </button>
        <ErrorMessage message={error.message} onRetry={() => refetch()} />
      </div>
    );
  }

  const formattedId = `${String(pokemon.id).padStart(3, "0")}`;

  const isInTeam = members.some((item) => item.id === pokemon.id);
  const isTeamFull = members.length >= MAX_TEAM_SIZE;

  const handleTeamToggle = () => {
    if (isInTeam) {
      removeMember(pokemon.id);
    } else {
      addMember({
        id: pokemon.id,
        name: pokemon.name,
        imageUrl: pokemon.imageUrl,
      });
    }
  };

  return (
    <article className={styles.container}>
      <title>{`${pokemon.name} | Pokedex`}</title>

      <button
        type="button"
        className={styles.backBtn}
        onClick={() => navigate(-1)}
      >
        Back to list
      </button>
      <div className={styles.card}>
        <div className={styles.hero}>
          <div className={styles.imageWrapper}>
            <img
              src={pokemon.imageUrl}
              alt={pokemon.name}
              width={200}
              height={200}
              className={styles.image}
            />
          </div>

          <div>
            <span className={styles.number}>{formattedId}</span>
            <h1 className={styles.name}>{pokemon.name}</h1>

            <div className={styles.types}>
              {pokemon.types.map((type) => (
                <span key={type} className={styles.typeBadge}>
                  {type}
                </span>
              ))}
            </div>

            <div className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Height</span>
                <span className={styles.metaValue}>
                  {pokemon.heightInMeters} m
                </span>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Weight</span>
                <span className={styles.metaValue}>
                  {pokemon.weightInKilograms} kg
                </span>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Abilities</span>
                <span className={styles.metaValue}>
                  {pokemon.abilities.join(", ")}
                </span>
              </div>
            </div>
            <button
              type="button"
              className={`${styles.teamActionBtn} ${isInTeam ? styles.teamActionBtnRemove : ""}`}
              disabled={!isInTeam && isTeamFull}
              onClick={handleTeamToggle}
            >
              {isInTeam
                ? "Remove from team"
                : isTeamFull
                  ? "Team is full"
                  : "Add to team"}
            </button>
          </div>
        </div>
        <section className={styles.statsSection}>
          <h2 className={styles.sectionTitle}>Base Stats</h2>
          <div className={styles.statsList}>
            {pokemon.stats.map((stat) => {
              const percentage = Math.min(
                100,
                Math.round((stat.value / MAX_BASE_STAT) * 100),
              );

              return (
                <div key={stat.name} className={styles.statRow}>
                  <span className={styles.statName}>
                    {stat.name.replace("-", " ")}
                  </span>
                  <span className={styles.statValue}>{stat.value}</span>
                  <div className={styles.statTrack}>
                    <div
                      className={styles.statFill}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </article>
  );
}
