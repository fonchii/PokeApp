import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import Pokemon, { IPokemon } from '../models/Pokemon';

const router = Router();

// Obtener todos los Pokemon en el PC Box
router.get('/', async (req: Request, res: Response) => {
  try {
    const pokemons: IPokemon[] = await Pokemon.find();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los Pokemon de PC Box.' });
  }
});

// Añadir un Pokemon al PC Box
router.post('/', async (req: Request, res: Response) => {
  try {
    const { id, name, image, type, description, attacks, level } = req.body;
    
    const newPokemon = new Pokemon({
      id,
      name,
      image,
      type,
      description,
      attacks,
      level,
    });

    console.log('Solicitud de añadir recibida: ', newPokemon)

    await newPokemon.save();
    // Convertir el documento a un objeto para asegurarse de que se incluyen todos los campos, incluyendo virtuales
    const savedPokemon = newPokemon.toObject();
    
    console.log('Pokemon almacenado: ', savedPokemon)

    res.status(201).json(savedPokemon);
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir el Pokemon al PC Box.' });
  }
});

// Eliminar un Pokemon del PC Box por su ID
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedPokemon = await Pokemon.findByIdAndDelete(id);

    console.log('Solicitud de liberar Pokemon recibida: ', deletedPokemon)
  
    if (!deletedPokemon) {
      res.status(404).json({ message: 'Pokémon no encontrado en el PC Box.' });
      return;
    }
  
    res.json({ message: 'Pokémon eliminado del PC Box correctamente.' });
  }));

export default router;
