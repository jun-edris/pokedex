import axios from "axios";
import { Pokemon } from "../types";
import ball from "/ball.png";

interface ApiResponse {
  results: { name: string }[];
  pokemon: Pokemon[];
}

const imgResponse = async (imageUrl: string) =>
  await axios.get(imageUrl).catch(() => {
    return false;
  });

const pokemonAPI = {
  fetchPokemonTypes: async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    return response.data.results.map((result: any, index: number) => ({
      id: index + 1,
      name: result.name,
    }));
  },
  filteredPokemons: async (searchPokemon: string): Promise<Pokemon[]> => {
    const response = await axios.get<ApiResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`
    );

    const pokemonList = await Promise.all(
      response.data.results
        .filter((pokemon: any) =>
          pokemon.name.includes(searchPokemon.toLowerCase())
        )
        .map(async (result) => {
          const pokemonResponse = await axios.get<{
            id: number;
            types: { type: { name: string } }[];
          }>(`https://pokeapi.co/api/v2/pokemon/${result.name}`);

          let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonResponse.data.id}.png`;

          const imgExist = await imgResponse(imageUrl);

          return {
            id: pokemonResponse.data.id,
            name: result.name,
            image: imgExist ? imageUrl : ball,
            types: pokemonResponse.data.types.map((type) => type.type.name),
          };
        })
    );

    return pokemonList;
  },
  filteredPokemonsByType: async (
    limit: number,
    selectedType: string
  ): Promise<Pokemon[]> => {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;
    if (selectedType !== "all") {
      url = `https://pokeapi.co/api/v2/type/${selectedType}`;
    }

    const response = await axios.get<ApiResponse>(url);

    const filteredResponse =
      selectedType !== "all"
        ? response.data.pokemon.slice(0, limit)
        : response.data.results;

    const pokemonList = await Promise.all(
      filteredResponse.map(async (result: any) => {
        const filteredResult =
          selectedType !== "all" ? result.pokemon.name : result.name;

        const pokemonResponse = await axios.get<{
          id: number;
          types: { type: { name: string } }[];
        }>(`https://pokeapi.co/api/v2/pokemon/${filteredResult}`);

        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonResponse.data.id}.png`;

        const imgExist = await imgResponse(imageUrl);

        return {
          id: pokemonResponse.data.id,
          name: filteredResult,
          image: imgExist ? imageUrl : ball,
          types: pokemonResponse.data.types.map((type) => type.type.name),
        };
      })
    );

    return pokemonList;
  },
};

export { pokemonAPI };
