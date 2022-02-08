#!/usr/bin/env node

import { mdLinks } from "./mdlinks.js";
import { program } from "commander";
import chalk from "chalk";
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
  .name("string-util")
  .description("CLI to some JavaScript string utilities")
  .version("0.8.0");

// program
//   .command("split")
//   .description("Split a string into substrings and display as an array.")
//   .argument("<string>", "string to split")
//   .option("--first", "display just the first substring")
//   .option("-s, --separator <char>", "separator character", ",")
//   .action((str, options) => {
//     const limit = options.first ? 1 : undefined;
//     console.log(str.split(options.separator, limit));
//   });

// program
//   .command("join")
//   .description("Join the command-arguments into a single string")
//   .argument("<strings...>", "one or more strings")
//   .option("-s, --separator <char>", "separator character", ",")
//   .action((strings, options) => {
//     console.log(strings.join(options.separator));
//   });

// program
//   .command("--join")
//   .description("Join the command-arguments into a single string")
//   .argument("<strings...>", "one or more strings")
//   .option("-s, --separator <char>", "separator character", ",")
//   .action((strings, options) => {
//     console.log(strings.join(options.separator));
//   });
// program.parse();



// !-------------------------------------------------------------------------------------------

program
  .argument('<name>')
  .option('-t, --title <honorific>', 'title to use before name')
  .option('-d, --debug', 'display some debugging')
  .action((name, options, command) => {
    if (options.debug) {
      console.error('Called %s with options %o', command.name(), options);
    }
    const title = options.title ? `${options.title} ` : '';
    console.log(`Thank-you ${title}${name}`);
  });

program.parse(process.argv);


// !-------------------------------------------------------------------------------------------
// md-links ./some/example.md --validate
// md-links ./some/example.md --stats
// md-links ./some/example.md --stats --validate
