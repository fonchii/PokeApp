import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import pcboxRoutes from './routes/pcbox';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/pcbox', pcboxRoutes);

// Middleware de manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocurrió un error en el servidor.' });
});

// Conectar a MongoDB
//const mongoURI = 'mongodb://localhost:27017/pcboxdb';  -> Por alguna razón utiliza IPv6
const mongoURI = 'mongodb://127.0.0.1:27017/pcboxdb';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
  .then(() => console.log('Conectado a MongoDB para PC Box.'))
  .catch(err => console.error('Error al conectar a MongoDB:', err.message));

export default app;
