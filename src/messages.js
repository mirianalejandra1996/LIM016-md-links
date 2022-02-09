import CFonts from "cfonts";

export const welcome = () => {
  return `${brand} es
    ${slogan}
    `;
};

// const brand = CFonts.render("miale-links", {
const brand = CFonts.say("miale-links.", {
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

// const slogan = CFonts.render("A markdown link checker", {
const slogan = CFonts.say("A markdown links checker", {
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
