import { Schema, model, Document } from 'mongoose';

export interface IPokemon extends Document {
  id: number;
  name: string;
  image: string;
  type: string[];
  description: string;
  attacks: string[];
  level: number;
}

const PokemonSchema = new Schema<IPokemon>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: [String], required: true },
  description: { type: String, required: false },
  attacks: { type: [String], required: false },
  level: { type: Number, required: true },
}, {
    // timestamps: true, // Añade los campos createdAt y updatedAt automáticamente
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true },
  }
);

export default model<IPokemon>('Pokemon', PokemonSchema);
