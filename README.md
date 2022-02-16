# Md-links tool checker

<div align=center><img src="https://user-images.githubusercontent.com/91838806/154173182-b2f3f8aa-36a3-4a7e-9d93-8edaed625a77.png" ></div>

**Md-links tool checker** es una libreria de línea de comando (CLI) que facilita la lectura, análisis y generar reportes estadísticos de los enlaces contenidos en archivos de formato Markdown.

Esta herramienta permite:

- Proporcionar información básica sobre enlaces de los archivos .md
- Proporcionar información estadística sobre enlaces en archivos .md
- Validar enlaces que se encientran en los archivos .md
- Reportar links repetidos.

## Tabla de contenido

- [ Instalación ](#1-instalación)
- [ Guía de uso ](#2-guia-de-uso)
- [ Diagrama de flujo ](#3-diagrama-de-flujo)
- [ Dependencias adoptadas](#4-dependencias-adoptadas)
- [ Backlog](#5-backlog)
- [ Autor ](#6-autor)
- [ Fuente ](#7-fuente)

## 1. Instalación

Puede instalar la [libreria](https://www.npmjs.com/package/@mialedev/md-links) con el comando

      npm install @mialedev/md-links

> **Nota:** También puedes instalar la librería con uso del comando `npm i md-links`

## 2. Guía de Uso.

Para usarlo en la terminal:

```
  md-links <path-to-file> [options]
```

### Opciones.

#### No ingresar ninguna opción

Mostrará el texto, la URL y la ruta del archivo dónde el link fue encontrado

![pathNoCommands](https://user-images.githubusercontent.com/91838806/154172709-2401d726-f360-416c-9fc1-86ebbdae0770.png)

### `--help o -h`

Mostrará una tabla de ayuda con comandos válidos con ejemplos para aplicarlos.

<div align=center><img src="https://user-images.githubusercontent.com/91838806/154172006-49406278-af8c-4a5a-a5f6-ebc2df689413.png" width=100% ></div>

### `--validate --stats o -va -s`

Mostrará estadísticas de los links totales, links únicos, y links rotos de los resultados de la validación.

![-sAnd-vaOptions](https://user-images.githubusercontent.com/91838806/154172809-1421844c-e6d8-4371-afe3-d775012b0897.png)

### `--stats o -s`

Mostrará estadísticas básicas sobre los links únicos como links totales y links únicos.

![-sOption](https://user-images.githubusercontent.com/91838806/154173055-c8468abb-9a09-47df-8e0d-3ec86cf4cc35.png)

### --validate o -va

Mostrará el texto, la URL, la ruta del archivo dónde el link fue encontrado y una respuesta para validar si el link funciona o no (generará un codigo de status y un mensaje "Ok" o "Fail")

![-vaOption](https://user-images.githubusercontent.com/91838806/154173117-84d4ff52-19ae-480d-9e70-df6cb654f93f.png)

## 3. Diagramas de Flujo

### API JavaScript

![API](https://user-images.githubusercontent.com/91838806/154188697-03a73fec-9d86-4dbd-b2c5-f39e09bb1d33.jpg)

### CLI (Command Line Interface)

![CLI](https://user-images.githubusercontent.com/91838806/154188695-cdea2d39-396a-4308-b8f6-d39a0d2e83b1.jpg)

## 4. Dependencias Adoptadas

    "cfonts": "^2.10.0",
    "chalk": "^5.0.0",
    "commander": "^9.0.0",
    "gradient-string": "^2.0.0",
    "nanospinner": "^1.0.0",
    "node-fetch": "^3.2.0",
    "nodemon": "^2.0.15",
    "table": "^6.8.0"

## 5. Backlog

Presentación de [Backlog](https://github.com/mirianalejandra1996/LIM016-md-links/projects/1) que se llevó a cabo con el uso de GitHub Projects.

## 6. Autor

[Mirian Arévalo :sparkles:](https://github.com/mirianalejandra1996)

## 7. Fuente

[Repositorio de Laboratoria: ](https://github.com/Laboratoria/LIM016-md-links) Se encuentran todas las condiciones y herramientas a trabajar para el proyecto.
