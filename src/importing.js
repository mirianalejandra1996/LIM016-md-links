import {extractedLinks, printMdFiles, isValidatedPath, getDirName, isPathAbsolute,
    pathIsDirectory, convertPathAbsolute, readLinks, validatedLinks} from "./functions.js";

// const file = 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos\\filemd2.md'
const file2 = 'filemd2.md'
const directory = 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos';
const directory2 = 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr';
const file = 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos\\filemd2.md';
// const file = 'filemd2.md';
const emptyFile = 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos\\emptymd.md';
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
    //   href: 'http://www.tedeopikachusd.com',
      href: 'www.google.com',
    //   href: 'http://google.com',
    //   href: 'https://google.com',
      file: 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos\\filemd2.md'
    },
    {
      text: 'fourth link',
      href: 'www.gifuaosiufsd.com',
      file: 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos\\filemd2.md'
    }
  ];

// console.log(isValidatedPath(directory))

// printMdFiles(directory).then(res => console.log(res)).catch(err => console.log(err))
// printMdFiles(directory2).then(res => console.log(res)).catch(err => console.log(err))

// extractedLinks(file).then(res => console.log(res)).catch(err => console.log(err))
// extractedLinks(emptyFile).then(res => console.log(res)).catch(err => console.log(err))

// validatedLinks(arraysitos, false).then(res => {
// // validatedLinks(arraysitos, true).then(res => {
//     console.log(res)
// }).catch(err => console.log(err))

// TODO: consultar si la ruta debe ser normalizada (hay rutas con doble \\ y otras con /)
// console.log(isValidatedPath('functions.js'))
// console.log(isValidatedPath(convertPathAbsolute('functions.js')))
console.log(isValidatedPath(convertPathAbsolute('README.md')))

// console.log('nueva ruta absoluta prueba, ', convertPathAbsolute('functions.js'));
// console.log('nueva ruta absoluta prueba, ', convertPathAbsolute('filemd2.md'));
// ! Cuando debería ser => C:\Users\Miria\Desktop\MD-LINKS\LIM016-md-links\README.md
// console.log('nueva ruta absoluta prueba mirian, ', convertPathAbsolute('README.md'));
// ! Cuando debería ser la misma ingresada => C:\Users\Miria\Desktop\MD-LINKS\LIM016-md-links\README.md
// console.log('nueva ruta absoluta prueba, ', convertPathAbsolute('C:\Users\Miria\Desktop\MD-LINKS\LIM016-md-links\README.md'));

console.log(convertPathAbsolute('functions.js'))
console.log('deberia dar true ' , isValidatedPath(convertPathAbsolute('functions.js')))
// console.log(convertPathAbsolute('README.md'))
console.log(convertPathAbsolute('fake/functions.js'))
console.log('deberia dar false ' , isValidatedPath(convertPathAbsolute('fake/functions.js')))

// console.log('directorio nombre, ', getDirName(file))

// console.log('¿es absoluta la ruta? => ', isPathAbsolute(file2))
// console.log('¿es absoluta la ruta? => ', isPathAbsolute(file))

// console.log('¿es directorio la ruta? => ', pathIsDirectory(file))


