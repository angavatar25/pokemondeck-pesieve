import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import PokemonCard from '@/components/PokemonCard'
import PokemonDataCard from '@/components/PokemonDataCard'

it('Render PokemonCard component', () => { 
  const { getByTestId } = render(
    <PokemonCard
      name={'charmeleon'}
      image={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png'}
    />)

    expect(getByTestId('pokemon-card')).toBeVisible();
 })

it('Render PokemonDataCard Component', () => {
  const pokemonCardData = {
    "id": 132,
    "name": "ditto",
    "sprites": {
      "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
    },
    "moves": [
      {
        "move": {
          "name": "transform"
        }
      }
    ],
    "types": [
      {
        "type": {
          "name": "normal"
        }
      }
    ]
  }
  const { getByTestId } = render(
    <PokemonDataCard
      pokemonData={pokemonCardData}
    />
  )

  expect(getByTestId('pokemon-data-card')).toBeVisible();
})