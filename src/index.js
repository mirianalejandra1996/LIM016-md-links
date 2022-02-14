const api = require("./api.js");

const mdLinks = (path, option) => {
  return new Promise((res, rej) => {
    if (api.ExistPath(path)) {
      if (option == undefined || option.validate == false) {
        api.listLinks(path)
        .then((links) =>  res(links))
        .catch((error) => rej(error))
      } else {
        api.listLinks(path)
        .then((links) => api.validateLinks(links))
        .then((linksValidados) => res(linksValidados))
        .catch((error) => rej(error))
      }
    } else {
      rej(new Error("The path doesnt exist"));
    }
  })
};

module.exports = mdLinks
