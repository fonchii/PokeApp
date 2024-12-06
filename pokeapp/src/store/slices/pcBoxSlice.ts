import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaz para Pokémon
export interface PCBoxPokemon {
    _id: string; // Identificador de MongoDB
    id: number;
    name: string;
    image: string;
    type: string[];
    description: string;
    attacks: string[];
    level: number;
}

// Estado inicial para el PC Box
interface PCBoxState {
    pcBox: PCBoxPokemon[];
}

const initialState: PCBoxState = {
    pcBox: [],
};

const pcBoxSlice = createSlice({
    name: 'pcBox',
    initialState,
    reducers: {
        // Cargar el PC Box desde el backend
        loadPCBox(state, action: PayloadAction<PCBoxPokemon[]>) {
            state.pcBox = action.payload;
        },

        // Añadir Pokémon al PC Box
        addPokemonToPCBox(state, action: PayloadAction<PCBoxPokemon>) {
            state.pcBox.push(action.payload);
        },

        // Liberar Pokémon del PC Box
        releasePokemonFromPCBox(state, action: PayloadAction<string>) {
            state.pcBox = state.pcBox.filter(pokemon => pokemon._id !== action.payload);
        },
  },
});

export const { 
    loadPCBox, 
    addPokemonToPCBox, 
    releasePokemonFromPCBox 
} = pcBoxSlice.actions;

export default pcBoxSlice.reducer;
