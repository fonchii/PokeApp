const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
//const db = require('./src/database/database');
const db = require('./src/database/database.js')

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === 'production') {
    win.loadFile(path.join(__dirname, 'build', 'index.html')); // En producción
  } else {
    win.loadURL('http://localhost:3000'); // En desarrollo
    win.webContents.openDevTools(); // Abre las DevTools en desarrollo
  }

  // Agregar botón de cierre
  const { Menu } = require('electron');

  // Definir el menú de la aplicación
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
    {
      label: 'Ver',
      submenu: [
        {
          label: 'Toggle DevTools',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click: () => {
            win.webContents.toggleDevTools();
          },
        },
        { role: 'reload' }, // Opción para recargar la aplicación
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
ipcMain.handle('load-party', (event) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM party', [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          // Parsear campos JSON
          const parsedRows = rows.map(row => ({
            ...row,
            type: JSON.parse(row.type),
            attacks: JSON.parse(row.attacks),
          }));
          resolve(parsedRows);
        }
      });
    });
});

ipcMain.handle('add-pokemon', (event, pokemon) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) as count FROM party', [], (err, row) => {
        if (err) {
          reject(err);
        } else if (row.count >= 6) {
          resolve({ success: false, message: 'La party ya está completa (máximo 6 Pokémon).' });
        } else {
          const stmt = db.prepare(`
            INSERT INTO party (id, name, image, type, description, attacks, level)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `);
          stmt.run(
            pokemon.id,
            pokemon.name,
            pokemon.image,
            JSON.stringify(pokemon.type),
            pokemon.description,
            JSON.stringify(pokemon.attacks),
            pokemon.level,
            function (err) {
              if (err) {
                reject(err);
              } else {
                resolve({ success: true });
              }
            }
          );
          stmt.finalize();
        }
      });
    });
});


ipcMain.handle('remove-pokemon', (event, id) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('DELETE FROM party WHERE id = ?');
      stmt.run(id, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ success: this.changes > 0 });
        }
      });
      stmt.finalize();
    });
});