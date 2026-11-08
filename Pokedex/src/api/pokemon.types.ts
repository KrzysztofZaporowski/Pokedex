export const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;

export interface PokemonStat {
  name: string;
  value: number;
}

export interface PokemonDetails {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  heightInMeters: number;
  weightInKilograms: number;
  abilities: string[];
  stats: PokemonStat[];
}
