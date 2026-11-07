const BASE_URL = "https://pokeapi.co/api/v2";

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

interface PokeApiTypeResponse {
  pokemon: {
    pokemon: NamedApiResponse;
    slot: number;
  }[];
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
  type = "",
  search = "",
): Promise<PaginatedPokemonList> {
  const offset = (page - 1) * limit;
  const normalizedSearch = search.trim().toLowerCase();
  const normalizedType = type.trim().toLowerCase();

  if (!normalizedSearch && !normalizedType) {
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

  let rawResources: NamedApiResponse[];

  if (normalizedType) {
    const response = await fetch(`${BASE_URL}/type/${normalizedType}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch Pokémon list (HTTP ${response.status}): ${response.statusText}`,
      );
    }
    const data: PokeApiTypeResponse = await response.json();
    rawResources = data.pokemon.map((p) => p.pokemon);
  } else {
    const response = await fetch(`${BASE_URL}/pokemon?limit=2000&offset=0`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch Pokémon list (HTTP ${response.status}): ${response.statusText}`,
      );
    }
    const data: PokeApiListResponse = await response.json();
    rawResources = data.results;
  }

  const filteredResources = normalizedSearch
    ? rawResources.filter((item) =>
        item.name.toLowerCase().includes(normalizedSearch),
      )
    : rawResources;

  const totalCount = filteredResources.length;
  const totalPages = Math.ceil(totalCount / limit);
  const pageSlice = filteredResources.slice(offset, offset + limit);

  return {
    items: pageSlice.map(mapResourceToPokemonItem),
    totalCount,
    totalPages,
  };
}
