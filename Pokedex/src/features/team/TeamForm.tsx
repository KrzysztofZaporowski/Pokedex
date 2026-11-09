import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTeamStore } from "./useTeamStore";
import { teamFormSchema, type TeamFormValues } from "./team.schema";
import styles from "./TeamForm.module.css";
import { MAX_TEAM_SIZE } from "./team.types";

export function TeamForm() {
  const members = useTeamStore((state) => state.members);
  const saveTeam = useTeamStore((state) => state.saveTeam);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TeamFormValues>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (values: TeamFormValues) => {
    if (members.length === 0) {
      setError("root", {
        message: "Please select at least one Pokémon for your team",
      });
      return;
    }
    if (members.length > MAX_TEAM_SIZE) {
      setError("root", {
        message: `You can only have a maximum of ${MAX_TEAM_SIZE} Pokémon in your team`,
      });
      return;
    }
    saveTeam(values.name, values.description);
    reset();
    clearErrors();
  };

  return (
    <form
      className={styles.formCard}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h2 className={styles.formTitle}>Save Current Team</h2>
      <p className={styles.formSubtitle}>
        Give your squad a name and short strategy description ({members.length}/
        {MAX_TEAM_SIZE} Pokémon selected).
      </p>

      {errors.root && (
        <div className={styles.rootError} role="alert">
          {errors.root.message}
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="team-name" className={styles.label}>
          Team Name *
        </label>
        <input
          id="team-name"
          type="text"
          placeholder="e.g. Kanto Fire Strikers"
          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
          {...register("name")}
        />
        {errors.name && (
          <p className={styles.errorText} role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="team-description" className={styles.label}>
          Description / Strategy *
        </label>
        <textarea
          id="team-description"
          placeholder="Describe your team's role, synergy or favorite moves..."
          className={`${styles.textarea} ${errors.description ? styles.inputError : ""}`}
          {...register("description")}
        />
        {errors.description && (
          <p className={styles.errorText} role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      <button type="submit" className={styles.submitBtn}>
        Save Team
      </button>
    </form>
  );
}
