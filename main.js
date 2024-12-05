const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./src/database/database');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL('http://localhost:30151'); // En desarrollo
  // win.loadFile(path.join(__dirname, 'build', 'index.html')); // En producción

  // Agregar botón de cierre
  const { Menu } = require('electron');
  const menu = Menu.buildFromTemplate([
    {
      label: 'Archivo',
      submenu: [
        {
          label: 'Salir',
          click: () => {
            app.quit();
          },
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


// IPC Handlers
ipcMain.handle('load-party', () => {
    const stmt = db.prepare('SELECT * FROM party');
    const rows = stmt.all();
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      image: row.image,
      type: JSON.parse(row.type),
      description: row.description,
      attacks: JSON.parse(row.attacks),
      level: row.level,
    }));
});

ipcMain.handle('add-pokemon', (event, pokemon) => {
if (db.prepare('SELECT COUNT(*) AS count FROM party').get().count >= 6) {
    return { success: false, message: 'La party ya está completa (máximo 6 Pokémon).' };
}

const insert = db.prepare(
    'INSERT INTO party (id, name, image, type, description, attacks, level) VALUES (?, ?, ?, ?, ?, ?, ?)'
);
insert.run(
    pokemon.id,
    pokemon.name,
    pokemon.image,
    JSON.stringify(pokemon.type),
    pokemon.description,
    JSON.stringify(pokemon.attacks),
    pokemon.level
);

return { success: true };
});

ipcMain.handle('remove-pokemon', (event, id) => {
const del = db.prepare('DELETE FROM party WHERE id = ?');
const info = del.run(id);
return { success: info.changes > 0 };
});