const api = require("./api.js");

//let path = "prueba";
// let directorio = 'Prueba/directorio'
// /Users/lucero/Projectos/LIM016-md-links/Prueba

const mdlinks = (path, option) => {
  return new Promise((res, rej) => {
    if (api.rutaExiste(path)) {
      if (option == undefined || option.validate == false) {
        api.listLinks(path)
        .then((links) =>  res(links))
        .catch((error) => rej(error))
      } else {
        //CALLBACK HELL : NO HACER ESTO
        // api.listLinks(path)
        // .then((links) => {
        //   api.validatelinks(links)
        //   .then((linksValidados) => {
        //       res(linksValidados)
        //     })
        // })
        api.listLinks(path)
        .then((links) => api.validatelinks(links))
        .then((linksValidados) => res(linksValidados))
      }
    } else {
      rej(new Error("La ruta no existe"));
    }
  })
};

module.exports = mdlinks
