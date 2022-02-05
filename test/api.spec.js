const api = require('../src/api.js');
const path = require("path");

describe('Ruta Exise function', () => {

  it('should return true si existe ...', () => {
    expect(api.rutaExiste('test/test-folder')).toBe(true)
  });
  it('should return false si no existe ...', () => {
    expect(api.rutaExiste('Path')).toBe(false)
  });
});

describe('listArchivosMD function', () => {

  it('should return an error if folder is empty ', () => {
    const callbackmock = jest.fn()
    api.listArchivosMD('test/test-folder/directoriovacio', callbackmock)
    expect(callbackmock).toBeCalledWith(new Error("no hay archivos en este directorio"), null)

  });
  it('should return an error if folder is not MD ', () => {
    const callbackmock = jest.fn()
    api.listArchivosMD('test/test-folder/archivo2.txt', callbackmock)
    expect(callbackmock).toBeCalledWith(new Error("no es un archivo MD"), null)

  });
  it('should return an array with files MD ', () => {
    const callbackmock = jest.fn()
    api.listArchivosMD('test/test-folder/directorio', callbackmock)
    const expectedArray = [
      path.resolve('test/test-folder/directorio/archivo1.md'),
      path.resolve('test/test-folder/directorio/archivo2.md')
    ]
    expect(callbackmock).toBeCalledWith(null, expectedArray)

  });
});

describe.skip('Read Directory function', () => {

  it('should return an array of files md ...', () => {
    route = '/Users/lucero/Projectos/LIM016-md-links/Prueba'
    archivosMD = ['/Users/lucero/Projectos/LIM016-md-links/Prueba/directorio/archivo1.md', '/Users/lucero/Projectos/LIM016-md-links/Prueba/directorio/archivo2.md', '/Users/lucero/Projectos/LIM016-md-links/Prueba/archivo.md', '/Users/lucero/Projectos/LIM016-md-links/Prueba/archivo1.md', '/Users/lucero/Projectos/LIM016-md-links/Prueba/archivo3.md']
    expect(api.readDirectory(route)).toEqual(archivosMD)
  });
});
