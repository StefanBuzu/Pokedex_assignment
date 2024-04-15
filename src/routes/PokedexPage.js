import React, { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';

function PokedexPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPokemonList = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(currentPage - 1) * 20}`
        );
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        const data = await response.json();
        setPokemonList(data.results);
        setTotalPages(Math.ceil(data.count / 20));
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetchPokemonList();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <h2>Pokedex</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {pokemonList.map((pokemon, index) => (
        <PokemonCard key={pokemon.url} id={index + 1 + (currentPage - 1) * 20} />
      ))}
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default PokedexPage;
