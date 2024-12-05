import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import './App.css';

import WildPokemon from './pages/WildPokemon';
import PokemonParty from './pages/PokemonParty';
import PCBox from './pages/PCBox';
import Footer from './components/Footer';

import { useAppDispatch } from './store/hooks';
import { loadParty } from './store/slices/partySlice';


function App() {

    const dispatch = useAppDispatch();

    // Cargar equipo Pokemon al iniciar la App
    useEffect(() => {
        const fetchParty = async () => {
          if (!window.electronAPI) {
            console.error('Electron API no está disponible');
            return;
          }
    
          try {
            const loadedParty = await window.electronAPI.loadParty();
            dispatch(loadParty(loadedParty));
          } catch (error) {
            console.error('Error al cargar la party:', error);
          }
        };
    
        fetchParty();
    }, [dispatch]);


  return (
    <Router>
      {/* Barra de Navegación usando Material-UI */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PokeApp
          </Typography>
          {/* <Button color="inherit" component={Link} to="/">
            Wild Pokemon
          </Button>
          <Button color="inherit" component={Link} to="/party">
            Pokemon Party
          </Button>
          <Button color="inherit" component={Link} to="/pcbox">
            PC Box
          </Button> */}
        </Toolbar>
      </AppBar>

      {/* Contenedor Principal */}
      <Container sx={{ marginTop: 3, maxHeight:'76vh', overflowY:'auto' }}>
        <Routes>
          <Route path="/" element={<WildPokemon />} />
          <Route path="/party" element={<PokemonParty />} />
          <Route path="/pcbox" element={<PCBox />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;