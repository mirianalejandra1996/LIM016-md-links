#!/usr/bin/env node

import { mdLinks } from "./mdlinks.js";
import { program } from "commander";
import chalk from "chalk";
// import CFonts from "cfonts";

import { welcome } from "./messages.js";

// import {version} from "../package.json"
const [, , ...args] = process.argv;

const totalLinks = (links) => links.length;
const uniqueLinks = (links) => {
  return new Set(links.map((link) => link.href)).size;
};
const brokenLinks = (links) =>
  links.filter((link) => link.statusCode === 404).length;

// !-------------------------------------------------------------------------------------------

program
  .name("miale-links")
  .description("CLI to check links of markdown files")
  .version(
    "1.0.0",
    "-v, --version",
    "Muestra la versión actual del paquete NPM 'miale-links'"
  );

// !-------------------------------------------------------------------------------------------
// mdLinks("../test/Archivos", { validate: true })
// mdLinks("../test/Archivos/filemd2.md", { validate: true })

program
  .argument("[ruta]") //En caso que no coloque ninguna ruta
  .option("--stats", "Muestra links totales, únicos y rotos")
  .option("--validate", "Muestra links validados (ok y statusCode)")
  .option("--help", "output help message");

program.parse(process.argv);

const options = program.opts();
// console.log("mira mis opciones ", options);
// console.log("mira mis argumentos", program.args);
// console.log("mira mis argumentos", program.args[0]);

if ((options.stats || options.validate) && program.args.length === 0) {
  console.log("Por favor ingrese una ruta");
} else if ((options.stats || options.validate) && program.args.length > 0) {
  console.log("Solo puede ingresar una ruta");
} else if (options.help && program.args.length === 0) {
  console.log("pido ayuda");
} else if (!options.stats && !options.validate) {
  mdLinks(program.args[0], { validate: false })
    .then((links) => {
      links.forEach((link) => {
        console.log("Texto del link es: ", link.text);
        console.log("Href del link es: ", link.href);
        console.log("Archivo del link es: ", link.file);
        console.log("--------------------------------------------------------");
      });
    })
    .catch((err) => console.log(err));
} else if (options.stats && options.validate) {
  mdLinks(program.args[0], { validate: true })
    .then((links) => {
      console.log("total de links:", totalLinks(links));
      console.log("links unicos: ", uniqueLinks(links));
      console.log("links rotos: ", brokenLinks(links));
    })
    .catch((err) => console.log(err));
} else if (options.stats) {
  mdLinks(program.args[0], { validate: true })
    .then((links) => {
      console.log("total de links:", totalLinks(links));
      console.log("links unicos: ", uniqueLinks(links));
      // console.log("links rotos: ", brokenLinks(links));
    })
    .catch((err) => console.log(err));
} else if (options.validate) {
  mdLinks(program.args[0], { validate: true })
    .then((links) => {
      links.forEach((link) => {
        console.log("Texto del link es: ", link.text);
        console.log("Href del link es: ", link.href);
        console.log("Archivo del link es: ", link.file);
        console.log("el statusCode del link es: ", link.statusCode);
        console.log("el estado del link es: ", link.message);
        console.log("--------------------------------------------------------");
      });
    })
    .catch((err) => console.log(err));
}

// !-------------------------------------------------------------------------------------------
// md-links ./some/example.md --validate
// md-links ./some/example.md --stats
// md-links ./some/example.md --stats --validate

console.log(
  "Esta es una herramienta para la lectura y análisis archivos en formato MD"
);
console.log("Uso: miale-links <path> [option]");
console.log(`Options: 

--version, -v
Use to display the version of miale-links

--help, -h
Use to display this help

--validate, -va
Use to XXXXXXXXXXXXXXx

--stats, -s
Use to XXXXXXXXXXX

`);
console.log("Example: miale-links ./some/example.md --validate");
console.log("aaaa");
console.log("aaaa");
console.log("aaaa");
console.log("aaaa");
console.log("aaaa");
