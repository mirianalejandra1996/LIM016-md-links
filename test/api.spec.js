const api = require('../src/api.js');
const path = require("path");

describe('Path Exist Function', () => {

  it('should return true si existe ...', () => {
    expect(api.ExistPath('test/test-folder')).toBe(true)
  });
  it('should return false si no existe ...', () => {
    expect(api.ExistPath('Path')).toBe(false)
  });
});

describe('Path to Absolute Function', () => {

  it('should return la ruta absoluta ...', () => {
    expect(api.toAbsolute('test/test-folder')).toBe('/Users/lucero/Projectos/LIM016-md-links/test/test-folder')
  });
});

describe('Read Directory Function', () => {
  it('should return an array of files md ...', () => {
    route = '/Users/lucero/Projectos/LIM016-md-links/test/test-folder'
    archivosMD = ['/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md', '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo1.md', '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo3.md', '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/directorio/archivo1.md', '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/directorio/archivo2.md']
    expect(api.readDirectory(route)).toEqual(archivosMD)
  });
});

describe('ListFilesMD Function', () => {
  it('should return an error if folder is empty', () => {
    expect.assertions(1);
    return api.listFilesMD('test/test-folder/directoriovacio').catch(e =>
      expect(e).toEqual(new Error("No hay archivos en este directorio")),
    );
  });
  it('should return an error if folder is not MD ', () => {
    expect.assertions(1);
    return api.listFilesMD('test/test-folder/archivo2.txt').catch(e =>
      expect(e).toEqual((new Error("No es un archivo MD"))),
    );
  });
  it('should return an array with one file MD ', () => {
    const expectedArray = [
      path.resolve('test/test-folder/directorio/archivo1.md')
    ]
    const absolutePath = path.resolve('test/test-folder/directorio/archivo1.md')
    expect(api.listFilesMD(absolutePath)).resolves.toEqual(expectedArray)
  });
  it('should return an array with files MD ', () => {
    const expectedArray = [
      path.resolve('test/test-folder/directorio/archivo1.md'),
      path.resolve('test/test-folder/directorio/archivo2.md')
    ]
    const absolutePath = path.resolve('test/test-folder/directorio')
    expect(api.listFilesMD(absolutePath)).resolves.toEqual(expectedArray)
  });
});

// describe('Read Data Function', () => {
//   it('should return an array of files md ...', () => {
//     route = '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md'
//     data = `## 2. Resumen del proyecto
    
//      [Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript
//      construido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).
//      Esto nos va a permitir ejecutar JavaScript en el entorno del sistema operativo,
//      ya sea tu máquina o un servidor, lo cual nos abre las puertas para poder
//      interactuar con el sistema en sí, archivos, redes, ...`
//        expect(api.readFiles(route)).toEqual(data)
//   });
// });
