import React, { useEffect } from 'react';
import { Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Stack, Chip, Snackbar, Alert } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { releasePokemonFromPCBox, PCBoxPokemon, loadPCBox } from '../store/slices/pcBoxSlice';

const PCBox: React.FC = () => {
  // Obtener el estado de PC Box desde Redux
  const pcBox = useAppSelector((state) => state.pcBox.pcBox);
  const dispatch = useAppDispatch();

  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  useEffect(() => {
    const fetchPCBox = async () => {
      try {
        const response = await axios.get<PCBoxPokemon[]>('http://localhost:5000/api/pcbox'); // Asegúrate de que la URL y el puerto sean correctos
        dispatch(loadPCBox(response.data)); // Cargar en Redux
      } catch (error) {
        console.error('Error al cargar el PC Box:', error);
        setSnackbarMessage('Error al cargar el PC Box.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    };

    fetchPCBox();
  }, [dispatch]);

  const handleRelease = async (pokemon: PCBoxPokemon) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/pcbox/${pokemon._id}`); // Usa _id
      if (response.status === 200) {
        dispatch(releasePokemonFromPCBox(pokemon._id));
        setSnackbarMessage('Pokémon liberado del PC Box correctamente.');
        setSnackbarSeverity('success');
      } else {
        throw new Error('No se pudo liberar el Pokémon del PC Box.');
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
          {pcBox.map((pokemon: PCBoxPokemon) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon._id}>
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
                    Nivel: {pokemon.level}
                  </Typography>

                  {/* <Typography variant="body2" color="text.secondary">
                    Tipo: {pokemon.type.join(', ')}
                  </Typography> */}
                 <Typography variant="subtitle1" gutterBottom>
                        Tipo:
                    </Typography>
                    <Stack 
                        direction="row" 
                        spacing={1.5} 
                        flexWrap="wrap" 
                        justifyContent="center" 
                        sx={{ marginBottom: '16px' }}
                        >
                            {pokemon.type.map((typeName) => (
                                typeName !== "fairy" && <Chip key={typeName} label={typeName} />
                        ))}
                    </Stack>
                    
                    <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
                        Movimientos:
                    </Typography>
                    <Stack direction="row" spacing={1.5} flexWrap="wrap" justifyContent="center">
                        {pokemon.attacks.map((moveName) => (
                            <Chip key={moveName} label={moveName} />
                        ))}
                    </Stack>


                </CardContent>

                {/* Acciones */}
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
