import CFonts from "cfonts";
import gradient from "gradient-string";
import AsciiEmojiParser from "ascii-emoji-parser";
import { table } from "table";
import chalk from "chalk";

export const totalLinks = (links) => links.length;
export const uniqueLinks = (links) => {
  return new Set(links.map((link) => link.href)).size;
};
export const brokenLinks = (links) =>
  links.filter((link) => link.statusCode === 404).length;

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
    //   lineHeight: 1, // define the line height
    space: false, // define if the output text should have empty lines on top and on the bottom
    //   space: true, // define if the output text should have empty lines on top and on the bottom
    maxLength: "0", // define how many character can be on one line
    gradient: ["#00FFF6", "#22FF00", "#F9FF00", "#FF5C00"], // define your two gradient colors
    independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: true, // define if this is a transition between colors directly
    env: "node", // define the environment CFonts is being executed in
  });

  // El eslogan
  CFonts.say("  tool checker", {
    font: "chrome", // define the font face
    align: "left", // define text alignment
    colors: ["system"], // define all colors
    letterSpacing: 1, // define letter spacing
    lineHeight: 1, // define the line height
    space: false, // define if the output text should have empty lines on top and on the bottom
    maxLength: "0", // define how many character can be on one line
    // maxLength: "0", // define how many character can be on one line
    length: "2", // define how many character can be on one line
    gradient: ["#00FFF6", "#22FF00", "#F9FF00", "#FF5C00"], // define your two gradient colors
    independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: true, // define if this is a transition between colors directly
    env: "node", // define the environment CFonts is being executed in
  });

  console.log(coolGradient(line));

  // let duck = gradient("orange", "yellow").multiline(
  //   ["  __", "<(o )___", " ( ._> /", "  `---'"].join("\n")
  // );
  // console.log(duck);
};

export const help = () => {
  // let coolGradient = gradient("orange", "yellow");
  // let happy = "⊂(◉‿◉)つ";

  // console.log(coolGradient(happy));

  // console.log(
  //   "💻 MD-LINKS It's a tool for reads and parses Markdown files, to verify the links they contain and to report some statistics \n"
  // );

  console.log(
    "Usage: miale-links <path> [option]                          Example: miale-links ./some/example.md --validate"
  );

  const data = [
    // ["OPTIONS", "ALIAS", "DESCRIPTION"],
    [
      `${chalk.hex("#FF8800").bold("OPTIONS")}`,
      `${chalk.hex("#FF8800").bold("ALIAS")}`,
      `${chalk.hex("#FF8800").bold("DESCRIPTION")}`,
    ],
    // "ALIAS", "DESCRIPTION"],
    ["--help", "-h", "Use to display this help"],
    [
      "--validate",
      "-va",
      "Use to display a list of extra link information (StatusCode, and Ok or Fail)",
    ],
    ["--version", "-v", "Use to display the version of md-links package"],
    ["--help", "-h", "Use to display this help"],
    [
      "--validate",
      "-va",
      "Use to display a list of extra link information (StatusCode, and Ok or Fail)",
    ],
    [
      "--stats",
      "-s",
      "Use to display statistical link information (Total links and Unique links)",
    ],
    [
      "--stats --validate",
      "-s -va",
      "Use to display statistical link information (Total links, Unique links and Broken Liks)",
    ],
    ["Empty option", "", "Use to display a list of basic link information"],
  ];

  console.log(table(data));
  console.log("😞");
  // console.log(coolGradient(happy));
  // console.log(coolGradient(table(data)));
  // console.log(chalk.yellow(table(data)));
  // console.log(chalk.yellow(table(data)));
  // console.log(chalk.cyan(table(data)));
};

export const statsValidate = (links) => {
  const data = [
    [`${chalk.hex("#FF8800").bold("Total Links")}`, `${totalLinks(links)}`],
    [`${chalk.hex("#FF8800").bold("Unique Links")}`, `${uniqueLinks(links)}`],
    [`${chalk.hex("#FF8800").bold("Broken Links")}`, `${brokenLinks(links)}`],
  ];
  // const data = [
  //   [`${chalk.hex("#FF8800").bold("Total Links")}`, "000"],
  //   [`${chalk.hex("#FF8800").bold("Unique Links")}`, "000"],
  //   [`${chalk.hex("#FF8800").bold("Broken Links")}`, "000"],
  // ];

  console.log(table(data));
};
