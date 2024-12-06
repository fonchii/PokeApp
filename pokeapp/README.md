# PokeApp
Proyecto de aplicación de escritorio para la gestión de Pokémon utilizando PokeApi.

## Información Básica de la App

### Consta de Tres pestañas

- Wild Pokemon
- Pokemon Party
- PC Box

### Bases de Datos

- Party: Utilizar SQLite directamente desde el frontend (Electron).
- PC Box: Utilizar una base de datos MongoDB separada manejada por un backend Node.js.

### Restricciones

- Máximo de 6 Pokémon en la Party.
- Pokémon adicionales se almacenan en el PC Box.
- Actualizaciones en una pestaña deben reflejarse en las demás.
- Persistencia de datos al reiniciar la aplicación.


## Utilización

### Modo desarrollo

Ejecutar:
```bash
npm install
npm run dev
```


### Producción
Ejecutar:

```bash
npm install
npm run build
```
Buscar el ejecutable en el directorio `dist/win-unpacked/` o instalar mediante el instalador `pokeapp/Setup 0.1.0.exe`.


## Bugs Conocidos

- **Sprites de Pokémon Shiny:** En ocasiones, el sprite de Pokémon shiny no aparece ni se guarda correctamente, mostrando el sprite normal.
- **Captura de Múltiples Instancias del Mismo Pokémon:** Es posible capturar múltiples veces el mismo Pokémon, incluyendo variantes shiny sin actualizar sus sprites.