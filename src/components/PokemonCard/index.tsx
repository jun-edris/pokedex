import classNames from "classnames";
import { Pokemon } from "../../types";
import ball from "/ball.png";

type Props = {
  pokemon: Pokemon;
};

const PokemonCard = ({ pokemon }: Props) => {
  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right bottom",
    filter: "blur(10px)",
  };

  return (
    <div className="rounded-md shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out hover:scale-105 h-full">
      <div className="p-4 relative">
        <div
          className="absolute left-0 top-0 w-full h-full"
          style={{
            backgroundImage: `url(${
              !pokemon.imageError ? pokemon.image : ball
            })`,
            ...cardStyle,
          }}
        />

        <img
          src={!pokemon.imageError ? pokemon.image : ball}
          alt={`Image of ${pokemon.name}`}
          className={`mx-auto w-28 h-28 relative z-10`}
        />
      </div>
      <div className="p-4 bg-secondary h-full">
        <h2 className="text-sm font-heading capitalize">{pokemon.name}</h2>
        <div className="mt-3">
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
                  "bg-amber-800 text-black": type === "ground",
                  "bg-yellow-950 text-white": type === "rock",
                  "bg-yellow-300": type === "electric",
                  "bg-blue-200": type === "ice",
                  "bg-orange-400 text-white": type === "fighting",
                  "bg-red-800 text-white": type === "dragon",
                  "bg-gray-900 text-white": type === "dark",
                  "bg-indigo-800 text-white": type === "ghost",
                }
              )}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
