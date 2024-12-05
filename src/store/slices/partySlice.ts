import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// Todo: Investigar -> createAsyncThunk

export interface Pokemon {
    db_id: number;
    id: number;
    name: string;
    image: string;
    type: string[];
    description: string;
    attacks: string[];
    level: number;
}

interface PartyState {
  party: Pokemon[];
}

const initialState: PartyState = {
  party: [],
};

const partySlice = createSlice({
  name: 'party',
  initialState,
  reducers: {
    // Cargar desde SQLite
    loadParty(state, action: PayloadAction<Pokemon[]>) {
        state.party = action.payload;
    },

    // Añadir Pokemon al grupo
    addPokemonToParty(state, action: PayloadAction<Pokemon>) {
      if (state.party.length < 6) {
        state.party.push(action.payload);
      } else {
        console.warn('No puedes llevar más de 6 Pokemon!');
        // Manejar el caso donde la party ya tiene 6 Pokemon -> Enviar a PC 
      }
    }, 
    
    // Liberar Pokemon del Grupo
    releasePokemonFromParty(state, action: PayloadAction<number>) {
      state.party = state.party.filter(pokemon => pokemon.db_id !== action.payload);
    },
  },
});

export const { loadParty, addPokemonToParty, releasePokemonFromParty } = partySlice.actions;

export default partySlice.reducer;
