import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchPokemonList } from "../api/pokemon";

export function usePokemonList(
  page: number,
  limit = 20,
  type = "",
  search = "",
) {
  return useQuery({
    queryKey: ["pokemonList", page, limit, type, search],
    queryFn: () => fetchPokemonList(page, limit, type, search),
    placeholderData: keepPreviousData,
  });
}
