'use client'

const PokemonCardComparison = ({ image, name, onClickComparison }) => {
  return (
    <>
      <div onClick={onClickComparison}> 
        <div
          className="bg-white text-black border border-orange-500 text-center"
        >
          <img src={image} alt="" />
          <p>{name}</p>
        </div>
      </div>
    </>
  )
}

export default PokemonCardComparison;