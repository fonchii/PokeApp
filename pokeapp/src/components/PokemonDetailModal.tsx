import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Chip, Stack } from '@mui/material';

import { Pokemon } from '../store/slices/partySlice';

interface Props {
    pokemon: Omit<Pokemon, 'db_id'>;
    onClose: () => void;
}

const PokemonDetailModal: React.FC<Props> = ({ pokemon, onClose }) => {
  
  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</DialogTitle>

      <DialogContent>
        <img 
            src={pokemon.image}
            alt={pokemon.name} 
            style={{ height:'250px', display: 'block', margin: '0 auto', marginBottom:'-20px', marginTop:'-40px' }} 
        />

        <Typography variant="h6" gutterBottom>
          Pokedex: {pokemon.id}
        </Typography>
        
        <Typography variant="body1" gutterBottom>
          {pokemon.description}
        </Typography>
        
        <Typography variant="subtitle1" gutterBottom>
          Tipo:
        </Typography>
        <Stack direction="row" spacing={1}>
            {pokemon.type.map((typeName) => (
                typeName !== "fairy" && <Chip key={typeName} label={typeName} />
            ))}
        </Stack>
        
        <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
          Movimientos:
        </Typography>
        <Stack direction="row" spacing={1}>
          {pokemon.attacks.map((moveName) => (
            <Chip key={moveName} label={moveName}/>
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
