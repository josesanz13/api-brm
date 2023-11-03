# api-brm

## Instrucciones para iniciar el proyecto

- Inicie el proyecto con el comando `npm i` y verifique que todos los paquetes queden correctamente instalado.
- Cree una carpeta `config` en la raiz del proyecto
- Renombre el archivo `config.example.json` por `config.json`
- Configure el archivo `config.json` con los datos de su host de base de datos
- Mueva el archivo `config.json` a la carpeta `config`
- Ejecute el comando `npx sequelize-cli db:migrate` para correr las migraciones y las tablas del proyecto se creen correctamente.

## Documentación API - POSTMAN
> https://documenter.getpostman.com/view/15622506/2s9YXe7Ps8