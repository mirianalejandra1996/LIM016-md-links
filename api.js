const fs = require("fs");
const path = require("path");

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

const readDirPromise = (route) =>
  new Promise((resolve, reject) => {
    fs.readdir(route, (err, archivos) => {
      if (err) {
        reject(err);
      } else {
        resolve(archivos);
      }
    });
  });

const readDirectory = async (route) => {
  const items = await readDirPromise(route);
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

// Filtra archivos md
const filtrarMd = (archivos) => {
  return archivos.filter((archivo) => {
    return path.extname(archivo) == ".md";
  });
};

// const readFile = fs.readFileSync(file,'utf-8')


module.exports = {
  rutaExiste,
  rutaAbsoluta,
  convertirAbsoluta,
  listArchivosMD,
};
