const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Ruta a la base de datos
const dbPath = path.resolve(__dirname, '../../pokemon.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
  }
});

// Definir la estructura de la base de datos
const createPartyTable = `
  CREATE TABLE IF NOT EXISTS party (
    db_id INTEGER PRIMARY KEY AUTOINCREMENT,
    id INTEGER NOT NULL,name TEXT NOT NULL,
    image TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    attacks TEXT,
    level INTEGER
  )
`;

db.run(createPartyTable, (err) => {
  if (err) {
    console.error('Error al crear la tabla party:', err.message);
  } else {
    console.log('Tabla party creada o ya existe.');
  }
});

// Exporta la conexión a la base de datos
module.exports = db;
