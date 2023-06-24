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
  const [limit, setLimit] = useState<number>(15);

  const handleTypeChange = (type: string) => {
    setLimit(12);
    setSelectedType(type);
    clearInput();
  };

  const clearInput = () => {
    setSearchPokemon("");
  };

  const { data: filteredData, isLoading: filteredLoading } = useQuery<
    Pokemon[]
  >(
    ["filteredPokemons", searchPokemon],
    async () => {
      const filteredPokemon = pokemonAPI.filteredPokemons(searchPokemon);
      setSelectedType("all");
      return filteredPokemon;
    },
    { enabled: !!searchPokemon }
  );

  const {
    data: filteredByType,
    isLoading: filteredTypeLoading,
    isFetching: filteredTypeFetching,
  } = useQuery<Pokemon[]>(
    ["filteredPokemonsByType", limit, selectedType],
    async () => pokemonAPI.filteredPokemonsByType(limit, selectedType),
    {
      staleTime: Infinity,
      enabled: !!selectedType,
      cacheTime: 1000 * 60 * 30, // 30 minutes
      keepPreviousData: true,
    }
  );

  const loadMorePokemons = () => {
    setLimit((prev) => prev + 5);
  };

  return (
    <>
      <div className="bg-primary h-full pb-10 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row md:justify-between items-center border-b border-zinc-100 pt-2 pb-6 lg:pb-2">
            <img src={logo} alt="Pokemon Logo" height="100%" width="200" />
            <div className="flex flex-col md:flex-row gap-3">
              <span className="text-white font-heading h-full block my-auto text-xs">
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
                  <label htmlFor="searchPokemon" className="hidden">
                    Search Pokemon
                  </label>
                  <input
                    aria-labelledby="searchPokemon"
                    id="searchPokemon"
                    type="text"
                    name="searchPokemon"
                    value={searchPokemon}
                    onChange={(e) => setSearchPokemon(e.target.value)}
                    placeholder="Enter Name of Pokemon"
                    className="bg-transparent outline-none text-white font-heading text-xs py-1 transition duration-300 ease-in-out lg:w-[300px]"
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
            {(filteredData?.length === 0 || filteredByType?.length === 0) && (
              <div className="text-white text-center h-[500px] flex flex-col justify-center items-center">
                <p className="block text-red-400 font-heading text-3xl font-semibold">
                  Sorry no pokemon found!
                </p>
              </div>
            )}
            {(!filteredLoading || !filteredTypeLoading) && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
                  {searchPokemon
                    ? filteredData?.map((pokemon, index) => (
                        <div
                          key={pokemon.id}
                          className={`transition-opacity duration-[500] delay-[${
                            index + 2
                          }00ms] animate-fade-in`}
                        >
                          <PokemonCard pokemon={pokemon} />
                        </div>
                      ))
                    : filteredByType?.map((pokemon, index) => (
                        <div
                          key={pokemon.id}
                          className={`transition-opacity duration-[500] delay-[${
                            index + 2
                          }00s] animate-fade-in`}
                        >
                          <PokemonCard pokemon={pokemon} />
                        </div>
                      ))}
                </div>
                {!filteredLoading && filteredTypeFetching && <BouncingBall />}
                {!searchPokemon && (
                  <div className="w-full flex justify-center mt-10">
                    <button
                      className="px-10 py-3 bg-secondary rounded-md hover:bg-tertiary hover:text-white transition duration-300 ease-in-out"
                      onClick={() => {
                        loadMorePokemons();
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
