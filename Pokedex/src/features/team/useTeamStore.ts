import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PokemonListItem } from "../../api/pokemon";
import { MAX_TEAM_SIZE, type SavedTeam } from "./team.types";

interface TeamStoreState {
  members: PokemonListItem[];
  savedTeams: SavedTeam[];

  addMember: (pokemon: PokemonListItem) => void;
  removeMember: (pokemonId: number) => void;
  clearTeam: () => void;

  saveTeam: (name: string, description: string) => void;
  deleteSavedTeam: (teamId: string) => void;
}

export const useTeamStore = create<TeamStoreState>()(
  persist(
    (set) => ({
      members: [],
      savedTeams: [],

      addMember: (pokemon) =>
        set((state) => {
          const alreadyInTeam = state.members.some(
            (item) => item.id === pokemon.id,
          );
          if (state.members.length >= MAX_TEAM_SIZE || alreadyInTeam) {
            return state;
          }
          return {
            members: [...state.members, pokemon],
          };
        }),

      removeMember: (pokemonId) =>
        set((state) => ({
          members: state.members.filter((item) => item.id !== pokemonId),
        })),

      clearTeam: () => set({ members: [] }),

      saveTeam: (name, description) =>
        set((state) => {
          if (state.members.length === 0) {
            return state;
          }
          const newTeam: SavedTeam = {
            id: crypto.randomUUID(),
            name: name.trim(),
            description: description.trim(),
            members: state.members,
            createdAt: new Date().toISOString(),
          };
          return {
            savedTeams: [newTeam, ...state.savedTeams],
            members: [],
          };
        }),

      deleteSavedTeam: (teamId) =>
        set((state) => ({
          savedTeams: state.savedTeams.filter((team) => team.id !== teamId),
        })),
    }),
    {
      name: "pokedex-team-storage",
    },
  ),
);
