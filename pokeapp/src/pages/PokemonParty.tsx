import React, {useState} from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Snackbar, Alert } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { RootState } from '../store/store';
import { releasePokemonFromParty, Pokemon } from '../store/slices/partySlice';



const PokemonParty: React.FC = () => {
    const party = useAppSelector((state: RootState) => state.party.party);
    const dispatch = useAppDispatch();
  
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'warning' | 'error'>('success');

    const handleRelease = async (pokemon: Pokemon) => {
        if (!window.electronAPI) {
          console.error('Electron API no está disponible');
          return;
        }
        const db_id = pokemon.db_id
        const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
        try {
          const result = await window.electronAPI.removePokemon(db_id);
          if (result.success) {
            dispatch(releasePokemonFromParty(db_id));
            setSnackbarMessage(`Te extrañaremos ${name} :(`);
            setSnackbarSeverity('success');
          } else {
            setSnackbarMessage('No se pudo liberar el Pokémon.');
            setSnackbarSeverity('error');
          }
        } catch (error) {
          console.error('Error al liberar el Pokémon:', error);
          setSnackbarMessage('Ocurrió un error al liberar el Pokémon.');
          setSnackbarSeverity('error');
        } finally {
          setOpenSnackbar(true);
        }
    };
    
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setSnackbarMessage('');
        setSnackbarSeverity('success');
    };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Pokémon Party
      </Typography>
      {party.length === 0 ? (
        <>
        <Typography variant="body1">No has capturado ningún Pokémon aún.</Typography>
        <Typography variant="body1">Ve a capturar algunos en la hierba alta</Typography>
        </>
      ) : (
        <Grid container spacing={2}>
          {party.map((pokemon: Pokemon) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.db_id}>
              <Card sx={{ maxWidth: 345, textAlign: 'center' }}>

                {/* Imagen */}
                <CardMedia
                  component="img"
                  height="140"
                  image={pokemon.image}
                  alt={pokemon.name}
                  sx={{
                    padding: '10px',
                    maxHeight: '140px',
                    objectFit: 'contain',
                  }}
                />

                {/* Info */}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pokedex: {pokemon.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tipo: {pokemon.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Nivel: {pokemon.level}
                  </Typography>
                </CardContent>

                {/* Liberar :( */}
                <CardActions>
                    <Button
                        size="small"
                        color="error"
                        onClick={() => handleRelease(pokemon)}
                        startIcon={<RemoveCircleOutlineIcon />} 
                    >
                        Liberar
                    </Button>
                </CardActions>

              </Card>
            </Grid>
          ))}
        </Grid>
      )}

    <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
        </Alert>
    </Snackbar>


    </div>
  );
};

export default PokemonParty;
