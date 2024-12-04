// https://github.com/duiker101/pokemon-type-svg-icons

import { typeColors } from './typeColors';

export interface PokemonType {
    name: keyof typeof typeColors;
    spanishName: string;
    image: string; // URL de la imagen del tipo
  }
  
  export const pokemonTypes: PokemonType[] = [
    { name: 'normal',   spanishName: 'Normal',      image: '/types/normal.svg' },
    { name: 'fire',     spanishName: 'Fuego',       image: '/types/fire.svg' },
    { name: 'water',    spanishName: 'Agua',        image: '/types/water.svg' },
    { name: 'electric', spanishName: 'Eléctrico',   image: '/types/electric.svg' },
    { name: 'grass',    spanishName: 'Planta',      image: '/types/grass.svg' },
    { name: 'ice',      spanishName: 'Hielo',       image: '/types/ice.svg' },
    { name: 'fighting', spanishName: 'Lucha',       image: '/types/fighting.svg' },
    { name: 'poison',   spanishName: 'Veneno',      image: '/types/poison.svg' },
    { name: 'ground',   spanishName: 'Tierra',      image: '/types/ground.svg' },
    { name: 'flying',   spanishName: 'Volador',     image: '/types/flying.svg' },
    { name: 'psychic',  spanishName: 'Psíquico',    image: '/types/psychic.svg' },
    { name: 'bug',      spanishName: 'Bicho',       image: '/types/bug.svg' },
    { name: 'rock',     spanishName: 'Roca',        image: '/types/rock.svg' },
    { name: 'ghost',    spanishName: 'Fantasma',    image: '/types/ghost.svg' },
    { name: 'dragon',   spanishName: 'Dragón',      image: '/types/dragon.svg' },
  ];
