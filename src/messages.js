import CFonts from "cfonts";
import gradient from "gradient-string";
import { table } from "table";
import chalk from "chalk";
import { totalLinks, uniqueLinks, brokenLinks } from "./cliFunctions.js";

export const welcome = () => {
  let line =
    "═══════════════════════════════════════════════════════════════════════════ \n";
  let coolGradient = gradient(["#00FFF6", "#22FF00", "#F9FF00", "#FF5C00"]);

  console.log(coolGradient(line));
  // La marca
  CFonts.say("md-links", {
    font: "block", // define the font face
    align: "left", // define text alignment
    colors: ["system"], // define all colors
    letterSpacing: 1, // define letter spacing
    lineHeight: 0, // define the line height
    space: false, // define if the output text should have empty lines on top and on the bottom
    maxLength: "0", // define how many character can be on one line
    gradient: ["#00FFF6", "#22FF00", "#F9FF00", "#FF5C00"], // define your gradient colors
    independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: true, // define if this is a transition between colors directly
    env: "node", // define the environment CFonts is being executed in
  });

  // El eslogan
  CFonts.say("  tool checker", {
    font: "chrome",
    align: "left",
    colors: ["system"],
    letterSpacing: 1,
    lineHeight: 1,
    space: false,
    maxLength: "0",
    length: "2",
    gradient: ["#00FFF6", "#22FF00", "#F9FF00", "#FF5C00"],
    independentGradient: false,
    transitionGradient: true,
    env: "node",
  });

  console.log(coolGradient(line));
};

export const help = () => {
  console.log(`
    "Usage: miale-links <path> [option]"                   
    
    Note: You can also use the alias command.           i.e. miale-links -h
                                                             miale-links -v
                                                             miale-links ./some/example.md -s
                                                             miale-links ./some/example.md -va
                                                             miale-links ./some/example.md -s -va
  `);

  const data = [
    [
      `${chalk.hex("#FF8800").bold("OPTIONS")}`,
      `${chalk.hex("#FF8800").bold("ALIAS")}`,
      `${chalk.hex("#FF8800").bold("DESCRIPTION")}`,
      `${chalk.hex("#FF8800").bold("EXAMPLE")}`,
    ],
    ["--help", "-h", "Use to display this help", "miale-links --help"],
    [
      "--version",
      "-v",
      "Use to display the version of this\nmd-links package",
      "miale-links --version",
    ],
    [
      "--validate",
      "-va",
      "Use to display a list of extra link\ninformation (StatusCode, and Ok or\nFail)",
      "miale-links ./some/example.md --validate",
    ],
    [
      "--stats",
      "-s",
      "Use to display statistical link\ninformation (Total links and Unique\nlinks)",
      "miale-links ./some/example.md --stats",
    ],
    [
      "--stats --validate",
      "-s -va",
      "Use to display statistical link\ninformation (Total links, Unique\nlinks and Broken Liks)",
      "miale-links ./some/example.md --stats\n--validate",
    ],
    [
      "Empty option",
      "",
      "Use to display a list of basic link\ninformation",
      "miale-links ./some/example.md",
    ],
  ];

  // Con config puedo controlar las medidas de mi tabla.
  const config = {
    columns: {
      0: { width: 20 },
      1: { width: 8 },
      2: { width: 37 },
      3: { width: 40 },
      // 4: { width: 8 },
    },
  };
  console.log(table(data, config));
  console.log("\n");
};

export const statsValidate = (links) => {
  const data = [
    [`${chalk.hex("#FF8800").bold("Total Links")}`, `${totalLinks(links)}`],
    [`${chalk.hex("#FF8800").bold("Unique Links")}`, `${uniqueLinks(links)}`],
    [`${chalk.hex("#FF8800").bold("Broken Links")}`, `${brokenLinks(links)}`],
  ];

  console.log("\nOptions selected: --stats and --validate\n");

  const config = {
    columns: {
      0: { width: 15 },
      1: { width: 2 },
    },
  };
  console.log(table(data, config));
  console.log("\n");
};

export const stats = (links) => {
  const data = [
    [`${chalk.hex("#FF8800").bold("Total Links")}`, `${totalLinks(links)}`],
    [`${chalk.hex("#FF8800").bold("Unique Links")}`, `${uniqueLinks(links)}`],
  ];

  console.log("\nOption selected: --stats\n");

  const config = {
    columns: {
      0: { width: 15 },
      1: { width: 2 },
    },
  };
  console.log(table(data, config));
  console.log("\n");
};

export const tableLinksValidated = (links) => {
  console.log("\nOption selected: --validate\n");

  const lista = [];

  let prueba;
  prueba = links.map((link) => {
    return [
      link.text.slice(0, 51),
      link.href,
      link.file,
      link.statusCode,
      link.message,
    ];
  });

  prueba[0] = [
    `${chalk.hex("#FF8800").bold("Text")}`,
    `${chalk.hex("#FF8800").bold("URL")}`,
    `${chalk.hex("#FF8800").bold("File's path where link\nwas found")}`,
    `${chalk.hex("#FF8800").bold("Status\nCode")}`,
    `${chalk.hex("#FF8800").bold("Message")}`,
  ];

  const config = {
    columns: {
      0: { width: 35 },
      1: { width: 30 },
      2: { width: 25 },
      3: { width: 8 },
      4: { width: 8 },
    },
  };
  console.log(table(prueba, config));
  console.log("\n");
};

export const tableLinks = (links) => {
  console.log("\nOption selected: NONE\n");
  const lista = [];

  let prueba;
  prueba = links.map((link) => {
    return [link.text.slice(0, 51), link.href, link.file];
  });

  prueba[0] = [
    `${chalk.hex("#FF8800").bold("Text")}`,
    `${chalk.hex("#FF8800").bold("URL")}`,
    `${chalk.hex("#FF8800").bold("File's path where link\nwas found")}`,
  ];

  const config = {
    columns: {
      0: { width: 35 },
      1: { width: 35 },
      2: { width: 35 },
    },
  };
  console.log(table(prueba, config));
  console.log("\n");
};

// Para lanzar mensajes de salida con formato de letras amarillas
export const outputMessage = (str) => `${chalk.yellow(str)}`;
// Para lanzar mensajes de error con formato de letras rojas
export const errorMessage = (str) => `${chalk.redBright(str)}`;
