const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
//const partyDB = require('./src/database/database.js')
const partyDB = require(path.join(__dirname, 'database.js'));

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

// Cerrar la conexión a la base de datos al salir
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    partyDB.close();
    app.quit();}
});



// --- Funciones IPC para Equipo Pokemon --- //

// Cargar Equipo Pokemon desde la base de datos
ipcMain.handle('load-party', (event) => {
    return new Promise((resolve, reject) => {
      partyDB.all('SELECT * FROM party', [], (err, rows) => {
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

// Añadir un Pokémon a la Party o al PC Box si la Party está llena
ipcMain.handle('add-pokemon', (event, pokemon) => {
    return new Promise((resolve, reject) => {
      partyDB.get('SELECT COUNT(*) as count FROM party', [], (err, row) => {
        if (err) {
          reject(err);
        } else if (row.count >= 6) {
            // Si la Party está llena, informar al frontend para que maneje el almacenamiento en el PC Box
            resolve({ success: false, message: 'No puedes llevar más de 6 Pokemon en tu equipo!' });
          
        } else {
            // Añadir al equipo si hay espacio
            const stmt = partyDB.prepare(`
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
                    resolve({ success: true, db_id: this.lastID, addedToPCBox: false });
                }
                }
            );
            stmt.finalize();
            }
      });
    });
});


ipcMain.handle('remove-pokemon', (event, db_id) => {
    return new Promise((resolve, reject) => {
      const stmt = partyDB.prepare('DELETE FROM party WHERE db_id = ?');
      stmt.run(db_id, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ success: this.changes > 0 });
        }
      });
      stmt.finalize();
    });
});



/* // --- Funciones IPC para el PC Box --- //

// Cargar los Pokémon del PC Box desde la base de datos
ipcMain.handle('load-pcbox', (event) => {
    return new Promise((resolve, reject) => {
      pcBoxDB.all('SELECT * FROM pc_box', [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const parsedRows = rows.map(row => ({
            db_id: row.db_id,
            id: row.id,
            name: row.name,
            image: row.image,
            type: JSON.parse(row.type),
            description: row.description,
            attacks: JSON.parse(row.attacks),
            level: row.level,
          }));
          resolve(parsedRows);
        }
      });
    });
  });
  
  // Añadir un Pokémon al PC Box - Ya manejado en 'add-pokemon'
  ipcMain.handle('add-pcbox-pokemon', (event, pokemon) => {
    return new Promise((resolve, reject) => {
      const stmt = pcBoxDB.prepare(`
        INSERT INTO pc_box (id, name, image, type, description, attacks, level)
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
            resolve({ success: true, db_id: this.lastID });
          }
        }
      );
      stmt.finalize();
    });
  });
  
  
  // Liberar un Pokémon del PC Box
  ipcMain.handle('remove-pcbox-pokemon', (event, db_id) => {
    return new Promise((resolve, reject) => {
      const stmt = pcBoxDB.prepare('DELETE FROM pc_box WHERE db_id = ?');
      stmt.run(db_id, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ success: this.changes > 0 });
        }
      });
      stmt.finalize();
    });
  }); */