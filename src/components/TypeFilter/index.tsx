import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useQuery } from "react-query";
import { PokemonType } from "../../types";
import { pokemonAPI } from "../../api/pokemon";

interface Props {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const TypeFilter: React.FC<Props> = ({ selectedType, onTypeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: pokemonTypes = [], isLoading } = useQuery<PokemonType[]>(
    "pokemonTypes",
    pokemonAPI.fetchPokemonTypes
  );

  const handleTypeClick = (type: string) => {
    onTypeChange(type);
    setIsOpen(false);
  };
  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={selectedType}
        readOnly
        className="bg-transparent outline-none text-white font-heading text-xs capitalize w-full"
        onClick={handleInputClick}
        placeholder={selectedType ? "" : "Select a type"}
      />
      <FiChevronDown
        size={20}
        className="text-white"
        onClick={handleInputClick}
      />
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white top-12 left-0 shadow-lg"
        >
          {isLoading ? (
            <li>Loading...</li>
          ) : (
            <ul className="h-[300px] overflow-y-auto font-heading text-xs">
              <li
                className="cursor-pointer py-2 px-3 text-sm hover:bg-quaternary border-b last:border-b-0 hover:text-white flex items-center capitalize"
                onClick={() => handleTypeClick("all")}
              >
                all
              </li>
              {pokemonTypes.map((type) => (
                <li
                  key={type.name}
                  className="cursor-pointer py-2 px-3 text-sm hover:bg-quaternary border-b last:border-b-0 hover:text-white flex items-center capitalize"
                  onClick={() => handleTypeClick(type.name)}
                >
                  {type.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TypeFilter;
