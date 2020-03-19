# Manejo de imágenes con sharp

El código es solo para demo, no tiene validaciones de ningún tipo ni en el cliente ni en el servidor.

Tampoco tuve tiempo de hacer ningún tipo de refactoring.
El package.json está unificado para el cliente y el servidor, no intente esto en su casa.

El server usa Express, el cliente usa Vue.

## Project setup
```
yarn install
```

## Iniciar el proyecto para desarrollo

Esta demo hace uso de nodemon y concurrently para desarrollo, require que estén instalados para su funcionamiento.
Este comando inicia el cliente y el servidor
```
yarn startdev
```
Visite localhost:8080 (o el que indique la linea de comandos)


### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```