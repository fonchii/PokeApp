const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const dbPath = path.resolve(__dirname, '../../pokemon.db');
const db = new Database(dbPath);

// Define la estructura de la base de datos
const createPartyTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS party (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    attacks TEXT,
    level INTEGER
  )
`);

createPartyTable.run();

// Exporta la conexión a la base de datos
module.exports = db;
