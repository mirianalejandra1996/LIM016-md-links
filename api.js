const fs = require("fs");
const path = require("path");
const MarkdownIt = require('markdown-it');
md = new MarkdownIt();


const rutaExiste = (route) => {
  return fs.existsSync(route);
};

const rutaAbsoluta = (route) => {
  return path.isAbsolute(route);
};

const convertirAbsoluta = (route) => {
  return path.resolve(__dirname, route);
};

const isFile = (route) => fs.statSync(route).isFile();
const isDirectory = (route) => fs.statSync(route).isDirectory();
// const readDirec = (route) => fs.readdir(route, function (err, archivos) {
//     if (err) {
//     onError(err);
//     return archivos;
//     }
//     console.log(archivos);
//     });

const listArchivosMD = (route, cb) => {
  let esArchivo = isFile(route);
  if (esArchivo) {
    let archivo = [path.basename(route)];
    console.log(archivo);
    archivoMd = filtrarMd(archivo);
    if (archivoMd.length == 0) {
      cb(new Error("no es un archivo MD"), null)
    } else {
      cb(null, [route])
    }
  } else {
    readDirectory(route)
      .then(archivosMD => {
        if (archivosMD.length == 0)
          cb(new Error("no hay archivos en este directorio"), null)
        else cb(null, archivosMD)
      })
      .catch(err => {
        cb(err, null)
      })
  }
};

//le el directorio sincronamente
const readdirsync = (route) => {
  return fs.readdirSync(route)
}

// lee el directorio asyncronamente
// const readDirPromise = (route) =>
//   new Promise((resolve, reject) => {
//     fs.readdir(route, (err, archivos) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(archivos);
//       }
//     });
//   });


//funcion asyncrona recursiva
const readDirectory = async (route) => {
  const items = readdirsync(route);
  const itemsConPath = items.map((archivoMd) => path.resolve(route, archivoMd));
  const archivosMD = filtrarMd(itemsConPath);
  const folders = itemsConPath.filter(isDirectory);

  if (folders.length > 0) {
    const promises = folders.map((folder) => readDirectory(folder));
    let archivosEnArrays = await Promise.all(promises);
    let archivosAplanados = archivosEnArrays.flat();

    archivosMD.push(...archivosAplanados);
  }

  return archivosMD;
};

// Filtra archivos que tenga extension .md
const filtrarMd = (archivos) => {
  return archivos.filter((archivo) => {
    return path.extname(archivo) == ".md";
  });
};

// Devuelve la data del los archivos MD
const readFiles = (file) => {
  return fs.readFileSync(file, 'utf-8')
}

const deveulveHtml = (data) =>{
return md.render(data);
}

module.exports = {
  rutaExiste,
  rutaAbsoluta,
  convertirAbsoluta,
  listArchivosMD,
  readFiles,
  deveulveHtml
};
