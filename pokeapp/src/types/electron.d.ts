import { Pokemon } from '../store/slices/partySlice';
/* export interface Pokemon {
    id: number;
    name: string;
    image: string;
    type: string[];
    description: string;
    attacks: string[];
    level: number;
  } */

declare global {
    interface Window {
      electronAPI: {
        loadParty: () => Promise<Pokemon[]>;
        addPokemon: (pokemon: Omit<Pokemon, 'db_id'>) => Promise<{ success: boolean; message?: string; db_id?: number; addedToPCBox?: boolean }>;
        removePokemon: (id: number) => Promise<{ success: boolean }>;
      };
    }
}

export {}