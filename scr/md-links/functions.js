'use strict'

import fs from 'fs';
import path from 'path'


const file = 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos\\filemd2.md'
// const file = 'filemd2.md'

export const __dirname = path.dirname(file)

export const readFile = (file) => {

    fs.readFile( file, (err,content) => {
        if (err) return console.log('eeeeeeeeeee' , err)
        
        const lines = content.toString();
        console.log(lines)
    });

}

// readFile(file)

// const directory = 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos';


export const printListFiles = (directory, extension) => {
    fs.readdir(directory, (err,list) => {
        if (err) return console.log(err)
        list.forEach( file => {
            if (path.extname(file) === extension) {
                console.log(file)
            }
        })
    });
}


// const extension = `.${process.argv[3]}`; // ".md" 
// const directory = process.argv[2]
// const directory = process.argv
// const directory = 'C:\\Users\\Miria\\Desktop\\tate-node\\prueba-md-links\\Modulo-1\\Prueba\\functions\\mdLinks.js'
