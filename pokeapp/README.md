# PokeApp
 Proyecto de app de escritorio utilizando PokeApi - Electron JS, React, Typescript, SQLite

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
Ejecutar
¨npm run dev¨

## Bugs Conocidos

- Algunas veces el sprite de Pokemon shiny no aparece ni se guarda correctamente, visualizándose el sprite normal
- El "mismo" Pokemon puede ser capturado multiples veces, es decir, si aparece un Shiny puede capturarse multiples veces generando niveles diferentes cada vez.