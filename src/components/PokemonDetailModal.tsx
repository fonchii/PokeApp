import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Chip, Stack } from '@mui/material';
import axios from 'axios';

interface Props {
  pokemon: any;
  onClose: () => void;
}

const PokemonDetailModal: React.FC<Props> = ({ pokemon, onClose }) => {
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    // Obtener la descripción del Pokémon
    axios.get(pokemon.species.url)
      .then(response => {
        const flavorTextEntry = response.data.flavor_text_entries.find((entry: any) => entry.language.name === 'es');
        setDescription(flavorTextEntry ? flavorTextEntry.flavor_text.replace(/\f/g, ' ') : 'No description available.');
      })
      .catch(error => {
        console.error('Error al obtener la descripción del Pokémon:', error);
      });
  }, [pokemon.species.url]);

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</DialogTitle>
      <DialogContent>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ height:'250px', display: 'block', margin: '0 auto', marginBottom:'-20px', marginTop:'-40px' }} />
        <Typography variant="h6" gutterBottom>
          ID: {pokemon.id}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {description}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Tipo:
        </Typography>
        <Stack direction="row" spacing={1}>
          {pokemon.types.map((type: any) => (
            type.type.name!=="fairy" && <Chip key={type.type.name} label={type.type.name} />
          ))}
        </Stack>
        <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
          Movimientos:
        </Typography>
        <Stack direction="row" spacing={1}>
          {pokemon.moves.slice(0, 4).map((move: any) => (
            <Chip key={move.move.name} label={move.move.name} /* style={{backgroundColor:'#FBA54C', color:'#f0f0f0'}} */ />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PokemonDetailModal;
