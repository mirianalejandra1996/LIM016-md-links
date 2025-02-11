import {
  isValidatedPath,
  pathIsDirectory,
  pathIsFile,
  convertPathAbsolute,
  readFile,
  listOfLinks,
  validatedLink,
  getMDFiles,
  getAllFilesRecursively,
} from "../src/mdFunctions";

// import fetch from "node-fetch";
// jest.mock("node-fetch", () => jest.fn());

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
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd2.md";
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
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd2.md";
    expect(pathIsFile(path)).toBe(true);
  });
});

describe("convertPathAbsolute function", () => {
  it("should return and absolute path if parameter is a relative path", () => {
    const relativePath = ".\\test\\mainFolder\\filemd2.md";
    const absolutePath =
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd2.md";

    expect(convertPathAbsolute(relativePath)).toBe(absolutePath);
  });

  it("should return the same path if parameter is a absolute path", () => {
    const absolutePath =
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd2.md";
    expect(convertPathAbsolute(absolutePath)).toBe(absolutePath);
  });
});

describe("readFile function", () => {
  it("should return the content of a file when file has content", () => {
    const fileContent = `## 2. Resumen del proyecto\r\n\r\n[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript\r\nconstruido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).\r\nEsto nos va a permitir ejecutar JavaScript en el entorno del sistema operativo,\r\nya sea tu máquina o un servidor, lo cual nos abre las puertas para poder\r\ninteractuar con el sistema en sí, archivos, redes, ...`;

    const path =
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd3.md";

    expect(readFile(path).trim()).toBe(fileContent.trim());
  });

  it("should return an empty string if file has no content", () => {
    const path =
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\emptymd.md";

    expect(readFile(path).trim()).toBe("");
  });
});

// console.log("por favor", listOfLinks("./test/mainFolder/filemd.md"));
// console.log("por favor", listOfLinks("./test/mainFolder/emptymd.md"));
// console.log("por favor", listOfLinks("./test/mainFolder/filemd2.md"));

// node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage

// ! -----------

describe("listOfLinks function", () => {
  it("should return an array of links (text, href, file) if the content of the file has links", () => {
    const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit..

    [first](https://facebook.com)
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit..
    
    [secondLink](http://google.com)
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit..
    
    [third link](https://googooole.com)
    [fourth link](https://fakewebsitetesting.com)
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit..
    
    [fifth link](https://nodejs.org/api/process.html)
    [sixth link](https://nodejs.org/api/process.html)`;

    // const path = "./test/mainFolder/filemd2.md";
    const path =
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd2.md";
    const linksExpected = [
      {
        text: "first",
        href: "https://facebook.com",
        file: "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd2.md",
      },
      {
        text: "secondLink",
        href: "http://google.com",
        file: "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd2.md",
      },
      {
        text: "third link",
        href: "https://googooole.com",
        file: "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd2.md",
      },
      {
        text: "fourth link",
        href: "https://fakewebsitetesting.com",
        file: "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd2.md",
      },
      {
        text: "fifth link",
        href: "https://nodejs.org/api/process.html",
        file: "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd2.md",
      },
      {
        text: "sixth link",
        href: "https://nodejs.org/api/process.html",
        file: "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd2.md",
      },
    ];
    expect(listOfLinks(path)).toEqual(linksExpected);
  });

  it("should return an empty array if the content of the file has no links", () => {
    const path =
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\emptymd.md";
    expect(listOfLinks(path)).toEqual([]);
  });
});

// ! preguntar en test camp
describe("validatedLink function", () => {
  it("should return an object {text, href, file, statusCode, message} if the link is Working", () => {
    // const path = "./test/mainFolder/filemd2.md";
    const link = {
      text: "Markdown",
      href: "https://es.wikipedia.org/wiki/Markdown",
      file: "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd.md",
    };

    const linkExpected = {
      text: "Markdown",
      href: "https://es.wikipedia.org/wiki/Markdown",
      file: "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd.md",
      statusCode: 200,
      message: "Ok",
    };

    // expect(validatedLink(link)).toEqual(linkExpected);

    // fetch.mockResolvedValue({ status: 200, statusText: "OK" });
    // fetch.get.mockResolvedValue({ status: 200, statusText: "OK" });
    // axios.get.mockResolvedValue(linkExpected);

    validatedLink(link).then((res) => {
      expect(res).toEqual(linkExpected);
      // expect(res).toEqual(linkExpected);
    });
  });
});

describe("getMDFiles function", () => {
  it("should return an array of files with ext name '.md' if list has md files ", () => {
    // const path = "./test/mainFolder/filemd2.md";
    const allFiles = [
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\emptymd.md",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filejs.js",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd.md",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd2.md",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd3.md",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filetext.txt",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\subCarpeta\\A.md",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\subCarpeta\\B.md",
    ];

    const mdFiles = [
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\emptymd.md",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd.md",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd2.md",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd3.md",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\subCarpeta\\A.md",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\subCarpeta\\B.md",
    ];

    expect(getMDFiles(allFiles)).toEqual(mdFiles);
  });
  it("should return an empty array of files with ext name '.md' if list has no md files", () => {
    const allFiles = [
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filejs.js",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filetext.txt",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\package.json",
    ];

    expect(getMDFiles(allFiles)).toEqual([]);
  });
});

describe("getAllFilesRecursively function", () => {
  it("should return an array of files if path contains files", () => {
    const path =
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder";

    const filesRecursive = [
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\emptymd.md",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filejs.js",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd.md",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd2.md",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filemd3.md",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\filetext.txt",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\folderAB\\A.md",
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\folderAB\\B.md",
    ];

    expect(getAllFilesRecursively(path)).toEqual(filesRecursive);
  });

  it("should return an empty array if path has no files", () => {
    const path =
      "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\test\\mainFolder\\emptyFolder";

    expect(getAllFilesRecursively(path)).toEqual([]);
  });
});
