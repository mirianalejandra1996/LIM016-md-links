##  Tabla de contenido 

* [ Instalación ](#Instalación)
* [ Guía de uso ](#Guia-de-uso)
* [ Diagrama de flujo ](#Diagrama-de-flujo)
* [ Dependencias adoptadas](#Dependencias-adoptadas)
* [ Autor ](#Autor)



##  1. Instalación 

Puede instalar la [libreria](https://www.npmjs.com/package/mdkate)  con el comando

      npm install md-links
> **Nota:** También puedes instalar la librería con uso del comando `npm i md-links`

##  2. Guía de Uso.

Para usarlo en la terminal: 
```
  md-links <path-to-file> [options]
```
* Puedes ingresar tanto una ruta relativa como absoluta.
* Las opciones son las siguientes. 

`--help o -h`, `--stats o -s`, `--validate o -v`, or use both together `--stats --validate or -s -v`.
##  2. Dependencias Adoptadas

	"cfonts": "^2.10.0",
	"chalk": "^5.0.0",
	"commander": "^9.0.0",
	"gradient-string": "^2.0.0",
	"nanospinner": "^1.0.0",
	"node-fetch": "^3.2.0",
	"nodemon": "^2.0.15",
	"table": "^6.8.0" 
	
** `md-links` **  facilita el proceso de:

- Proporcionar información básica sobre enlaces de los archivos .md
- Proporcionar información estadística sobre enlaces en archivos .md
- Validar enlaces que se encientran en los archivos .md
- Reportar links repetidos.
# Files

StackEdit stores your files in your browser, which means all your files are automatically saved locally and are accessible **offline!**

## Create files and folders

The file explorer is accessible using the button in left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.

## Switch to another file

All your files and folders are presented as a tree in the file explorer. You can switch from one to another by clicking a file in the tree.

## Rename a file

You can rename the current file by clicking the file name in the navigation bar or by clicking the **Rename** button in the file explorer.

## Delete a file

You can delete the current file by clicking the **Remove** button in the file explorer. The file will be moved into the **Trash** folder and automatically deleted after 7 days of inactivity.

## Export a file

You can export the current file by clicking **Export to disk** in the menu. You can choose to export the file as plain Markdown, as HTML using a Handlebars template or as a PDF.


# Synchronization

Synchronization is one of the biggest features of StackEdit. It enables you to synchronize any file in your workspace with other files stored in your **Google Drive**, your **Dropbox** and your **GitHub** accounts. This allows you to keep writing on other devices, collaborate with people you share the file with, integrate easily into your workflow... The synchronization mechanism takes place every minute in the background, downloading, merging, and uploading file modifications.

