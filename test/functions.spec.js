import { isValidatedPath } from "../src/functions";

describe("isValidatePath function", () => {
  it("should return true if path exist", () => {
    const ruta = "C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\src";
    expect(isValidatedPath(ruta)).toBe(true);
  });
});


// node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage
