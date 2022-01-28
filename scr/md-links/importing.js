import {readContentFile, printListFiles, isValidatedPath, getDirName, isPathAbsolute,
    pathIsDirectory} from "./functions.js";

// const file = 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos\\filemd2.md'
const file2 = 'filemd2.md'
const directory = 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos';
const extension = '.md'; 
const file = 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos\\filemd2.md'


console.log(isValidatedPath(directory))
printListFiles(directory,extension)

readContentFile(file)

console.log('directorio nombre, ', getDirName(file))

console.log('¿es absoluta la ruta? => ', isPathAbsolute(file2))
console.log('¿es absoluta la ruta? => ', isPathAbsolute(file))

console.log('¿es directorio la ruta? => ', pathIsDirectory(file))

