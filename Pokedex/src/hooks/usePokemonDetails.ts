import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetails } from "../api/pokemon";

export function usePokemonDetails(name: string) {
  return useQuery({
    queryKey: ["pokemonDetails", name],
    queryFn: () => fetchPokemonDetails(name),
    enabled: Boolean(name),
  });
}
