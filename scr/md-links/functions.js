// 'use strict'

// const fs = require('fs');
// const path = require('path')


// const file = 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos\\functions.js'
// const file = 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos\\filemd2.md'
// console.log(__dirname)

// const readFile = (file) => {

//     fs.readFile( file, (err,content) => {
//         if (err) return console.log('eeeeeeeeeee' , err)
        
//         const lines = content.toString();
//         console.log(lines)
//     });

// }

// readFile(file)

// const directory = 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos';

// const extension = '.md'; 

// console.log('el directorio, ', directory)

// const printListFiles = (directory) => {
//     fs.readdir(directory, (err,list) => {
//         if (err) return console.log(err)
//         list.forEach( file => {
//             if (path.extname(file) === extension) {
//                 console.log(file)
//             }
//         })
//     });
// }

// printListFiles(directory)


// module.exports = {
    
// }



// const extension = `.${process.argv[3]}`; // ".md" 
// const extension = '.html'; 
// const directory = process.argv[2]
// const directory = process.argv
// const directory = 'C:\\Users\\Miria\\Desktop\\tate-node\\prueba-md-links\\Modulo-1\\Prueba\\functions\\mdLinks.js'



export const sumar = (a, b) => a + b;

export const restar = (a, b) => a - b;

// export {sumar, restar}

// module.exports = sumar

// module.exports = { sumar, restar};
// export { sumar, restar};
// export default { sumar, restar};