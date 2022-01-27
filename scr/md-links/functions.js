'use strict'

const fs = require('fs');
const path = require('path')


const file = '../Archivos/filejs.js'
const file2 = '../Archivos/filetext.txt'
console.log(__dirname)

const readFile = (file) => {

    fs.readFile( file, (err,content) => {
        if (err) return console.log(err)
        
        const lines = content.toString();v
        console.log(lines)
    });

}

readFile(file)
readFile(file2)

// const directory = 'C:\\Users\\Miria\\Desktop\\tate-node\\prueba-md-links\\Modulo-1\\Prueba\\md-links'
const directory = 'C:\\Users\\Miria\\Desktop\\tate-node\\prueba-md-links\\Modulo-1\\Prueba\\Archivos'
// const directory = 'C:\\Users\\Miria\\Desktop\\tate-node\\prueba-md-links\\Modulo-1'

const extension = '.md'; 

console.log('el directorio, ', directory)

const printListFiles = (directory) => {
    fs.readdir(directory, (err,list) => {
        if (err) return console.log(err)
        list.forEach( file => {
            if (path.extname(file) === extension) {
                console.log(file)
            }
        })
    });
}

printListFiles(directory)


module.exports = {
    
}

// const extension = `.${process.argv[3]}`; // ".md" 
// const extension = '.html'; 
// const directory = process.argv[2]
// const directory = process.argv
// const directory = 'C:\\Users\\Miria\\Desktop\\tate-node\\prueba-md-links\\Modulo-1\\Prueba\\functions\\mdLinks.js'



