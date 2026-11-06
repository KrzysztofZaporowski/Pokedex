const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

export interface NamedApiResponse {
  name: string;
  url: string;
}

interface PokeApiListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedApiResponse[];
}

export interface PokemonListItem {
  id: number;
  name: string;
  imageUrl: string;
}

export interface PaginatedPokemonList {
  items: PokemonListItem[];
  totalCount: number;
  totalPages: number;
}

export function extracPokemonId(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  if (!match) {
    throw new Error("Failed to extract Pokémon ID from URL");
  }
  return Number(match[1]);
}

export function getPokemonArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function mapResourceToPokemonItem(
  resource: NamedApiResponse,
): PokemonListItem {
  const id = extracPokemonId(resource.url);
  return {
    id,
    name: resource.name,
    imageUrl: getPokemonArtworkUrl(id),
  };
}

export async function fetchPokemonList(
  page: number,
  limit = 20,
): Promise<PaginatedPokemonList> {
  const offset = (page - 1) * limit;
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch Pokémon list (HTTP ${response.status}): ${response.statusText}`,
    );
  }
  const data: PokeApiListResponse = await response.json();
  return {
    items: data.results.map(mapResourceToPokemonItem),
    totalCount: data.count,
    totalPages: Math.ceil(data.count / limit),
  };
}
