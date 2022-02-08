import { mdLinks } from "./mdlinks.js";
import { program } from "commander";
import chalk from "chalk";

const totalLinks = (links) => links.length;
const uniqueLinks = (links) => {
  return new Set(links.map((link) => link.href)).size;
};
// const brokenLinks = (links) => "broken";
const brokenLinks = (links) =>
  links.filter((link) => link.statusCode === 404).length;

// mdLinks("../test/Archivos", { validate: true })
mdLinks("../test/Archivos/filemd2.md", { validate: true })
  //   .then((res) => console.log(totalLinks(res)))
  // .then((res) => console.log(uniqueLinks(res)))
  .then((res) => console.log(brokenLinks(res)))
  // .then((res) => console.log(res))
  .catch((err) => console.log(err));

// const cli = () => {

// }

program.version("No tengo ninguna version");

// console.log(cli);
// cli.description("Access the JSON placeholder API");
// cli.name("jsonp");

// Commands
program
  .command("say <name>") //<name> es opcional el nombre, puede ser <loQueSea>
  .description("Say Something Interesting")
  .alias("s")
  .action(function (ho) {
    // console.log("comando => ", ho);
    // console.log(saludo(ho));
    console.log(chalk.bgMagentaBright(ho));
    console.log("probando , ", process.argv.slice(2));
    // console.log("probando , ", process.argv);
  });

// .action(function (name) {
//   console.log("el name es ", name);
//   // console.log(program);
//   // console.log(program.name);
// });

// Options
// program.option("-d, --do", "Do something").action(function (task) {
//   console.log("Estoy cansada, ayudenme, pd: Patita Zurda.", task);
// });

program.parse(process.argv);
