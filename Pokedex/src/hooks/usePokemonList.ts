import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchPokemonList } from "../api/pokemon";

export function usePokemonList(page: number, limit = 20) {
  return useQuery({
    queryKey: ["pokemonList", page, limit],
    queryFn: () => fetchPokemonList(page, limit),
    placeholderData: keepPreviousData,
  });
}
