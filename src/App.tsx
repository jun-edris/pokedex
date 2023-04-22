import { useState } from "react";
import logo from "./assets/Pokemon-Logo.png";
import { FiSearch, FiX } from "react-icons/fi";
import TypeFilter from "./components/TypeFilter";
import { useQuery } from "react-query";
import { Pokemon } from "./types";
import { pokemonAPI } from "./api/pokemon";
import classNames from "classnames";
import { Analytics } from "@vercel/analytics/react";

const App = (): JSX.Element => {
  const [searchPokemon, setSearchPokemon] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [limit, setLimit] = useState<number>(20);

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

  const {
    data: pokemons,
    isLoading,
    isFetching,
  } = useQuery<Pokemon[]>(
    ["pokemons", limit],
    () => pokemonAPI.getPokemons(limit),
    { keepPreviousData: true }
  );

  return (
    <>
      <div className="bg-primary h-full pb-10 min-h-screen">
        <div className="container mx-auto">
          <div className="flex justify-between items-center border-b border-zinc-100 py-2">
            <img src={logo} alt="Pokemon Logo" height="100%" width="200" />
            <div className="flex items-center gap-3">
              <span className="text-white font-sans">Filters</span>
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSearchPokemon(e.target.value);
                    }}
                    placeholder="Enter Name of Pokemon"
                    className="bg-transparent outline-none text-white text-sm py-1 transition duration-300 ease-in-out"
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
          <div>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                  {pokemons?.map((pokemon) => (
                    <div
                      key={pokemon.id}
                      className="rounded-md shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out"
                    >
                      <div className="bg-slate-300 p-4">
                        <img
                          src={pokemon.image}
                          alt={pokemon.name}
                          className="mx-auto w-32 h-32"
                        />
                      </div>
                      <div className="p-4 bg-quaternary">
                        <h2 className="text-lg font-heading capitalize text-white">
                          {pokemon.name}
                        </h2>
                        {pokemon.types.map((type) => (
                          <span
                            key={type}
                            className={classNames(
                              "text-xs px-2 py-1 rounded-md mr-2 bg-gray-200",
                              {
                                "bg-lime-400": type === "grass",
                                "bg-violet-500 text-white": type === "poison",
                                "bg-red-500 text-white": type === "fire",
                                "bg-sky-500 text-white": type === "water",
                                "bg-green-600 text-white": type === "bug",
                                "bg-yellow-600 text-white": type === "flying",
                                "bg-slate-400 text-white": type === "normal",
                                "bg-indigo-500 text-white": type === "psychic",
                                "bg-pink-500 text-white": type === "fairy",
                                "bg-amber-900 text-white": type === "ground",
                                "bg-yellow-950 text-white": type === "rock",
                                "bg-yellow-300": type === "electric",
                                "bg-blue-200": type === "ice",
                                "bg-orange-400 text-white": type === "fighting",
                                "bg-red-800 text-white": type === "dragon",
                                "bg-gray-900 text-white": type === "dark",
                                "bg-indigo-800 text-white": type === "ghost",
                                "bg-gray-200": type === "ghost",
                              }
                            )}
                            onClick={() => setSelectedType(type)}
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {isFetching && (
                  <p className="text-lg font-bold mt-8 text-white">
                    Fetching more data...
                  </p>
                )}
                {pokemons && pokemons.length >= limit && (
                  <div className="w-full flex justify-center mt-10">
                    <button
                      className="px-10 py-3 bg-secondary rounded-md hover:bg-tertiary hover:text-white transition duration-300 ease-in-out"
                      onClick={() => {
                        setLimit((prevLimit) => prevLimit + 20);
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
