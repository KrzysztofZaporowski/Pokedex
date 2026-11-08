import type { PokemonListItem } from "../../api/pokemon";

export const MAX_TEAM_SIZE = 6;

export interface SavedTeam {
  id: string;
  name: string;
  description: string;
  members: PokemonListItem[];
  createdAt: string;
}
