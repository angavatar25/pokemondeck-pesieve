"use client"

import { useState } from "react";
import PokemonCard from "./PokemonCard";
import PokemonCardComparison from "./PokemonCardComparison";

const PokemonComparison = ({ pokemonList, closeModalComparison, show, onClickLink }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(pokemonList.pokemons.results);
  const handleResult = (event) => {
    const { value } = event.target;
    setSearchValue(value);

    const searchRes = pokemonList.pokemons.results.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (value.length > 0) {
      setSearchResult(searchRes);
    } else {
      setSearchResult(pokemonList.pokemons.results)
    }
  };

  return (
    <>    
      {show ? (
        <div className="bg-black w-full min-h-screen fixed">
          <button
            onClick={closeModalComparison}
            className="absolute right-10 top-10"
          >Close</button>
          <div className="flex justify-center items-center w-full h-screen">
            <div className="p-5 bg-gray-600 max-w-[500px] max-h-[350px] overflow-scroll w-full opacity-100">
              <p className="text-xl mb-4">Choose Pokemon</p>
              <input
                type="text"
                placeholder="Input pokemon name"
                className="w-full leading-10 pl-3 rounded-md mb-3 text-black focus:outline-none"
                onChange={handleResult}
                value={searchValue}
              />
              <div className="grid grid-cols-4">
                {pokemonList.pokemons && pokemonList.pokemons.results.length > 0 ? (
                  searchResult.map((pokemon) => (
                    <PokemonCardComparison
                      key={`pokemon-${pokemon.name}`}
                      name={pokemon.name}
                      image={pokemon.image}
                      onClickComparison={() => onClickLink(pokemon.name)}
                    />
                  ))
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default PokemonComparison;