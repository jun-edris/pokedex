import axios from "axios";
import { Pokemon } from "../types";

interface ApiResponse {
  results: { name: string }[];
}

const pokemonAPI = {
  fetchPokemonTypes: async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    return response.data.results.map((result: any, index: number) => ({
      id: index + 1,
      name: result.name,
    }));
  },
  getPokemons: async (limit: number): Promise<Pokemon[]> => {
    const response = await axios.get<ApiResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    );

    const pokemonList = await Promise.all(
      response.data.results.map(async (result) => {
        const pokemonResponse = await axios.get<{
          id: number;
          types: { type: { name: string } }[];
        }>(`https://pokeapi.co/api/v2/pokemon/${result.name}`);

        return {
          id: pokemonResponse.data.id,
          name: result.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonResponse.data.id}.png`,
          types: pokemonResponse.data.types.map((type) => type.type.name),
        };
      })
    );

    return pokemonList;
  },
};

export { pokemonAPI };
