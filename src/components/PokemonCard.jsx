import Link from "next/link";

const PokemonCard = ({ image, name }) => {
  return (
    <>
      <Link href={{ pathname: '/pokemon-detail', query: { name }}}> 
        <div
          className="bg-white text-black border border-orange-500 text-center"
        >
          <img src={image} alt="" />
          <p>{name}</p>
        </div>
      </Link>
    </>
  )
}

export default PokemonCard;