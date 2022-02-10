#!/usr/bin/env node

import { mdLinks } from "./mdlinks.js";
import { program } from "commander";
import { createSpinner } from "nanospinner";
import {
  welcome,
  help,
  statsValidate,
  stats,
  tableLinksValidated,
  tableLinks,
  errorMessage,
  outputMessage,
} from "./messages.js";

welcome();
// !------------------------------------------------

const spinner = createSpinner("Loading request\n").start();

function handleAnswer(isCorrect) {
  if (isCorrect) {
    spinner.success({ text: `Process was completed successfully!` });
    process.exit(0);
  } else {
    process.exit(1);
  }
}

// !------------------------------------------------
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
  .option(
    "-v,--version",
    "Shows the current version of the npm package 'md-links'"
  );
// ! ---------------

program.configureOutput({
  // writeOut: (str) =>
  // process.stdout.write(`The version of this package is ${str}`),
  writeErr: (str) => process.stdout.write(`\n${str}`),

  // Output errors in red (errorMessage fn())
  outputError: (str, write) => {
    // write(errorMessage(str));
    write(errorMessage(`✖   ${str}\n`));
    help();
  },
});

program.parse(process.argv);

const options = program.opts();

// ! si escribe dos rutas pero no escribe ninguna opcion
// md-links .some/example.md .some/example2.md
if (program.args.length > 1) {
  console.log(errorMessage("\n✖  Error: You can only enter one path\n"));
  help();
  handleAnswer(false);
}

// EN CASO QUE HAYA ESCRITO MAS DE DOS OPCIONES
if (Object.keys(options).length > 2) {
  console.log(errorMessage("\n✖  Error: Too much options\n"));
  help();
  handleAnswer(false);
} else {
  // SOLO HA SELECCIONADO DOS OPCIONES
  //
  // ! Si desea recibir ayuda, entonces puede escribir
  // md-links -h o --help
  if (options.help) {
    if (program.args.length >= 1) {
      // console.log("The version of this package is 1.0.0");
      console.log(
        errorMessage(
          "\n✖  Error:Parece que ingresaste una ruta, recuerda que al seleccionar la opción --help mostrará this help\n"
        )
      );
      help();
      handleAnswer(false);
    }
    // Si solo tiene la opción -v
    else if (Object.keys(options).length === 1) {
      console.log("\nYou've selected the --help option\n");
      help();
      handleAnswer(false);
    }
    // Si tiene más de una opción seleccionada como -h -v o cualquier otra con -h
    else if (Object.keys(options).length > 1) {
      console.log("y esto");
      console.log(
        errorMessage(
          "\n✖  Error: You've selected the --help option and another command, Enter only -h or --help for help\n"
        )
      );
      help();
      handleAnswer(false);
    }
  }
  // ! Si quiere conocer la versión del paquete
  // md-links -v o md-links --version
  else if (options.version) {
    // Si tiene más de una opción seleccionada como -v -s o cualquier otra con -v
    if (Object.keys(options).length > 1) {
      console.log(
        errorMessage(
          "\n✖  Error: You've selected the --version option and another command, Enter only -v or --version to display the version of this md-links package\n"
        )
      );
      help();
      handleAnswer(false);
    } else if (program.args.length >= 1) {
      console.log(
        errorMessage(
          "\n✖  Error: To display the package version just type md-links -v or md-links --version\n"
        )
      );
      help();
      handleAnswer(false);
    }
    // No debe colocar ninguna ruta (length === 0) para conocer la version del paquete
    else {
      console.log("\nThe version of this package is 1.0.0\n");
      handleAnswer(false);
    }
  }

  // ! si no escribe ninguna opcion pero si tiene una ruta
  // md-links .some/example.md
  else if (Object.keys(options).length === 0) {
    // console.log("no entró ninguna opcion");

    if (program.args.length === 0) {
      // si no escribe ninguna opcion ni una ruta
      // md-links
      console.log(
        errorMessage("\n✖  Error: Enter a path or enter an option\n")
      );
      help();
      handleAnswer(false);
    } else if (program.args.length === 1) {
      mdLinks(program.args[0], { validate: false })
        .then((links) => {
          tableLinks(links);
          handleAnswer(true);
        })
        .catch((err) => console.log(outputMessage(err)));
    }
  }

  // si selecciona --stats y --validate
  // md-links .some/example.md -s -v
  if (options.stats && options.validate) {
    if (program.args.length === 0) {
      // si no escribe ninguna una ruta
      // md-links -s -v
      console.log(errorMessage("\n✖  Error: Please enter a path\n"));
      help();
      handleAnswer(false);
    } else {
      mdLinks(program.args[0], { validate: true })
        .then((links) => {
          statsValidate(links);
          handleAnswer(true);
        })
        .catch((err) => {
          console.log(`\n${outputMessage(err)}`);
          handleAnswer(false);
        });
    }
  }
  // si selecciona solo --stats
  // md-links .some/example.md -s
  else if (options.stats) {
    if (options.version) {
      // Control para que no aparezcan ambas tablas --validate con --version
    } else if (options.help) {
      // Control para que no aparezcan ambas tablas --validate con --help
    } else if (program.args.length === 0) {
      // si no escribe ninguna una ruta
      // md-links -s
      console.log(errorMessage("\n✖  Error: Please enter a path\n"));
      help();
      handleAnswer(false);
    } else {
      mdLinks(program.args[0], { validate: true })
        .then((links) => {
          stats(links);
          handleAnswer(true);
        })
        .catch((err) => console.log(outputMessage(err)));
    }
  }

  // si selecciona solo --validate
  // md-links .some/example.md -v
  else if (options.validate) {
    if (options.version) {
      // Control para que no aparezcan ambas tablas --validate con --version
    } else if (options.help) {
      // Control para que no aparezcan ambas tablas --validate con --help
    } else if (program.args.length === 0) {
      // si no escribe ninguna una ruta
      // md-links -v
      console.log(errorMessage("\n✖  Error: Please enter a path\n"));
      help();
      handleAnswer(false);
    } else
      mdLinks(program.args[0], { validate: true })
        .then((links) => {
          tableLinksValidated(links);
          handleAnswer(true);
        })
        .catch((err) => console.log(outputMessage(err)));
  }
}

// En caso que no ingrese ninguna opción "md-links -"
if (!options.args) {
  console.log(errorMessage("\n✖  Error: Please enter a path or an option\n"));
  help();
  handleAnswer(false);
}

console.log("este es options, ", options);
console.log("mira mis argumentos", program.args);
