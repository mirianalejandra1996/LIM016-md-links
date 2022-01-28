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

const file = 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos\\filemd2.md'

// Getting information for a file
// const statsObj = fs.statSync(file);
// console.log(statsObj)

// fs.lstatSync() method to get the details of a symbolic link to a file.

// console.log(statsObj)

export const pathIsDirectory = (file) => {
    const statsObj = fs.lstatSync(file);
    return statsObj.isDirectory();
}

export const pathIsFile = (statsObj) => statsObj.isFile();

// console.log(pathIsDirectory(statsObj))
// console.log(pathIsFile(statsObj))






// console.log(process.argv)

// const pathAbsolute = path.resolve('../src/tmp');
// const pathAbsolute = path.resolve('importing.js');
// require('path').resolve('/etc', 'joe.txt')
// const pathAbsolute = path.resolve(process.argv[1], 'README.md');
export const pathAbsolute = (pathUrl) =>  path.resolve(process.cwd(), pathUrl);
// const pathAbsolute = path.resolve('README.md');
// const pathAbsolute = path.resolve('README.md');
// console.log('esta es la nueva ruta, ', pathAbsolute('README.md'))

// console.log(__dirname)


import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// console.log('el filenamee', __filename)
// console.log('el dirnameee', __dirname)

// console.log('aaaaaaaaaa', process.cwd())
// console.log('eeeeeeeeee', fs.realpathSync('.'))
// console.log('iiiiiiii', process.env.PWD)
// console.log('oooooooooo', process.argv[1]);
// console.log('uuuuuuuuuu', path.join());
// console.log('qqqqqqqqqq', path.resolve());

