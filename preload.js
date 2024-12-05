const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadParty: () => ipcRenderer.invoke('load-party'),
  addPokemon: (pokemon) => ipcRenderer.invoke('add-pokemon', pokemon),
  removePokemon: (id) => ipcRenderer.invoke('remove-pokemon', id),
});