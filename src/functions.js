'use strict'

import fs from 'fs';
import path, { dirname} from 'path';
import fetch from 'node-fetch'

// Verifica si la ruta existe
export const isValidatedPath = (directory) => fs.existsSync(directory)


// Imprime lista de todos los archivos de una extesión específica (".md")
// Accede al contenido del directorio
export const printMdFiles = (directory) => {
    return new Promise ((resolve, reject) => {
        fs.readdir(directory, (err,list) => {

            if (err) return console.log(err)
            const mdFiles = []
            list.forEach( file => {
                // path.extname Identifica el tipo de archivo (nombre de la extensión)
                // Listamos los archivos con extensión ".md"
                if (path.extname(file) === ".md") {
                    mdFiles.push(file)
                }
            });

            mdFiles.length > 0 ? resolve(mdFiles) : reject('No se encuentran archivos md')
        }) 
       
    })
}

export const readLinks = (fileContent, filePath) => {
    const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm

    const matches = fileContent.match(regexMdLinks);
    
    if (!matches) return []

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

    return links
}

// fs.readFile : Metodo Asincrono que se encarga de leer el contenido de un archivo específico
// extractedLinks extrae en un array los links de un archivo
export const extractedLinks = (file) => {

    return new Promise ((resolve, reject) => {
        fs.readFile( file, (err,content) => {
            if (err) reject('Problemas en lectura de archivo, ' , err)
            
            const lines = content.toString();
            const links = readLinks(lines, file)

            if (links.length === 0) {
                return reject('no link in this file')
            }
            console.log(links)
            resolve(links)
        });
    })
}

// 
export const getDirName = (file) => path.dirname(file)

// Verificamos si la ruta es absoluta
export const isPathAbsolute = (url) => path.isAbsolute(url)

// const file = 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos\\filemd2.md'

export const pathIsDirectory = (route) => {
    // With lstatSync or lstat (Asyncronous method) I can  get the details (information)
    // of a symbolic link to a file.
    const statsObj = fs.lstatSync(route);
    return statsObj.isDirectory();
}

// export const pathIsFile = (route) => route.isFile();
export const pathIsFile = (route) => {
    const statsObj = fs.lstatSync(route);
    return statsObj.isFile();
}

export const convertPathAbsolute = (ruta) => !isPathAbsolute(ruta) ? path.resolve(ruta) : ruta

const __filename = process.cwd();
const __dirname = dirname(__filename);


const validatedLink = (link) => {
    return new Promise ((resolve, reject) => {
        fetch(link.href).
        then((response) => {

            link.statusCode = response.status,
            link.message = 'Ok'
            resolve(link)
            // dddd probando ando
        })
        .catch((err) => {
            
            link.statusCode = 404,
            link.message = 'Fail'
            resolve(link)
        })

        if (!link) reject('No links found')
    })
}

export const validatedLinks = (links ,  validate ) => {

    return new Promise ((resolve, reject) => {

        // es un array de promesas
        const newLinks = []

        if(validate){
            links.forEach(link => newLinks.push(validatedLink(link)))
        }
        else {
            // Si validate es false, entonces retornarán los links como entraron a la función.
            resolve(links)
        }

        return Promise.all(newLinks)
        .then((res) => resolve(res))
        .catch(err => err)
        
    })
} 




const getMDFiles = (files) => {
    const mdFiles = files.filter( file => path.extname(file) === ".md" )
    return mdFiles.length > 0 ? mdFiles : 'No se encuentran archivos md';
}


const getAllFilesRecursively = (ruta) => {
    // console.log('mirame' , ruta)
    let archivos = []
    // Si la ruta es un archivo lo pushea en mi array
    if (pathIsFile(ruta)) {
        // return ruta
        return [ruta]
    }
    
    else if (pathIsDirectory(ruta)) {

      const files = fs.readdirSync(ruta);

      if (files.length === 0){
          return 'nothing'
      } else {
      
      files.forEach(file => {
  
          const newPath = path.join(ruta, file);
          let salva = getAllFilesRecursively(newPath)
          archivos.push(salva)
      })
    
      return archivos.flat()
    //   return getMDFiles(archivos.flat())

      }

    }

}


// getAllFilesRecursively(convertPathAbsolute('../test/Archivos/filetext.txt'));
// console.log(getAllFilesRecursively(convertPathAbsolute('../test/Archivos/filetext.txt')));
// console.log(getMDFiles(getAllFilesRecursively(convertPathAbsolute('../test/Archivos/filetext.txt'))));
// console.log(convertPathAbsolute(''));
// console.log(convertPathAbsolute('../test/Archivos'));
console.log(getAllFilesRecursively(convertPathAbsolute('../test/Archivos')));
// console.log(getAllFilesRecursively(convertPathAbsolute('../test/Archivos/filemd2.md')));
// console.log(getAllFilesRecursively(convertPathAbsolute('')));

    
// ! ------------

const mdLinks = (path, options) => {

    return new Promise ((resolve,reject) => {

        if (!isValidatedPath(path)){
            console.log('La ruta ingresada no existe')
            // reject('La ruta ingresada no existe')
        }
        else {
            let newPath = convertPathAbsolute(path)
            console.log('mira mi nuevo path! , ', newPath)

            const allFiles = getAllFilesRecursively(path)
            console.log('all files, ', allFiles)

            // if(pathIsFile(path))
            // getAllFilesRecursively(path)
        }
    })
}

// ! ------------

// ! Recursivity
// const traverseSync = dir => ({
//     path: dir,
//     children: Fs.readdirSync(dir).map(file => {
//       const path = Path.join(dir, file);
//       return Fs.lstatSync(path).isDirectory()
//         ? traverseSync(path)
//         : { path };
//     })
//   });

// convertPathAbsolute('../test/Archivos')
mdLinks('../test/Archivos')
// mdLinks('../test/Archfdsivos')