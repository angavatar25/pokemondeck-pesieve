'use client'

import Link from "next/link";

import { useState } from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { pokemonDetailQuery as query, pokemonListQuery } from "@/query/gqlQuery";

import PokemonComparison from "@/components/PokemonComparison";
import PokemonDataCard from "@/components/PokemonDataCard";

import { fetchPokemonCompareData } from "../../../hooks/fetchPokemonCompareData";

const PokemonDetail = ({ searchParams }) => {
  const [modalComparison, setModalComparison] = useState(false);
  const [pokemonCompareName, setPokemonCompareName] = useState('');
  const [pokemonCompareData, setPokemonCompareData] = useState(null);
  const { name } = searchParams;

  const loadPokemonDetail = useSuspenseQuery(query, { variables: { name }});
  const { data: pokemonList } = useSuspenseQuery(pokemonListQuery, { variables: { limit: 60 } });

  const { pokemon } = loadPokemonDetail.data;

  const handleRedirect = async (selected) => {
    if (selected) {
      setPokemonCompareName(selected);

      const pokemonCompareData = await fetchPokemonCompareData(selected);
      
      setPokemonCompareData(pokemonCompareData);
      setModalComparison(false);
    }
  }
  return (
    <>
      <PokemonComparison
        show={modalComparison}
        closeModalComparison={() => setModalComparison(!modalComparison)}
        pokemonList={pokemonList}
        onClickLink={handleRedirect}
      />
      <div className="grid grid-rows-3 grid-flow-col gap-4 h-screen">
        <div className="row-span-3 flex flex-col justify-center items-center gap-4">
          <img
            src={pokemon.sprites && pokemon.sprites.front_default}
            className="w-52"
            alt=""
          />
          {pokemonCompareName && pokemonCompareData ? (
            <img
              src={pokemonCompareData.sprites && pokemonCompareData.sprites.front_default}
              className="w-52"
              alt=""
            />
          ) : null}
        </div>
        <div className="row-span-3 w-full flex justify-center items-center">
          <div>
            <div className="flex justify-between mb-3">
              <Link href={'/'}>Back to list</Link>
              <button onClick={() => setModalComparison(true)}>Compare</button>
            </div>
            <PokemonDataCard
              pokemonData={pokemon}
            />
            {pokemonCompareName && pokemonCompareData ? (
              <PokemonDataCard
                pokemonData={pokemonCompareData}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default PokemonDetail;