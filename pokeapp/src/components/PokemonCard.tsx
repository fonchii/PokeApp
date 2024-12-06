import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Snackbar, Alert } from '@mui/material';
import PokemonDetailModal from './PokemonDetailModal';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

import { useAppDispatch } from '../store/hooks';
import { addPokemonToParty, Pokemon as PartyPokemon } from '../store/slices/partySlice';
import { addPokemonToPCBox } from '../store/slices/pcBoxSlice';


interface Props {
  pokemonUrl: string;
}

interface RawPokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        front_shiny: string;
    };
    species: {
        url: string;
    };
    types: { type: { name: string } }[];
    moves: { move: { name: string } }[];
}

/* interface PartyPokemon {
    id: number;
    name: string;
    image: string;
    type: string[];
    description: string;
    attacks: string[];
    level: number;
} */

const PokemonCard: React.FC<Props> = ({ pokemonUrl }) => {
    const [pokemon, setPokemon] = useState<Omit<PartyPokemon, 'db_id'> | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'warning' | 'error'>('success');

    const dispatch = useAppDispatch();

  // Obtener datos del Pokemon desde la API al montar el componente
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get<RawPokemon>(pokemonUrl);
        const data = response.data;
        const isShiny = Math.random() > 0.99 && !!data.sprites.front_shiny;
        const imageUrl = isShiny ? 
                            `${data.sprites.front_shiny}?v=${Date.now()}` 
                                : `${data.sprites.front_default}?v=${Date.now()}`;


        if (isShiny){
            const notification = `Un ${data.name.charAt(0).toUpperCase() + data.name.slice(1)} shiny ha aparecido!`
            console.log(notification, imageUrl)
            setSnackbarMessage(notification);
            setSnackbarSeverity('success')
            setOpenSnackbar(true)
        }

        const speciesResponse = await axios.get<{ flavor_text_entries: any[] }>(pokemonUrl.replace('/pokemon/', '/pokemon-species/'));
        const flavorTextEntry = speciesResponse.data.flavor_text_entries.find(
            (entry: any) => entry.language.name === 'es'
        );
        const description = flavorTextEntry
            ? flavorTextEntry.flavor_text.replace(/\f/g, ' ')
            : 'Descripción no encontrada.';

        const tempPokemon: Omit<PartyPokemon, 'db_id'> = {
            id: data.id,
            name: data.name,
            image: imageUrl,
            type: data.types.map((typeInfo: any) => typeInfo.type.name).filter((typeName: string) => typeName !== 'fairy'),
            description: description, 
            attacks: data.moves.slice(0, 4).map((move: any) => move.move.name),
            level: 0, // Se asigna al capturar
          };

          setPokemon(tempPokemon);

      } catch (error) {
        console.error('Error al obtener datos del Pokemon:', error);
      }
    };

    fetchPokemon();
  }, [pokemonUrl]);

  if (!pokemon) return null;


  const handleCatch = async () => {

    if (!window.electronAPI) {
        console.error('Electron API no está disponible');
        return;
    }

    try {
        // Verificar si el grupo ya tiene 6 Pokemon
        const currentParty = await window.electronAPI.loadParty();
        let msg: string

        // Asignar un nivel aleatorio entre 5 y 100
        const level = Math.floor(Math.random() * 96) + 5; // 5 a 100

        
        // Crear el objeto del nuevo Pokemon
        const newPokemon: Omit<PartyPokemon, 'db_id'> = {
            ...pokemon,
            level: level,
          };

        const pokemonName = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`
    
        //  console.log(newPokemon);
  
        
        if (currentParty.length >= 6) {
            // La Party está llena, enviar al PC Box
            msg = `Tu equipo está completo, ${pokemonName} fué enviado al PC.` 

            try {
                // Enviar el Pokémon al PC Box mediante una solicitud HTTP al backend
                const response = await axios.post('http://localhost:5000/api/pcbox', newPokemon);
      
                if (response.status === 201) {
                    // Actualizar el estado de Redux
                    dispatch(addPokemonToPCBox(response.data)); 
                    // Notificar
                    setSnackbarMessage(msg);
                    setSnackbarSeverity('success');
                } else {
                  throw new Error('No se pudo enviar el Pokémon al PC Box.');
                }
              } catch (error) {
                console.error('Error al enviar el Pokémon al PC Box:', error);
                //setSnackbarMessage('Ocurrió un error al enviar el Pokémon al PC Box.');
                setSnackbarMessage(`${pokemonName} no logró llegar a PC Box.` )
                setSnackbarSeverity('error');
              }


        }
        else{
            // La Party tiene espacio, añadir directamente
            msg = `${pokemonName} capturado!`

            // Enviar el Pokémon a la Party mediante Electron IPC
            const result = await window.electronAPI.addPokemon(newPokemon);
            console.log('result: ', result)

            if (result.success && result.db_id) {
                const pokemonWithDbId: PartyPokemon = {
                    ...newPokemon,
                    db_id: result.db_id,
                  };
                console.log('pokemonWithDbId: ', pokemonWithDbId)
                setSnackbarMessage(msg);
                setSnackbarSeverity('success');
                // Actualizar el estado de Redux
                dispatch(addPokemonToParty(pokemonWithDbId));
            } else {
                setSnackbarMessage(result.message || `${pokemon.name.charAt(0).toUpperCase() + newPokemon.name.slice(1)} ha escapado.`);
                setSnackbarSeverity('error');
            }

        }
  
        setOpenSnackbar(true);
        
    } catch (error) {
        console.error('Error al capturar el Pokemon:', error);
        setSnackbarMessage('Ocurrió un error al capturar el Pokemon.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
      };

  return (
    <>
      <Card>
        {/* Imagen */}
        <CardMedia
          component="img"
          // width="140"
          image={pokemon.image}
          alt={pokemon.name}
        />
        
        {/* Info */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Pokedex: {pokemon.id}
          </Typography>
        </CardContent>

        {/* Botones */}
        <CardActions sx={{ justifyContent: 'center' }} > 
          <Button size="small" onClick={() => setShowModal(true)}>
            Ver Info
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleCatch}
            startIcon={<CatchingPokemonIcon />} 
          >
            {/* Catch it */}
            Capturar
          </Button>
        </CardActions>
      </Card>

      {/* Modal Detalles */}
      {showModal && <PokemonDetailModal pokemon={pokemon} onClose={() => setShowModal(false)} />}

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
    </>
  );
};

export default PokemonCard;
