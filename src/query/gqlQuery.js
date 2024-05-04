import { gql } from "@apollo/client";

export const pokemonDetailQuery = gql`
  query pokemon($name: String!) {
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
  }
`

export const pokemonListQuery = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      nextOffset
      prevOffset
      message
      results {
        url
        name
        image
      }
    }
  }
`