'use client'

import Link from "next/link";

import { pokemonDetailQuery as query, pokemonListQuery } from "@/query/gqlQuery";
import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import PokemonComparison from "@/components/PokemonComparison";

const PokemonDetail = ({ searchParams }) => {
  const [modalComparison, setModalComparison] = useState(false);
  const [pokemonCompareName, setPokemonCompareName] = useState('');
  const [pokemonCompareData, setPokemonCompareData] = useState(null);
  const { name } = searchParams;

  const loadPokemonDetail = useSuspenseQuery(query, { variables: { name }});
  const { data: pokemonList } = useSuspenseQuery(pokemonListQuery, { variables: { limit: 60 } });

  const { pokemon } = loadPokemonDetail.data;

  const fetchPokemonCompareData = async (selected) => {
    const url = new URL("https://graphql-pokeapi.graphcdn.app/");
    url.searchParams.set("name", selected);

    const { data } = await fetch(url,
      {
        method: "POST",
        body: JSON.stringify({
          query: `query pokemon($name: String!) {
            pokemon(name: $name) {
              id
              name
              message
              sprites {
                front_default
              }
              moves {
                move {
                  name
                }
              }
              types {
                type {
                  name
                }
              }
            }
          }`,
          variables: { name: selected }
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    return data.pokemon;
  }

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
        <div className="row-span-3 flex justify-center items-center">
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
            <div className="bg-white text-black p-4 w-full max-w-[384px] max-h-64 overflow-scroll">
              <p className="text-center capitalize">{pokemon.name}</p>
              <div className="mb-3">
                <p className="mb-2">Moves</p>
                <div className="flex flex-wrap gap-2">
                  {pokemon.moves && pokemon.moves.length > 0 ? (
                    pokemon.moves.slice(0,20).map((moves,i) => (
                      <p key={`index-${i}`} className="bg-red-500 p-2 rounded text-xs">{moves.move.name}</p>
                    ))
                  ) : null}
                </div>
              </div>
              <div className="mb-3">
                <p className="mb-2">Types</p>
                <div className="flex flex-wrap gap-2">
                  {pokemon.types && pokemon.types.length > 0 ? (
                    pokemon.types.map((types) => (
                      <p key={`types-${types.type.name}`} className="bg-red-500 p-2 rounded text-xs">{types.type.name}</p>
                    ))
                  ) : null}
                </div>
              </div>
            </div>
            {pokemonCompareName && pokemonCompareData ? (
              <div className="bg-white text-black p-4 w-full max-w-[384px] max-h-64 overflow-scroll mt-4">
                <p className="text-center capitalize">{pokemonCompareData.name}</p>
                <div className="mb-3">
                  <p className="mb-2">Moves</p>
                  <div className="flex flex-wrap gap-2">
                    {pokemonCompareData.moves && pokemonCompareData.moves.length > 0 ? (
                      pokemonCompareData.moves.slice(0,20).map((moves,i) => (
                        <p key={`index-${i}`} className="bg-red-500 p-2 rounded text-xs">{moves.move.name}</p>
                      ))
                    ) : null}
                  </div>
                </div>
                <div className="mb-3">
                  <p className="mb-2">Types</p>
                  <div className="flex flex-wrap gap-2">
                    {pokemonCompareData.types && pokemonCompareData.types.length > 0 ? (
                      pokemonCompareData.types.map((types) => (
                        <p key={`types-${types.type.name}`} className="bg-red-500 p-2 rounded text-xs">{types.type.name}</p>
                      ))
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default PokemonDetail;