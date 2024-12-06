import app from './app';

//const PORT = process.env.PORT || 5000;
const PORT = 5000; // Puerto 5000 fijo

app.listen(PORT, () => {
  console.log(`Servidor de PC Box corriendo en el puerto ${PORT}`);
});
