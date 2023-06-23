import { useState } from "react";
import logo from "/Pokemon-Logo.png";
import { FiSearch, FiX } from "react-icons/fi";
import TypeFilter from "./components/TypeFilter";
import { useQuery } from "react-query";
import { Pokemon } from "./types";
import { pokemonAPI } from "./api/pokemon";
import { Analytics } from "@vercel/analytics/react";
import BouncingBall from "./components/BouncingBall";
import PokemonCard from "./components/PokemonCard";

const App = (): JSX.Element => {
  const [searchPokemon, setSearchPokemon] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");
  // const [filteredPokemon, setFilteredPokemon] = useState<string>("");
  const [limit, setLimit] = useState<number>(18);

  // const handleSearch = (e: any) => {
  //   setSearchPokemon(e.target.value);
  //   e.preventDefault();
  // };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  const clearInput = () => {
    setSearchPokemon("");
  };

  const { data: initialData, isLoading: initialLoading } = useQuery<Pokemon[]>(
    ["initialPokemons", limit],
    async () => pokemonAPI.getPokemons(limit),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      keepPreviousData: true,
    }
  );

  const { data: filteredData, isLoading: filteredLoading } = useQuery<
    Pokemon[]
  >(
    ["filteredPokemons", searchPokemon],
    async () => pokemonAPI.filteredPokemons(searchPokemon),
    { enabled: !!searchPokemon }
  );

  const { data: filteredByType, isLoading: filteredTypeLoading } = useQuery<
    Pokemon[]
  >(
    ["filteredPokemonsByType", limit, selectedType],
    async () => pokemonAPI.filteredPokemonsByType(limit, selectedType),
    { enabled: !!selectedType }
  );

  console.log(filteredByType);
  return (
    <>
      <div className="bg-primary h-full pb-10 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row md:justify-between items-center border-b border-zinc-100 pt-2 pb-6 lg:pb-2">
            <img src={logo} alt="Pokemon Logo" height="100%" width="200" />
            <div className="flex flex-col md:flex-row gap-3">
              <span className="text-white font-sans h-full block my-auto">
                Filters
              </span>
              <div className="border border-solid rounded-full px-5 py-2 flex items-center relative">
                <TypeFilter
                  selectedType={selectedType}
                  onTypeChange={handleTypeChange}
                />
              </div>
              <div className="border border-solid rounded-full px-3 py-2">
                <div className="flex gap-2 items-center">
                  <FiSearch size={18} className="text-white" />
                  <input
                    type="text"
                    name="searchPokemon"
                    value={searchPokemon}
                    onChange={(e) => setSearchPokemon(e.target.value)}
                    placeholder="Enter Name of Pokemon"
                    className="bg-transparent outline-none text-white text-sm py-1 transition duration-300 ease-in-out lg:w-[250px]"
                  />
                  {searchPokemon && (
                    <FiX
                      size={20}
                      onClick={clearInput}
                      className="transition duration-300 cursor-pointer text-white"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full min-h-full">
            {(initialLoading || filteredLoading) && <BouncingBall />}
            {(!initialLoading || !filteredLoading) && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
                  {searchPokemon
                    ? filteredData?.map((pokemon) => (
                        <div key={pokemon.name}>
                          <PokemonCard pokemon={pokemon} />
                        </div>
                      ))
                    : initialData?.map((pokemon) => (
                        <div key={pokemon.name}>
                          <PokemonCard pokemon={pokemon} />
                        </div>
                      ))}
                </div>
                {!searchPokemon &&
                  initialData &&
                  initialData.length >= limit && (
                    <div className="w-full flex justify-center mt-10">
                      <button
                        className="px-10 py-3 bg-secondary rounded-md hover:bg-tertiary hover:text-white transition duration-300 ease-in-out"
                        onClick={() => {
                          setLimit((prevLimit) => prevLimit + 8);
                        }}
                      >
                        Show More
                      </button>
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      </div>
      <Analytics />
    </>
  );
};

export default App;
