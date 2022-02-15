import {
  isValidatedPath,
  // readLinks,
  pathIsDirectory,
  pathIsFile,
  convertPathAbsolute,
  readFile,
} from "../src/mdFunctions";

describe("isValidatePath function", () => {
  it("should return true if path exist", () => {
    const path = "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\src";
    expect(isValidatedPath(path)).toBeTruthy();
  });

  it("should return false if path does not exist", () => {
    const fakePath = "fakePath";
    expect(isValidatedPath(fakePath)).toBeFalsy();
  });
});

describe("pathIsDirectory function", () => {
  it("should return true if path is a Directory", () => {
    const path = "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\src";
    expect(pathIsDirectory(path)).toBe(true);
  });

  it("should return false if path is not a Directory", () => {
    const path =
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\Archivos\\filemd2.md";
    expect(pathIsDirectory(path)).toBe(false);
  });
});

describe("pathIsFile function", () => {
  it("should return false if path is not a File", () => {
    const path = "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\src";
    expect(pathIsFile(path)).toBe(false);
  });

  it("should return true if path is a File", () => {
    const path =
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\Archivos\\filemd2.md";
    expect(pathIsFile(path)).toBe(true);
  });
});

describe("convertPathAbsolute function", () => {
  it("should return and absolute path if parameter is a relative path", () => {
    const relativePath = ".\\test\\Archivos\\filemd2.md";
    const absolutePath =
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\Archivos\\filemd2.md";
    // const absolutePath =
    //   "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\src";
    expect(convertPathAbsolute(relativePath)).toBe(absolutePath);
  });

  it("should return the same path if parameter is a absolute path", () => {
    const absolutePath =
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\Archivos\\filemd2.md";
    expect(convertPathAbsolute(absolutePath)).toBe(absolutePath);
  });
});

describe("readFile function", () => {
  it("should return the content of a file", () => {

    const fileContent = `## 2. Resumen del proyecto\r\n\r\n[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript\r\nconstruido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).\r\nEsto nos va a permitir ejecutar JavaScript en el entorno del sistema operativo,\r\nya sea tu máquina o un servidor, lo cual nos abre las puertas para poder\r\ninteractuar con el sistema en sí, archivos, redes, ...`;

    const path =
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\Archivos\\filemd3.md";

    expect(readFile(path).trim()).toBe(fileContent.trim());
  });

});

// node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage

// ! -----------

// describe("readLinks function", () => {
//   it("should return an array of links (text, href, file) if the content of the file has links", () => {
//     const content = `[first](https://facebook.com)
//     Lorem ipsum dolor sit amet, consectetur adipiscing elit..
//     [secondLink](http://google.com)
//     Lorem ipsum dolor sit amet, consectetur adipiscing elit..
//     [third link](https://googooole.com)
//     [fourth link](https://paginafantasmita.com)`;

//     const path = "./test/Archivos/filemd2.md";

//     const linksExpected = [
//       {
//         text: "first",
//         href: "https://facebook.com",
//         file: "./test/Archivos/filemd2.md",
//       },
//       {
//         text: "secondLink",
//         href: "http://google.com",
//         file: "./test/Archivos/filemd2.md",
//       },
//       {
//         text: "third link",
//         href: "https://googooole.com",
//         file: "./test/Archivos/filemd2.md",
//       },
//       {
//         text: "fourth link",
//         href: "https://paginafantasmita.com",
//         file: "./test/Archivos/filemd2.md",
//       },
//     ];
//     expect(readLinks(content, path)).toEqual(linksExpected);
//   });

//   it("should return an empty array if the content of the file has no links", () => {
//     const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit..`;
//     const path = "./test/Archivos/filemd2.md";

//     expect(readLinks(content, path)).toEqual([]);
//   });
// });
