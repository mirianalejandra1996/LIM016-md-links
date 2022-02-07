import { mdLinks } from "./mdlinks.js";

// C:\Users\Miria\Desktop\MD-LINKS\LIM016-md-links\test\Archivos\filejs.js
// console.log(convertPathAbsolute("../test/Archivos"));
// // mdLinks("../test/Archivo23s")
// mdLinks("../test/ArchivosDañanosjdlskjsdlkfjsj", { validate: true })
// mdLinks("../test/Archivos", { validate: true });
// mdLinks("../test/Archivos", { validate: true })
// mdLinks("../test/Archivos/filejs.js", { validate: true })
//   // mdLinks("../test/Archivos", { validate: false })
// mdLinks("../test/Archivos/emptymd.md", { validate: true })
// mdLinks("../test/Archivos/emptyFolder", { validate: true })
// mdLinks("../test/Archivos/prueba", { validate: true })
//   // mdLinks("../test/Archivos", { validate: true })
//   // mdLinks('../test/rutaInexistente', { validate: true })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

const totalLinks = (links) => links.length;
const uniqueLinks = (links) => {
  return new Set(links.map((link) => link.href)).size;
};
// const brokenLinks = (links) => "broken";
const brokenLinks = (links) =>
  links.filter((link) => link.statusCode === 404).length;

// mdLinks("../test/Archivos", { validate: true })
mdLinks("../test/Archivos/filemd2.md", { validate: true })
  //   .then((res) => console.log(totalLinks(res)))
  //   .then((res) => console.log(uniqueLinks(res)))
  //   .then((res) => console.log(brokenLinks(res)))
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
