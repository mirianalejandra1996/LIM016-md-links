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
  errorMessage,
} from "./messages.js";

welcome();

// Si solo quiere saber la version
// md-links -v
program.name("md-links").description("CLI to check links of markdown files");
// .version(
//   "1.0.0",
//   "-v, --version",
//   "Shows the current version of the npm package 'md-links'"
// );

// ! ---------------
program
  .argument("[ruta]") //En caso que no coloque ninguna ruta
  .option("-s,--stats", "Muestra links totales, únicos y rotos")
  .option("-va,--validate", "Muestra links validados (ok y statusCode)")
  .option("-h,--help", "output help message")
  // prueba con version
  .option(
    "-v,--version",
    "Shows the current version of the npm package 'md-links'"
  );
// ! ---------------

program.configureOutput({
  writeOut: (str) =>
    process.stdout.write(`The version of this package is ${str}`),
  writeErr: (str) => process.stdout.write(`😞  ${str}\n`),

  // Output errors in red (errorMessage fn())
  outputError: (str, write) => {
    write(errorMessage(str));
    help();
  },
});

program.parse(process.argv);

const options = program.opts();

// ! si escribe dos rutas pero no escribe ninguna opcion
// md-links .some/example.md .some/example2.md
if (program.args.length > 1) {
  console.log(console.log(errorMessage("Solo puede ingresar una ruta")));
  help();
}
// ? NUEVO EN CASO QUE HAYA ESCRITO MAS DE DOS OPCIONES
else if (Object.keys(options).length > 2) {
  console.log(console.log(errorMessage("Error al ingresar opciones")));
  help();
}

// ! Si desea recibir ayuda, entonces puede escribir
// md-links -h o --help
else if (options.help) {
  if (program.args.length >= 1) {
    // console.log("The version of this package is 1.0.0");
    console.log(
      errorMessage(
        "Parece que ingresaste una ruta, recuerda que al seleccionar la opción --help mostrará this help"
      )
    );
    help();
  }
  // Si solo tiene la opción -v
  else if (Object.keys(options).length === 1) {
    console.log("Haz seleccionado el comando -h --help\n");
    help();
  }
  // Si tiene más de una opción seleccionada como -h -v o cualquier otra con -h
  else if (Object.keys(options).length > 1) {
    console.log("y esto");
    console.log(
      errorMessage(
        "Error: You've selected the --help option and another command, Enter only -h or --help for help"
      )
    );
    help();
  }
}
// ! Si quiere conocer la versión del paquete
// md-links -v o md-links --version
else if (options.version) {
  // Si tiene más de una opción seleccionada como -v -s o cualquier otra con -v
  if (Object.keys(options).length > 1) {
    console.log(
      errorMessage(
        "Error: You've selected the --version option and another command, Enter only -v or --version to display the version of md-links package"
      )
    );
    help();
  } else if (program.args.length >= 1) {
    console.log(
      errorMessage(
        "Para conocer la versión solo escriba md-links -v or md-links --version"
      )
    );
    help();
  }
  // No puede colocar ninguna ruta (length === 0)
  else {
    console.log("The version of this package is 1.0.0");
  }
}

// ! si no escribe ninguna opcion pero si tiene una ruta
// md-links .some/example.md
else if (Object.keys(options).length === 0) {
  // console.log("no entró ninguna opcion");

  if (program.args.length === 0) {
    // si no escribe ninguna opcion ni una ruta
    // md-links
    console.log(errorMessage("Ingrese una ruta o ingrese alguna opción"));
    help();
  } else if (program.args.length === 1) {
    mdLinks(program.args[0], { validate: false })
      .then((links) => {
        tableLinks(links);
      })
      .catch((err) => console.log(errorMessage(err)));
  }
}

// si selecciona --stats y --validate
// md-links .some/example.md -s -v
if (options.stats && options.validate) {
  if (program.args.length === 0) {
    // si no escribe ninguna una ruta
    // md-links -s -v
    console.log(errorMessage("Por favor ingrese una ruta"));
    help();
  } else {
    mdLinks(program.args[0], { validate: true })
      .then((links) => {
        statsValidate(links);
      })
      .catch((err) => console.log(errorMessage(err)));
  }
}
// si selecciona solo --stats
// md-links .some/example.md -s
else if (options.stats) {
  if (program.args.length === 0) {
    // si no escribe ninguna una ruta
    // md-links -s
    console.log(errorMessage("Por favor ingrese una ruta"));
    help();
  } else {
    mdLinks(program.args[0], { validate: true })
      .then((links) => {
        stats(links);
      })
      .catch((err) => console.log(errorMessage(err)));
  }
}

// si selecciona solo --validate
// md-links .some/example.md -v
else if (options.validate) {
  if (program.args.length === 0) {
    // si no escribe ninguna una ruta
    // md-links -v
    console.log(errorMessage("Por favor ingrese una ruta"));
    help();
  } else {
    mdLinks(program.args[0], { validate: true })
      .then((links) => {
        // stats(links);
        tableLinksValidated(links);
      })
      .catch((err) => console.log(errorMessage(err)));
  }
}

// !--------------!respaldo
// // todo: HACER CONDICIONAL SI ESCRIBO SOLO PARA VER LA VERSIÓN -V
// if (options.help) {
//   help();
// } else if ((options.stats || options.validate) && program.args.length === 0) {
//   console.log(console.log(errorMessage("Por favor ingrese una ruta")));
// } else if (
//   (options.stats && program.args.length > 1) ||
//   (options.validate && program.args.length > 1)
// ) {
//   console.log(console.log(errorMessage("Solo puede ingresar una ruta")));
// } /*else if (options.help && program.args.length === 0) {
//   help();
// } */ else if (!options.stats && !options.validate) {
//   mdLinks(program.args[0], { validate: false })
//     .then((links) => {
//       tableLinks(links);
//     })
//     .catch((err) => console.log(errorMessage(err)));
// } else if (options.stats && options.validate) {
//   mdLinks(program.args[0], { validate: true })
//     .then((links) => {
//       statsValidate(links);
//     })
//     .catch((err) => console.log(errorMessage(err)));
// } else if (options.stats) {
//   mdLinks(program.args[0], { validate: true })
//     .then((links) => {
//       stats(links);
//     })
//     .catch((err) => console.log(errorMessage(err)));
// } else if (options.validate) {
//   mdLinks(program.args[0], { validate: true })
//     .then((links) => {
//       tableLinksValidated(links);
//     })
//     .catch((err) => console.log(errorMessage(err)));
// }

console.log("este es options, ", options);
console.log("mira mis argumentos", program.args);
