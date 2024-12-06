# PokeApp
Proyecto de aplicación de escritorio para la gestión de Pokémon utilizando PokeApi.

## Información Básica de la App

### Funcionalidades Principales

- **Wild Pokemon:** Visualiza y captura Pokémon salvajes.
- **Pokemon Party:** Gestiona tu equipo principal de hasta 6 Pokémon.
- **PC Box:** Almacena Pokémon adicionales cuando tu Party está llena.

### Bases de Datos

- **Party:** Utiliza **SQLite** gestionada por el backend de Electron para almacenar y gestionar los Pokémon en tu equipo principal.
- **PC Box:** Utiliza **MongoDB** gestionada por un backend separado **Node.js** (ubicado en `pcbox-backend/`) para almacenar Pokémon adicionales.

### Restricciones

- **Máximo de 6 Pokémon en la Party:** Solo puedes tener hasta 6 Pokémon en tu equipo principal.
- **Almacenamiento en PC Box:** Los Pokémon adicionales se almacenan automáticamente en el PC Box cuando la Party está llena.
- **Sincronización en Tiempo Real:** Las actualizaciones en una pestaña se reflejan automáticamente en las demás.
- **Persistencia de Datos:** Todos los datos se mantienen guardados incluso después de reiniciar la aplicación.

## Tecnologías Utilizadas

### **Frontend**

- **[Electron](https://www.electronjs.org/):** Framework para construir aplicaciones de escritorio con tecnologías web.
- **[React](https://reactjs.org/):** Biblioteca de JavaScript para construir interfaces de usuario interactivas.
- **[TypeScript](https://www.typescriptlang.org/):** Superset de JavaScript que añade tipado estático para mejorar la calidad del código.
- **[Redux Toolkit](https://redux-toolkit.js.org/):** Herramienta para gestionar el estado de la aplicación de manera eficiente.

### **Backend**

- **[Express](https://expressjs.com/):** Framework web para Node.js utilizado en el backend para servir archivos estáticos y manejar rutas.
- **[SQLite](https://www.sqlite.org/index.html):** Base de datos ligera para almacenar datos de la Party.
- **[MongoDB](https://www.mongodb.com/):** Base de datos NoSQL para gestionar los datos del PC Box, manejada por un backend separado.
- **[Electron Builder](https://www.electron.build/):** Herramienta para empaquetar y distribuir aplicaciones Electron.

### **Otros**

- **[PokeApi](https://pokeapi.co/):** API pública para obtener datos sobre Pokémon.
- **[Node.js](https://nodejs.org/):** Entorno de ejecución para JavaScript.

## Instalación y Uso

Se debe ejecutar tanto el backend **MongoDB** (`pcbox-backend/`) como la app (`pokeapp/`) por separado.

### Modo Desarrollo

#### Ejecutar `pcbox-backend/`:

```bash
cd pcbox-backend/
npm install
npm run build
npm start
```

#### Ejecutar `pokeapp/`:

```bash
cd pokeapp/
npm install
npm run dev
```

### Modo Producción

#### Ejecutar `pcbox-backend/`:

```bash
cd pcbox-backend/
npm install
npm run build
npm start
```

#### Ejecutar `pokeapp/`:

```bash
cd pokeapp/
npm install
npm run build
```

Buscar el ejecutable en el directorio `dist/win-unpacked/` o instalar mediante el instalador `pokeapp/Setup 1.0.0.exe`.

## Bugs Conocidos

- **Sprites de Pokémon Shiny:** En ocasiones, el sprite de Pokémon shiny no aparece ni se guarda correctamente, mostrando el sprite normal.
- **Captura de Múltiples Instancias del Mismo Pokémon:** Es posible capturar múltiples veces el mismo Pokémon, incluyendo variantes shiny sin actualizar sus sprites.

