import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Definir la ruta del archivo de la base de datos
const dbPath = path.resolve(__dirname, 'pokemon.db');

// Verificar si el archivo de la base de datos existe; si no, crearlo
const dbExists = fs.existsSync(dbPath);

// Crear una instancia de la base de datos
const db = new Database(dbPath);

// Si la base de datos es nueva, crear las tablas necesarias
if (!dbExists) {
  db.exec(`
    CREATE TABLE party (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      image TEXT NOT NULL,
      type TEXT NOT NULL,
      description TEXT,
      attacks TEXT,
      level INTEGER
    );

    CREATE TABLE pcbox (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      image TEXT NOT NULL,
      type TEXT NOT NULL,
      description TEXT,
      attacks TEXT,
      level INTEGER
    );
  `);
}

export default db;
