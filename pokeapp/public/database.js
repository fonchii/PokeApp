const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { app } = require('electron');

// Determinar la ruta correcta para la base de datos
let dbPath;
if (app.isPackaged) {
    dbPath = path.join(app.getPath('userData'), 'party.db');
} else {
    dbPath = path.join(__dirname, 'party.db');
}

// Crear y exportar la conexión a la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite en:', dbPath);
    }
});

// Crear la tabla 'party' si no existe
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS party (
        db_id INTEGER PRIMARY KEY AUTOINCREMENT,
        id INTEGER,
        name TEXT,
        image TEXT,
        type TEXT,
        description TEXT,
        attacks TEXT,
        level INTEGER
    )`, (err) => {
        if (err) {
            console.error('Error al crear la tabla party:', err.message);
        } else {
            console.log('Tabla party asegurada.');
        }
    });
});

module.exports = db;