const api = require("./api.js");

//let path = "prueba";
// let directorio = 'Prueba/directorio'
// /Users/lucero/Projectos/LIM016-md-links/Prueba

const mdlinks = (path, option) => {
  return new Promise((res, rej) => {
    if (api.rutaExiste(path)) {
      if (option == undefined || option.validate == false) {
        api.listLinks(path).then((links) => {
          res(links)
        })
      } else {
        api.listLinks(path).then((links) => {
          api.validatelinks(links)
            .then((linksValidados) => {
              res(linksValidados)
            })
        })
      }
    } else {
      res("la ruta no existe");
    }
  })
};

module.exports = mdlinks
