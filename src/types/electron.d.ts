export interface Pokemon {
    id: number;
    name: string;
    image: string;
    type: string[];
    description: string;
    attacks: string[];
    level: number;
  }
  
  declare global {
    interface Window {
      electronAPI: {
        loadParty: () => Promise<Pokemon[]>;
        addPokemon: (pokemon: Pokemon) => Promise<{ success: boolean; message?: string }>;
        removePokemon: (id: number) => Promise<{ success: boolean }>;
      };
    }
  }