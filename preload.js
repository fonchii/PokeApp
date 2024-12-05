
console.log('Preload script loaded');

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadParty: () => ipcRenderer.invoke('load-party'),
  addPokemon: (pokemon) => ipcRenderer.invoke('add-pokemon', pokemon),
  removePokemon: (db_id) => ipcRenderer.invoke('remove-pokemon', db_id),

  // Funciones para el PC Box
  loadPCBox: () => ipcRenderer.invoke('load-pcbox'),
  addPCBoxPokemon: (pokemon) => ipcRenderer.invoke('add-pcbox-pokemon', pokemon),
  removePCBoxPokemon: (db_id) => ipcRenderer.invoke('remove-pcbox-pokemon', db_id),
});