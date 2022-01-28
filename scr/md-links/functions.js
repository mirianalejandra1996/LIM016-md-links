'use strict'

import fs from 'fs';
import path from 'path'
import os from 'os';

// Verifica si la ruta existe
export const isValidatedPath = (directory) => fs.existsSync(directory)

// Imprime lista de todos los archivos de una extesión específica (".md")
// Accede al contenido del directorio
export const printListFiles = (directory, extension) => {
    fs.readdir(directory, (err,list) => {
        if (err) return console.log(err)
        list.forEach( file => {
            extNameFile(file,extension)
        })
    });
}

// Identifica el tipo de archivo (nombre de la extensión)
const extNameFile = (file,extension) => {
    if (path.extname(file) === extension) {
        console.log(file)
    }
}
// Lee el contenido de un archivo específico
export const readContentFile = (file) => {

    fs.readFile( file, (err,content) => {
        if (err) return console.log('Error en la consola, ' , err)
        
        const lines = content.toString();
        console.log(lines)
    });
}

// Obtenemos el archivo según la extensión ingresada (".md");
export const getDirName = (file) => path.dirname(file)

// Verificamos si la ruta es absoluta
export const isPathAbsolute = (url) => path.isAbsolute(url)






// console.log(process.argv)

// const pathAbsolute = path.resolve('../src/tmp');
// const pathAbsolute = path.resolve('importing.js');
// const pathAbsolute = path.resolve('README.md');
// console.log(pathAbsolute)

// console.log(__dirname)


import { dirname } from 'path';
import { fileURLToPath } from 'url';

// const __dirname = dirname(fileURLToPath(import.meta.url));
// const __dirname = dirname(process.argv[1]);

// console.log(__filename)
// console.log(__dirname)
// console.log(os.tmpdir())

