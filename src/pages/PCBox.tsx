// src/Pages/PCBox.tsx

import React, { useEffect } from 'react';
import { Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Snackbar, Alert } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { RootState } from '../store/store';
import { loadPCBox, releasePokemonFromPCBox, Pokemon } from '../store/slices/partySlice';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const PCBox: React.FC = () => {
  const pcBox = useAppSelector((state: RootState) => state.party.pcBox);
  const dispatch = useAppDispatch();

  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'warning' | 'error'>('success');

  useEffect(() => {
    const fetchPCBox = async () => {
      try {
            const pcBoxData = await window.electronAPI.loadPCBox();
            dispatch(loadPCBox(pcBoxData));
      } catch (error) {
            console.error('Error al cargar el PC Box:', error);
      }
    };

    fetchPCBox();
  }, [dispatch]);

  const handleRelease = async (db_id: number) => {
    try {
      const result = await window.electronAPI.removePCBoxPokemon(db_id);
      if (result.success) {
            dispatch(releasePokemonFromPCBox(db_id));
            setSnackbarMessage('Pokémon liberado del PC Box correctamente.');
            setSnackbarSeverity('success');
      } else {
            setSnackbarMessage('No se pudo liberar el Pokémon del PC Box.');
            setSnackbarSeverity('error');
      }
    } catch (error) {
        console.error('Error al liberar el Pokémon del PC Box:', error);
        setSnackbarMessage('Ocurrió un error al liberar el Pokémon del PC Box.');
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
        PC Box
      </Typography>
      {pcBox.length === 0 ? (
        <Typography variant="body1">No tienes Pokémon en el PC Box.</Typography>
      ) : (
        <Grid container spacing={2}>
          {pcBox.map((pokemon: Pokemon) => (
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

                {/* Información */}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {capitalize(pokemon.name)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pokédex: {pokemon.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tipo: {pokemon.type.join(', ')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Nivel: {pokemon.level}
                  </Typography>
                </CardContent>

                {/* Acciones */}
                <CardActions>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleRelease(pokemon.db_id)}
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

      {/* Snackbar para notificaciones */}
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

// Función para capitalizar la primera letra
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default PCBox;
