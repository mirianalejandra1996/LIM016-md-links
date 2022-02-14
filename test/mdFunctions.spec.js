import { isValidatedPath, readLinks } from "../src/mdFunctions";

describe("isValidatePath function", () => {
  it("should return true if path exist", () => {
    const ruta = "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\src";
    expect(isValidatedPath(ruta)).toBeTruthy();
  });

  it("should return false if path does not exist", () => {
    const fakePath = "fakePath";
    expect(isValidatedPath(fakePath)).toBeFalsy();
  });
});


describe("readLinks function", () => {
  it("should return an array of links (text, href, file) if the content of the file has links", () => {
    const content = `[first](https://facebook.com)
    Lorem ipsum dolor sit amet, consectetur adipiscing elit..
    [secondLink](http://google.com)
    Lorem ipsum dolor sit amet, consectetur adipiscing elit..
    [third link](https://googooole.com)
    [fourth link](https://paginafantasmita.com)`;

    const ruta = "./test/Archivos/filemd2.md";

    const linksExpected = [
      {
        text: "first",
        href: "https://facebook.com",
        file: "./test/Archivos/filemd2.md",
      },
      {
        text: "secondLink",
        href: "http://google.com",
        file: "./test/Archivos/filemd2.md",
      },
      {
        text: "third link",
        href: "https://googooole.com",
        file: "./test/Archivos/filemd2.md",
      },
      {
        text: "fourth link",
        href: "https://paginafantasmita.com",
        file: "./test/Archivos/filemd2.md",
      },
    ];
    expect(readLinks(content, ruta)).toEqual(linksExpected);
  });

  it("should return an empty array if the content of the file has no links", () => {
    const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit..`;
    const ruta = "./test/Archivos/filemd2.md";

    expect(readLinks(content, ruta)).toEqual([]);
  });
});

describe("extractedLinks function", () => {
  it("should return true if path exist", () => {
    const ruta = "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\src";
    expect(isValidatedPath(ruta)).toBeTruthy();
  });

  it("should return false if path does not exist", () => {
    const fakePath = "fakePath";
    expect(isValidatedPath(fakePath)).toBeFalsy();
  });
});

// node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage
