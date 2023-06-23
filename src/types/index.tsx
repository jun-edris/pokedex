export interface PokemonType {
  name: string;
}
export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  imageError?: boolean;
}

export interface PokemonTypeApiResponse {
  pokemon: { pokemon: { name: string; url: string } }[];
}
