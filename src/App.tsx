import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WildPokemon from './pages/WildPokemon';
import PokemonParty from './pages/PokemonParty';
import PCBox from './pages/PCBox';
import Footer from './components/Footer';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import './App.css';

function App() {
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
      <Container sx={{ marginTop: 4 }}>
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