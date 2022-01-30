'use strict'

import fs from 'fs';
import path, { resolve } from 'path';
import fetch from 'node-fetch'

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
// fs.readFile : Lee el contenido de un archivo específico
// linksfromFile extrae en un array los links de un archivo
export const linksFromFile = (file) => {

    return new Promise ((resolve, reject) => {
        fs.readFile( file, (err,content) => {
            if (err) reject('Problemas en lectura de archivo, ' , err)
            
            const lines = content.toString();
            const links = readLinks(lines, file)
            resolve(links)
        });
    })
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
import { rejects } from 'assert';

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


export const readLinks = (fileContent, filePath) => {
    const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm
    const matches = fileContent.match(regexMdLinks);

    const singleMatch = /\[([^\[]+)\]\((.*)\)/
    const links = []
    for (var i = 0; i < matches.length; i++) {
        var text = singleMatch.exec(matches[i])

        links.push({
            text : text[1],
            href : text[2],
            file : filePath,
        })
    }

    // validatedLinks(links, true)
    return links
}

let arraysitos = [
    {
      text: 'Process - Documentación oficial (en inglés)',
      href: 'https://nodejs.org/api/process.html',
      file: 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos\\filemd2.md'
    },
    {
      text: 'first',
      href: 'https://facebook.com',
      file: 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos\\filemd2.md'
    },
    {
      text: 'secondLink',
      href: 'http://www.tedeopikachusd.com',
    //   href: 'www.google.com',
    //   href: 'https://google.com',
      file: 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos\\filemd2.md'
    },
    {
      text: 'fourth link',
      href: 'www.gifuaosiufsd.com',
      file: 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos\\filemd2.md'
    }
  ]

const validatedLinks = (links ,  validate ) => {

    return new Promise ((resolve, reject) => {

        const newLinks = []

        if(validate){

            links.forEach(link => {

                    fetch(link.href).
                    then((response) => {
                        console.log('in response then')
                        // const message = response.status === 200 ? 'Ok' : 'Fail' 
                        newLinks.push({
                            ...link,
                            statusCode: response.status,
                            message : 'Ok'
                        })

                        console.log(newLinks)
                        // resolve(newLinks)
                    })
                    .catch((err) => {
                        newLinks.push({
                            ...link,
                            statusCode: 404,
                            message : 'Fail'
                        })
                        // console.log(newLinks)
                        // reject(newLinks)

                    })
            })

            console.log('queeeeee', newLinks)
            resolve(newLinks)
        }
        else {
            // newLinks.push(link)
            // console.log(newLinks)
            // reject(newLinks)
            // reject(links)
            resolve(links)
        }
        
    })
}


        validatedLinks(arraysitos, true).then(res => {
            console.log('oook, ', res)
        }).catch(err => console.log(err))
        // validatedLinks(arraysitos, false)

// ! options.validate