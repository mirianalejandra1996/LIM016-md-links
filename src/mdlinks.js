import {
  convertPathAbsolute,
  isValidatedPath,
  getAllFilesRecursively,
  extractedLinks,
  validatedLinks,
  getMDFiles,
} from "./functions.js";

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (!isValidatedPath(path)) {
      reject("La ruta ingresada no existe");
    } else {
      let AbsolutePath = convertPathAbsolute(path);

      const allFiles = getAllFilesRecursively(AbsolutePath);

      if (allFiles.length === 0) {
        reject("No existe ningún archivo en la ruta ingresada");
      } else {
        const mdFiles = getMDFiles(allFiles);

        if (mdFiles.length === 0) {
          reject("No existen archivos MD en la ruta ingresada");
        } else {
          const getlinks = mdFiles.map((file) =>
            extractedLinks(file)
              .then((res) => res)
              .catch((err) => err)
          );

          Promise.all(getlinks)
            .then((links) => {
              return links.flat().filter((link) => typeof link === "object");
            })
            .then((data) => {
              return validatedLinks(data, options.validate);
            })
            .then((valLinks) => {
              return valLinks.length === 0
                ? reject("No existen links en la ruta ingresada")
                : resolve(valLinks);
            })
            .catch((err) => console.log(err));
        }
      }
    }
  });
};

// C:\Users\Miria\Desktop\MD-LINKS\LIM016-md-links\test\Archivos\filejs.js
console.log(convertPathAbsolute("../test/Archivos"));
// // mdLinks("../test/Archivo23s")
// mdLinks("../test/Archivos", { validate: true })
// mdLinks("../test/Archivos/filejs.js", { validate: true })
//   // mdLinks("../test/Archivos", { validate: false })
// mdLinks("../test/Archivos/emptymd.md", { validate: true })
//   mdLinks("../test/Archivos/emptyFolder", { validate: true })
mdLinks("../test/Archivos/prueba", { validate: true })
  //   // mdLinks("../test/Archivos", { validate: true })
  //   // mdLinks('../test/rutaInexistente', { validate: true })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
