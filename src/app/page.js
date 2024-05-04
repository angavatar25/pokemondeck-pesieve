import dynamic from "next/dynamic";

import { getClient } from "../../lib/client";
import { pokemonListQuery as query } from "@/query/gqlQuery";

const Home = async () => {
  const { data } = await getClient().query({ query, variables: { limit: 120 } });

  const PokemonCard = dynamic(() => import("@/components/PokemonCard", {
    loading: () => <p>Loading...</p>
  }));
  return (
    <>
      <div className="flex flex-wrap p-4">
        {data.pokemons && data.pokemons.results.length > 0 ? (
          data.pokemons.results.map((pokemon) => (
            <PokemonCard
              key={`pokemon-${pokemon.name}`}
              name={pokemon.name}
              image={pokemon.image}
            />
          ))
        ) : null}
      </div>
    </>
  )
}

export default Home;