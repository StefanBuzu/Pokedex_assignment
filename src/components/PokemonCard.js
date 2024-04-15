import React, { useState, useEffect } from "react";

function PokemonCard({ id }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPokemonData();
  }, [id]);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="card" onClick={handleClick}>
      {error && <p>Error: {error}</p>}
      {pokemonData && (
        <div>
          <h4>{pokemonData.name}</h4>
          <p>ID: {pokemonData.id}</p>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          {isClicked && (
            <div>
              <p>
                Types:{" "}
                {pokemonData.types.map((type) => type.type.name).join(", ")}
              </p>
              <p>Stats:</p>
              <ul>
                {pokemonData.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
              <p>
                Abilities:{" "}
                {pokemonData.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}
              </p>
              <p>Height: {pokemonData.height}</p>
              <p>Weight: {pokemonData.weight}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PokemonCard;
