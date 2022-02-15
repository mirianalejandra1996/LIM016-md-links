import {
  convertPathAbsolute,
  isValidatedPath,
  getAllFilesRecursively,
  validatedLinks,
  getMDFiles,
  listOfLinks,
} from "./mdFunctions.js";

// ! -------------------------------------------------------------------------------
export const mdLinks = (path, options) => {
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
        // console.log("allFiles", allFiles);

        // console.log("miraaaaa mis MDFILES , ", mdFiles);
        if (mdFiles.length === 0) {
          reject("No existen archivos MD en la ruta ingresada");
        } else {
          // console.log("mdFiles", mdFiles);

          const links = [];
          mdFiles.forEach((file) => {
            links.push(...listOfLinks(file));
          });

          if (links.length === 0) {
            reject("No existen links en la ruta ingresada");
          } else {
            if (options.validate) {
              resolve(validatedLinks(links));
            } else {
              resolve(links);
            }
          }
        }
      }
    }
  });
};

// ! -----------------------------------------------------------------------------------------
// C:\Users\Miria\Desktop\MD-LINKS\LIM016-md-links\test\Archivos\filejs.js
// console.log(convertPathAbsolute("../test/Archivos"));
// // mdLinks("../test/Archivo23s")
// mdLinks("../test/ArchivosDañanosjdlskjsdlkfjsj", { validate: true })
// mdLinks("../test/Archivos", { validate: true })
// mdLinks("../test/Archivos", { validate: true })
// mdLinks("../test/Archivos/filejs.js", { validate: true })
//   // mdLinks("../test/Archivos", { validate: false })
// mdLinks("../test/Archivos/emptymd.md", { validate: true })
// mdLinks("../test/Archivos/emptyFolder", { validate: true })
// mdLinks("../test/Archivos/prueba", { validate: true })
//   // mdLinks("../test/Archivos", { validate: true })
//   // mdLinks('../test/rutaInexistente', { validate: true })
// mdLinks("./test/Archivos", { validate: true })
// mdLinks("./test/Archivos/emptymd.md", { validate: true })
// mdLinks("./test/Archivos/filemd2.md", { validate: true })
// mdLinks("./test/Archivos", { validate: false })
// mdLinks("./test/Archivos", { validate: true })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
