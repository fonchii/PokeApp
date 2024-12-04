import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import PokemonDetailModal from './PokemonDetailModal';

// Todo: Centrar botones "Ver Info" , "Capturar"
// Todo: Añadir icono pokeball a botón Capturar
// Todo: Eliminar tipo hada

interface Props {
  pokemonUrl: string;
}

const PokemonCard: React.FC<Props> = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(pokemonUrl);
        setPokemon(response.data);
      } catch (error) {
        console.error('Error al obtener datos del Pokémon:', error);
      }
    };

    fetchPokemon();
  }, [pokemonUrl]);

  if (!pokemon) return null;


  const handleCatch = async () => {
    try {
      // Obtener la descripción del Pokémon
      const speciesResponse = await axios.get(pokemon.species.url);
      const flavorTextEntry = speciesResponse.data.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'es'
      );
      const description = flavorTextEntry
        ? flavorTextEntry.flavor_text.replace(/\f/g, ' ')
        : 'Descripción no encontrada.';

      // Asignar un nivel aleatorio entre 1 y 100
      const level = Math.floor(Math.random() * 100) + 1;

      // Crear el objeto del nuevo Pokémon
      const newPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        type: pokemon.types
            .filter((type: any) => type.type.name !== 'fairy')
            .map((type: any) => type.type.name), //pokemon.types[0].type.name,
        description: description,
        attacks: pokemon.moves.slice(0, 4).map((move: any) => move.move.name),
        level: level,
      };

      
      console.log(newPokemon)
    
        // Agregar al equipo (redux) o guardar en SQLite
    } catch (error) {
        console.error('Error al capturar el Pokémon:', error);
    }
    };

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          // width="140"
          image={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ID: {pokemon.id}
          </Typography>
        </CardContent>
        <CardActions > 
          <Button size="small" onClick={() => setShowModal(true)}>
            Ver Info
          </Button>
          <Button size="small" variant="contained" color="primary" onClick={handleCatch}>
            {/* Catch it */}
            Capturar
          </Button>
        </CardActions>
      </Card>
      {showModal && <PokemonDetailModal pokemon={pokemon} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default PokemonCard;
