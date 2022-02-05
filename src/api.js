const fs = require("fs");
const path = require("path");
const MarkdownIt = require('markdown-it');
md = new MarkdownIt();
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;
const fetch = require('node-fetch');


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


const listArchivosMD = (route, cb) => {
    let esArchivo = isFile(route);
    if (esArchivo) {
      let archivo = [path.basename(route)];
      let archivoMd = filtrarMd(archivo);
      if (archivoMd.length == 0) {
        cb(new Error("no es un archivo MD"), null)
      } else {
        cb(null, [route])
      }
    } else {
      try {
        let archivosMD = readDirectory(route)
        if (archivosMD.length == 0)
          cb(new Error("no hay archivos en este directorio"), null)
        else cb(null, archivosMD)

      } catch (error) {
          cb(error, null)
        }
      }
    };

    //lee el directorio sincronamente
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
    const readDirectory = (route) => {
      const items = readdirsync(route);
      const itemsConPath = items.map((archivoMd) => path.resolve(route, archivoMd));
      const archivosMD = filtrarMd(itemsConPath);
      const folders = itemsConPath.filter(isDirectory);

      if (folders.length > 0) {
        const archivosEnArrays = folders.map((folder) => readDirectory(folder));
        //  let archivosEnArrays =  Promise.all(promises);
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

    // Devuelve la data del los archivos MD syncronamnete xd
    const readFiles = (file) => {
      return fs.readFileSync(file, 'utf-8')
    }

    const dataToHtml = (data) => {
      return md.render(data);
    }

    const getLinks = (file, html) => {
      let links = []
      let dom = new JSDOM(html)
      const anchors = (dom).window.document.querySelectorAll("a")
      anchors.forEach((a) => {
        links.push({
          href: a.href,
          text: a.textContent,
          file: file
        })
      })
      return links
    }


    const validatelinks = (links) => {
      const linksValidados = links.map((link) => {
        // console.log("estoy en map",link.href)
        return fetch(link.href)
          .then((res) => {
            // console.log(res.status)
            //   console.log(res.statusText)
            if (res.status == 200){
            //  console.log("objetos", linkStatus)
              // console.log(
              //   '───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───',
              //   '\n───█▒▒░░░░░░░░░▒▒█───',
              //   '\n────█░░█░░░░░█░░█────',
              //   '\n─▄▄──█░░░▀█▀░░░█──▄▄─',
              //   '\n █░░█─▀▄░░░░░░░▄▀─█░░█'
              // )
            //  console.log('array destructurado',{...link, status:res.status, mensaje:'nice'+res.statusText})
              return {...link, status:res.status, mensaje:'nice'+res.statusText}
            } else {
            //  console.log('array destructurado',{...link, status:res.status, mensaje:'fail'+res.statusText})
              return {...link, status:res.status, mensaje:'fail'+res.statusText}
            }
          })
          .catch(err => console.log(err));

      })
      //console.log(linksValidados)
      return linksValidados
    }

    module.exports = {
      rutaExiste,
      rutaAbsoluta,
      convertirAbsoluta,
      listArchivosMD,
      readDirectory,
      readFiles,
      dataToHtml,
      getLinks,
      validatelinks
    };
