import React, { useState } from 'react';
import axios from 'axios';
import { pokemonTypes } from '../constants/pokemonTypes';
import { typeColors } from '../constants/typeColors';
import PokemonCard from '../components/PokemonCard';
import { Grid, Card, CardMedia, CardContent, Typography, /* CardActions, Button */ } from '@mui/material';

const WildPokemon: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedSpanishType, setSelectedSpanishType] = useState<string>('');
  const [pokemons, setPokemons] = useState<any[]>([]);

  const handleTypeSelect = (type: { name: string; spanishName: string; image: string }) => {
    setSelectedType(type.name);
    setSelectedSpanishType(type.spanishName);
    axios.get(`https://pokeapi.co/api/v2/type/${type.name}`)
      .then(response => {
        const pokemonsData = response.data.pokemon
          .map((p: any) => p.pokemon)
          .filter((pokemon: any) => {
            // Extraer el ID del Pokémon desde la URL
            const idMatch = pokemon.url.match(/\/pokemon\/(\d+)\//);
            const id = idMatch ? parseInt(idMatch[1], 10) : 0;
            // Retornar solo Pokemon con 151 >= id >= 1 
            return id >= 1 && id <= 151;
          });
        setPokemons(pokemonsData);
      })
      .catch(error => {
        console.error('Error al obtener Pokémon por tipo:', error);
      });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Wild Pokémon
      </Typography>
      <Grid container spacing={2}>
        {pokemonTypes.map((type) => (
          <Grid item key={type.spanishName}>
            <Card sx={{ maxWidth: 200, textAlign: 'center', cursor:'pointer' }} onClick={() => handleTypeSelect(type)}
            >
              <CardMedia
                component="img"
                //height="100"
                image={type.image}
                alt={type.name}
                sx={{
                    backgroundColor: typeColors[type.name],
                    padding: '25px',
                    paddingLeft:'0',
                    maxHeight: '90px',
                    objectFit: 'contain',
                  }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {type.spanishName.charAt(0).toUpperCase() + type.spanishName.slice(1)}
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small" onClick={() => handleTypeSelect(type)}>
                  Seleccionar
                </Button>
              </CardActions> */}
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedType && (
        <>
          <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
            Pokémon de tipo {selectedSpanishType.charAt(0).toUpperCase() + selectedSpanishType.slice(1)}
          </Typography>
          <Grid container spacing={2}>
            {pokemons.map((pokemon) => (
              <Grid item xs={4} /* sm={6} md={4} lg={3} */ key={pokemon.name}>
                <PokemonCard pokemonUrl={pokemon.url} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default WildPokemon;
