
const fs = require('fs')
const path = require('path') 
//const fetch = require('node-fetch'); 



// fs.readFile(archivo, () => {

// })
const rutaAbsoluta = (ar) => {return path.resolve(__dirname, ar) }

const dirExist = () => {}

const isFile = () => {}

const listFiles = (nr) => {
fs.readFile(nr, () => {
console.log(nr)
})
}

const mdlinks = () => {
   // return console.log("hola");
}

module.exports = {
    rutaAbsoluta,
    listFiles
};