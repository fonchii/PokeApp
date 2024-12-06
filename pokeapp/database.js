const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// -- BD Grupo -- //
// Ruta a la base de datos 
const partyDBPath = path.resolve(__dirname, 'party.db');
const partyDB = new sqlite3.Database(partyDBPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos del Equipo Pokemon :', err.message);
  } else {
    console.log('Conectado a la base de datos del Equipo Pokemon.');
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

partyDB.run(createPartyTable, (err) => {
  if (err) {
    console.error('Error al crear la tabla party:', err.message);
  } else {
    console.log('Tabla party creada o ya existe.');
  }
});

// Exportar la conexión a la base de datos del Equipo Pokemon
module.exports = partyDB;



/* Uso de SQLite para PC Box 
// -- BD PC Box -- //
const pcBoxDBPath = path.resolve(__dirname, '../../pcbox.db');
const pcBoxDB = new sqlite3.Database(pcBoxDBPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos PC Box:', err.message);
  } else {
    console.log('Conectado a la base de datos PC Box.');
    // Crear tabla de PC Box si no existe
    const createPCBoxTable = `
      CREATE TABLE IF NOT EXISTS pc_box (
        db_id INTEGER PRIMARY KEY AUTOINCREMENT,
        id INTEGER NOT NULL,
        name TEXT NOT NULL,
        image TEXT NOT NULL,
        type TEXT NOT NULL,
        description TEXT,
        attacks TEXT,
        level INTEGER
      )
    `;
    pcBoxDB.run(createPCBoxTable, (err) => {
      if (err) {
        console.error('Error al crear la tabla pc_box:', err.message);
      } else {
        console.log('Tabla pc_box creada o ya existe.');
      }
    });
  }
});

// Exportar ambas conexiones a las bases de datos
module.exports = { partyDB, pcBoxDB }; */