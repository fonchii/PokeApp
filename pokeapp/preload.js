
console.log('Preload script loaded');

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadParty: () => ipcRenderer.invoke('load-party'),
  addPokemon: (pokemon) => ipcRenderer.invoke('add-pokemon', pokemon),
  removePokemon: (db_id) => ipcRenderer.invoke('remove-pokemon', db_id),

});