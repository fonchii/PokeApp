const express = require('express');
const path = require('path');
const app = express();
const PORT = 3151;

// Sirve los archivos estáticos desde el directorio build
app.use(express.static(path.join(__dirname, 'build')));

// Maneja cualquier otra ruta con index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const serverInstance = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = serverInstance;
