export const fetchPokemonCompareData = async (selected) => {
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