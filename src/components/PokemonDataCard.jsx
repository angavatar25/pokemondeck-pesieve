const PokemonDataCard = ({ pokemonData }) => {
  return (
    <div data-testid="pokemon-data-card" className="bg-white text-black p-4 w-full max-w-[384px] max-h-64 overflow-scroll mt-4">
      <p className="text-center capitalize">{pokemonData.name}</p>
      <div className="mb-3">
        <p className="mb-2">Moves</p>
        <div className="flex flex-wrap gap-2">
          {pokemonData.moves && pokemonData.moves.length > 0 ? (
            pokemonData.moves.slice(0,20).map((moves,i) => (
              <p key={`index-${i}`} className="bg-red-500 p-2 rounded text-xs">{moves.move.name}</p>
            ))
          ) : null}
        </div>
      </div>
      <div className="mb-3">
        <p className="mb-2">Types</p>
        <div className="flex flex-wrap gap-2">
          {pokemonData.types && pokemonData.types.length > 0 ? (
            pokemonData.types.map((types) => (
              <p key={`types-${types.type.name}`} className="bg-red-500 p-2 rounded text-xs">{types.type.name}</p>
            ))
          ) : null}
        </div>
      </div>
    </div>
  )
};

export default PokemonDataCard;