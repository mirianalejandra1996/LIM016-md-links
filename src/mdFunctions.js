"use strict";

import fs from "fs";
import path from "path";
import fetch from "node-fetch";

// Verifica si la ruta existe
const isValidatedPath = (directory) => fs.existsSync(directory);

const readLinks = (fileContent, filePath) => {
  const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;

  const matches = fileContent.match(regexMdLinks);

  if (!matches) return [];

  const singleMatch = /\[([^\[]+)\]\((.*)\)/;
  const links = [];
  for (var i = 0; i < matches.length; i++) {
    var text = singleMatch.exec(matches[i]);

    links.push({
      text: text[1],
      href: text[2],
      file: filePath,
    });
  }

  return links;
};

// fs.readFile : Metodo Asincrono que se encarga de leer el contenido de un archivo específico
// extractedLinks extrae en un array los links de un archivo
const extractedLinks = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, content) => {
      if (err) reject("Problemas en lectura de archivo, ", err);

      const lines = content.toString();
      const links = readLinks(lines, file);

      if (links.length === 0) {
        return reject("no link in this file");
      }
      // console.log(links)
      resolve(links);
    });
  });
};

// Verificamos si la ruta es absoluta
const isPathAbsolute = (url) => path.isAbsolute(url);

// Verificamos si la ruta es una carpeta
const pathIsDirectory = (route) => {
  // With lstatSync or lstat (Asyncronous method) I can  get the details (information)
  // of a symbolic link to a file.
  const statsObj = fs.lstatSync(route);
  return statsObj.isDirectory();
};

// Verificamos si la ruta es un archivo
const pathIsFile = (route) => {
  const statsObj = fs.lstatSync(route);
  return statsObj.isFile();
};

const convertPathAbsolute = (ruta) =>
  !isPathAbsolute(ruta) ? path.resolve(ruta) : ruta;

const validatedLink = (link) => {
  return new Promise((resolve, reject) => {
    fetch(link.href)
      .then((response) => {
        (link.statusCode = response.status), (link.message = "Ok");
        resolve(link);
      })
      .catch((err) => {
        (link.statusCode = 404), (link.message = "Fail");
        resolve(link);
      });

    if (!link) reject("No links found");
  });
};

const validatedLinks = (links) => {
  return new Promise((resolve, reject) => {
    // es un array de promesas
    const newLinks = [];

    links.forEach((link) => newLinks.push(validatedLink(link)));

    return Promise.all(newLinks)
      .then((res) => resolve(res))
      .catch((err) => err);
  });
};

const getMDFiles = (files) => {
  const mdFiles = files.filter((file) => path.extname(file) === ".md");
  return mdFiles.length > 0 ? mdFiles : [];
};

const getAllFilesRecursively = (ruta) => {
  let filesArr = [];
  // Si la ruta es un archivo lo pushea en mi array
  if (pathIsFile(ruta)) {
    return [ruta];
  }
  // entonces es absoluta (pathIsDirectory(ruta))
  const files = fs.readdirSync(ruta);

  files.forEach((file) => {
    const newPath = path.join(ruta, file);
    filesArr.push(getAllFilesRecursively(newPath));
  });

  return filesArr.flat();
};

export {
  isValidatedPath,
  readLinks,
  extractedLinks,
  isPathAbsolute,
  pathIsFile,
  convertPathAbsolute,
  validatedLink,
  validatedLinks,
  getMDFiles,
  getAllFilesRecursively,
};
