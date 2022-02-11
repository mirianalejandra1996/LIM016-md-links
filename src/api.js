const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
md = new MarkdownIt();
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;
const fetch = require('node-fetch');


const ExistPath = (route) => {
  return fs.existsSync(route);
};

const toAbsolute = (route) => {
  return path.resolve(route);
};

const isFile = (route) => fs.statSync(route).isFile();
const isDirectory = (route) => fs.statSync(route).isDirectory();

//lee el directorio sincronamente
const readdirsync = (route) => {
  return fs.readdirSync(route)
}

//funcion asyncrona recursiva
const readDirectory = (route) => {
  const items = readdirsync(route);
  const itemsWithPath = items.map((archivoMd) => path.resolve(route, archivoMd));
  const filesMD = filterMD(itemsWithPath);
  const folders = itemsWithPath.filter(isDirectory);

  if (folders.length > 0) {
    const ArrayOfFiles = folders.map((folder) => readDirectory(folder));
    //  let archivosEnArrays =  Promise.all(promises);
    let flatFiles = ArrayOfFiles.flat();

    filesMD.push(...flatFiles);
  }
  return filesMD;
};

// Filtra archivos que tenga extension .md
const filterMD = (files) => {
  return files.filter((file) => {
    return path.extname(file) == ".md";
  });
};

const listFilesMD = (route) => {
  return new Promise((res, rej) => {
    let fileExist = isFile(route);
    if (fileExist) {
      let file = [path.basename(route)];
      let fileMD = filterMD(file);
      if (fileMD.length == 0) {
        rej(new Error("its not a file MD"))
      } else {
        res([route])
      }
    } else {
        let filesMD = readDirectory(route)
        if (filesMD.length == 0)
          rej(new Error("theres no files in this directory"))
        else {
          res(filesMD)
        }
    }
  })
};

// READ THE DIRECTPRY ASYNC 
// const readDirPromise = (route) =>
//   new Promise((resolve, reject) => {
//     fs.readdir(route, (err, files) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(files);
//       }
//     });
//   });

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

const validateLinks = (links) => {
  const linksWithValidation = links.map((link) => {
    return fetch(link.href)
      .then((res) => {
        if (res.status >= 200 && res.status < 400) {
          return {
            ...link,
            status: res.status,
            message: res.statusText
          }
        } else if (res.status >= 400 && res.status <= 500) {
          return {
            ...link,
            status: res.status,
            message: res.statusText
          }
        }
      }).catch(() => {
        return {
          ...link,
          status: 'Doesnt Respond',
          message: 'Fail'
        }
      })
  })
  return Promise.all(linksWithValidation)
}

const listLinks = (path) => {
  const absolutePath = toAbsolute(path);
  return listFilesMD(absolutePath)
    .then((files) => {
      let arrLinksObj = []
      files.forEach((file) => {
        const data = readFiles(file)
        let markDown = dataToHtml(data)
        arrLinksObj.push(...getLinks(file, markDown))
      })
      return arrLinksObj
    })
}

module.exports = {
  ExistPath,
  toAbsolute,
  listFilesMD,
  filterMD,
  readDirectory,
  readFiles,
  dataToHtml,
  getLinks,
  listLinks,
  validateLinks,
};
