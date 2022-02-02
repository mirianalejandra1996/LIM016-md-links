const md = require("./api.js");

let path = "Prueba";
// let directorio = 'Prueba/directorio'
// /Users/lucero/Projectos/LIM016-md-links/Prueba


if (md.rutaExiste(path)) {
  absolutePath = md.convertirAbsoluta(path);
  console.log(absolutePath, "es una ruta absoluta");
  md.listArchivosMD(path, (err, archivosMD)=> {
      if(err) {
          console.log(err)
      } else {
          console.log(archivosMD)
      }
  })
//   respuesta = md.isFile(absolutePath);
//  if (respuesta) {
//     console.log("es archivo");
    
//   } else {
//     console.log("es directorio");
//     md.readDirec(absolutePath, (err, archivosMd) => {
//       if (err) console.log('no tiene archivos');
//       else if (archivosMd.length == 0) console.log("no hay archivos en este directorio")
//       else console.log("tiene archivos", archivosMd);
//     });
//   } 
} else {
  console.log("la ruta no existe");
}

// const mdlinks = () => {
//     return new Promise ((res,rej) => {
//         aqui va el codigo
//     })
// };

// module.exports = {
// mdlinks
// };
