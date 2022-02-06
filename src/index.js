const api = require("./api.js");

  let path = "prueba";
// let directorio = 'Prueba/directorio'
// /Users/lucero/Projectos/LIM016-md-links/Prueba

if (api.rutaExiste(path)) {
api.listLinks(path).then((links)=>{
 console.log("array de links",links)  
})
} else {
  console.log("la ruta no existe");
}


// const mdlinks = (path) => {
//     return new Promise ((res,rej) => {
//       if (api.rutaExiste(path)) {
//         absolutePath = api.convertirAbsoluta(path);
//         api.listArchivosMD(path, (err, archivosMD)=> {
//             if(err) {
//                 console.log(err)
//             } else {
//                 archivosMD.forEach(file => {     
//                 let data =  api.readFiles(file)
//                 let markDown = api.dataToHtml(data)
//                 let links = api.getLinks(file,markDown)
//                 console.log("si validar es false",validacion)
//                 let validacion = api.validatelinks(links)
//                 res(validacion)
//                 console.log("si validar es true",validacion)
//                 });  
//             }
//         })
//       } else {
//         console.log("la ruta no existe");
//       }
//     })
// };

// module.exports = mdlinks
