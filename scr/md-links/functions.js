'use strict'

import fs from 'fs';
import path from 'path';
import http from 'http';
// import https from 'https';

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
        // console.log(lines)
        readLinks(lines)
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
export const pathIsDirectory = (route) => {
    const statsObj = fs.lstatSync(route);
    return statsObj.isDirectory();
}

export const pathIsFile = (route) => route.isFile();


// Si la ruta es relativa se convierte en absoluta 
// ! preguntar por qué estas rutas son como falsas...
export const convertPathAbsolute = (ruta) => !isPathAbsolute(ruta) ? path.resolve(ruta) : ruta


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


export const readLinks = (fileContent) => {
    const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm
    const matches = fileContent.match(regexMdLinks);
    // console.log('links', matches)

    const singleMatch = /\[([^\[]+)\]\((.*)\)/
    const links = []
    for (var i = 0; i < matches.length; i++) {
        var text = singleMatch.exec(matches[i])
        // console.log(`Match #${i+1}:`, text)
        // console.log(`Text  #${i+1}: ${text[1]}`)
        // console.log(`Href  #${i+1}: ${text[2]}`)
        // console.log(`File  #${i+1}: ${}`)
        // propertiesLink(text[2])

        links.push({
            text : text[1],
            href : text[2],
        })
    }

    console.log('liiiiiiiiiinks, ', links)
    return links
}


const propertiesLink = (link) => {

        const request = http.get(link , (response) => {
            // response.pipe(file);
            console.log(response.statusCode)
        });
}

// const link = "http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg"
// const link = "https://google.com"
// const link = "http://google.com"
// const link = "http://googuule.com"
// console.log(propertiesLink(link))