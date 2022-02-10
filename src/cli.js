#!/usr/bin/env node

import { mdLinks } from "./mdlinks.js";
import { program } from "commander";
import ora from "ora";
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

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const spinner = createSpinner("Loading request\n").start();

function handleAnswer(isCorrect) {
  if (isCorrect) {
    spinner.success({ text: `Process was completed successfully!` });
    process.exit(0);
  } else {
    process.exit(1);
  }
}
// function handleAnswer(
//   // async function handleAnswer(
//   isCorrect,
//   message = "Process was completed successfully!"
// ) {
//   // const spinner = createSpinner("Loading request").start();
//   // await sleep();

//   if (isCorrect) {
//     spinner.success({ text: `${message}` });
//   } else {
//     spinner.error({ text: ` ` });
//     // spinner.error({ text: `E` });
//     process.exit(1);
//   }
// }

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
  writeErr: (str) => process.stdout.write(`\n✖  Error: ${str}\n`),

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
  console.log(errorMessage("\n✖  Error:Solo puede ingresar una ruta"));
  help();
}

// EN CASO QUE HAYA ESCRITO MAS DE DOS OPCIONES
if (Object.keys(options).length > 2) {
  console.log(errorMessage("\n✖  Error:Error al ingresar opciones"));
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
          "\n✖  Error:Parece que ingresaste una ruta, recuerda que al seleccionar la opción --help mostrará this help"
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
          "\n✖  Error: You've selected the --help option and another command, Enter only -h or --help for help"
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
          "\n✖  Error: You've selected the --version option and another command, Enter only -v or --version to display the version of this md-links package"
        )
      );
      help();
    } else if (program.args.length >= 1) {
      console.log(
        errorMessage(
          "\n✖  Error: Para conocer la versión solo escriba md-links -v or md-links --version"
        )
      );
      help();
    }
    // No debe colocar ninguna ruta (length === 0) para conocer la version del paquete
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
      console.log(
        errorMessage("\n✖  Error: Ingrese una ruta o ingrese alguna opción")
      );
      help();
    } else if (program.args.length === 1) {
      mdLinks(program.args[0], { validate: false })
        .then((links) => {
          tableLinks(links);
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
      console.log(errorMessage("\n✖  Error: Por favor ingrese una ruta"));
      help();
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
      console.log(errorMessage("\n✖  Error: Por favor ingrese una ruta"));
      help();
    } else {
      mdLinks(program.args[0], { validate: true })
        .then((links) => {
          stats(links);
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
      console.log(errorMessage("\n✖  Error: Por favor ingrese una ruta"));
      help();
    } else
      mdLinks(program.args[0], { validate: true })
        .then((links) => {
          tableLinksValidated(links);
        })
        .catch((err) => console.log(outputMessage(err)));
  }
}

// console.log("este es options, ", options);
// console.log("mira mis argumentos", program.args);
