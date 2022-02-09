#!/usr/bin/env node

import { mdLinks } from "./mdlinks.js";
import { program } from "commander";
import chalk from "chalk";
// import {version} from "../package.json"
const [, , ...args] = process.argv;

const totalLinks = (links) => links.length;
const uniqueLinks = (links) => {
  return new Set(links.map((link) => link.href)).size;
};
const brokenLinks = (links) =>
  links.filter((link) => link.statusCode === 404).length;

// mdLinks("../test/Archivos", { validate: true })
// mdLinks("../test/Archivos/filemd2.md", { validate: true })
//   .then((res) => console.log(totalLinks(res)))
// .then((res) => console.log(uniqueLinks(res)))
// .then((res) => console.log(brokenLinks(res)))
// .then((res) => console.log(res))
// .catch((err) => console.log(err));

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

program
  .argument("[ruta]") //En caso que no coloque ninguna ruta
  .option("--stats", "Muestra links totales, únicos y rotos")
  .option("--validate", "Muestra links validados (ok y statusCode)")
  .option("--help", "output help message");

program.parse(process.argv);

const options = program.opts();
console.log("mira mis opciones ", options);
console.log("mira mis argumentos", program.args);
// console.log("mira mis argumentos", program.args[0]);

// !-------------------------------------------------------------------------------------------
// md-links ./some/example.md --validate
// md-links ./some/example.md --stats
// md-links ./some/example.md --stats --validate
