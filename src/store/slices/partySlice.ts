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
  pcBox: Pokemon[];
}

const initialState: PartyState = {
  party: [],
  pcBox: [],
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
        console.warn('No puedes llevar más de 6 Pokemon en el equipo!');
        // Manejar el caso donde la party ya tiene 6 Pokemon -> Enviar a PC 
      }
    }, 
    
    // Liberar Pokemon del Grupo
    releasePokemonFromParty(state, action: PayloadAction<number>) {
      state.party = state.party.filter(pokemon => pokemon.db_id !== action.payload);
    },


    // Cargar PC Box desde SQLite
    loadPCBox(state, action: PayloadAction<Pokemon[]>) {
            state.pcBox = action.payload;
    },

    // Añadir Pokémon al PC Box
    addPokemonToPCBox(state, action: PayloadAction<Pokemon>) {
        state.pcBox.push(action.payload);
    },

    // Liberar Pokémon del PC Box
    releasePokemonFromPCBox(state, action: PayloadAction<number>) {
        state.pcBox = state.pcBox.filter(pokemon => pokemon.db_id !== action.payload);
    },

  },
});

export const { 
    // Grupo
    loadParty, 
    addPokemonToParty, 
    releasePokemonFromParty, 
    // PC Box
    loadPCBox,
    addPokemonToPCBox,
    releasePokemonFromPCBox
} = partySlice.actions;

export default partySlice.reducer;
