import classNames from "classnames";
import { Pokemon } from "../../types";

type Props = {
  pokemon: Pokemon;
};

const PokemonCard = ({ pokemon }: Props) => {
  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right top",
    filter: "blur(8px)",
  };

  return (
    <div className="rounded-md shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out hover:scale-110 hover:bg-white h-full">
      <div className="p-4 relative">
        <div
          className="absolute left-0 top-0 w-full h-full transition-opacity duration-500 animate-fade-in"
          style={{
            backgroundImage: `url(${pokemon.image})`,
            ...cardStyle,
          }}
        />
        <img
          src={pokemon.image}
          alt={`${pokemon.name}`}
          className={`mx-auto ${
            pokemon.image === "/ball.png"
              ? "w-14 h-14 m-7"
              : "w-[168px] h-[168px]"
          } relative transition-opacity duration-500 animate-fade-in`}
          loading="lazy"
        />
      </div>
      <div className="p-4 bg-secondary h-full">
        <h2 className="text-sm font-heading capitalize transition-opacity duration-500 text-zinc-800">
          {pokemon.name}
        </h2>
        <div className="mt-3 flex gap-2 flex-wrap">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={classNames(
                "px-3 py-2 rounded-md font-heading font-light text-xs bg-gray-200 transition-opacity duration-500 ",
                {
                  "bg-lime-400": type === "grass",
                  "bg-violet-700 text-white": type === "poison",
                  "bg-red-700 text-white": type === "fire",
                  "bg-sky-700 text-white": type === "water",
                  "bg-green-700 text-white": type === "bug",
                  "bg-yellow-700 text-white": type === "flying",
                  "bg-slate-400": type === "normal",
                  "bg-indigo-500 text-white": type === "psychic",
                  "bg-pink-500 text-white": type === "fairy",
                  "bg-amber-800": type === "ground",
                  "bg-yellow-950 text-white": type === "rock",
                  "bg-yellow-200": type === "electric",
                  "bg-blue-200": type === "ice",
                  "bg-orange-400": type === "fighting",
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
