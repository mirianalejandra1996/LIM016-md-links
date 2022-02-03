const api = require("./api.js");

let path = "Prueba";
// let directorio = 'Prueba/directorio'
// /Users/lucero/Projectos/LIM016-md-links/Prueba



if (api.rutaExiste(path)) {
    absolutePath = api.convertirAbsoluta(path);
   // console.log(absolutePath, "es una ruta absoluta");
    api.listArchivosMD(path, (err, archivosMD)=> {
        if(err) {
            console.log(err)
        } else {
            // console.log(archivosMD)
            archivosMD.forEach(file => {     
            data =  api.readFiles(file)
            //  console.log("texto",data)
             markDown = api.dataToHtml(data)
             links = api.getLinks(file,markDown)
            // console.log("array de objetos",links)
             api.validatelinks(links)
            });
            
        }
    })
  } else {
    console.log("la ruta no existe");
  }

// const mdlinks = () => {
//     return new Promise ((res,rej) => {
  
//     })
// };

// module.exports = {
// mdlinks
// };
