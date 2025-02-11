"use strict";

import fs from "fs";
import path from "path";
import fetch from "node-fetch";

// Verifica si la ruta existe
export const isValidatedPath = (directory) => fs.existsSync(directory);

// Verificamos si la ruta es una carpeta
export const pathIsDirectory = (route) => {
  const statsObj = fs.lstatSync(route);
  return statsObj.isDirectory();
};

// Verificamos si la ruta es un archivo
export const pathIsFile = (route) => {
  const statsObj = fs.lstatSync(route);
  return statsObj.isFile();
};

// Verificamos si la ruta es absoluta
export const convertPathAbsolute = (url) =>
  !path.isAbsolute(url) ? path.resolve(url) : url;

// fs.readFileSync : Metodo Síncrono que se encarga de leer el contenido de un archivo específico
export const readFile = (file) => {
  return fs.readFileSync(file, "utf-8");
};

export const listOfLinks = (path) => {
  const absolutePath = convertPathAbsolute(path);

  const fileContent = readFile(absolutePath);

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
      file: absolutePath,
    });
  }

  return links;
};

export const validatedLink = (link) => {
  return new Promise((resolve) => {
    fetch(link.href)
      .then((response) => {
        link.statusCode = response.status;
        link.message = "Ok";
        resolve(link);
      })
      .catch((err) => {
        link.statusCode = 404;
        link.message = "Fail";
        resolve(link);
      });
  });
};

export const validatedLinks = (links) => {
  return new Promise((resolve) => {
    // es un array de promesas
    const newLinks = [];

    links.forEach((link) => newLinks.push(validatedLink(link)));

    return Promise.all(newLinks)
      .then((res) => resolve(res))
      .catch((err) => err);
  });
};

export const getMDFiles = (files) => {
  const mdFiles = files.filter((file) => path.extname(file) === ".md");
  return mdFiles.length > 0 ? mdFiles : [];
};

export const getAllFilesRecursively = (ruta) => {
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
