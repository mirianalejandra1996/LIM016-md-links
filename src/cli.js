#!/usr/bin/env node

import { mdLinks } from "./mdlinks.js";
import { program } from "commander";
import {
  welcome,
  help,
  statsValidate,
  stats,
  tableLinksValidated,
  tableLinks,
} from "./messages.js";
// import {version} from "../package.json"

welcome();
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
  .option("-s,--stats", "Muestra links totales, únicos y rotos")
  .option("-va,--validate", "Muestra links validados (ok y statusCode)")
  .option("-h,--help", "output help message");

function errorColor(str) {
  // Add ANSI escape codes to display text in red.
  return `\x1b[31m${str}\x1b[0m`;
}

program.configureOutput({
  writeOut: (str) => process.stdout.write(`[OUT] ${str}`),
  writeErr: (str) => process.stdout.write(`😞   ${str}\n`),

  // Output errors in red.
  outputError: (str, write) => {
    write(errorColor(str));
    help();
  },
});


program.parse(process.argv);

const options = program.opts();
// console.log("este es options, ", options);
// console.log("mira mis argumentos", program.args);

// todo: HACER CONDICIONAL SI ESCRIBO SOLO PARA VER LA VERSIÓN -V
if (options.help) {
  help();
} else if ((options.stats || options.validate) && program.args.length === 0) {
  console.log("Por favor ingrese una ruta");
} else if (
  (options.stats && program.args.length > 1) ||
  (options.validate && program.args.length > 1)
) {
  console.log("Solo puede ingresar una ruta");
} /*else if (options.help && program.args.length === 0) {
  help();
} */ else if (!options.stats && !options.validate) {
  mdLinks(program.args[0], { validate: false })
    .then((links) => {
      tableLinks(links);
      // tableLinksValidated(links);
    })
    .catch((err) => console.log(err));
} else if (options.stats && options.validate) {
  mdLinks(program.args[0], { validate: true })
    .then((links) => {
      statsValidate(links);
    })
    .catch((err) => console.log(err));
} else if (options.stats) {
  mdLinks(program.args[0], { validate: true })
    .then((links) => {
      stats(links);
    })
    .catch((err) => console.log(err));
} else if (options.validate) {
  mdLinks(program.args[0], { validate: true })
    .then((links) => {
      tableLinksValidated(links);
    })
    .catch((err) => console.log(err));
}

// !-------------------------------------------------------------------------------------------
// md-links ./some/example.md --validate
// md-links ./some/example.md --stats
// md-links ./some/example.md --stats --validate
