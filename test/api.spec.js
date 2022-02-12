const api = require('../src/api.js');
const path = require("path");


const fetch = require('node-fetch');
jest.mock('node-fetch', ()=>jest.fn())


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
      expect(e).toEqual(new Error("theres no files in this directory")),
    );
  });
  it('should return an error if folder is not MD ', () => {
    expect.assertions(1);
    return api.listFilesMD('test/test-folder/archivo2.txt').catch(e =>
      expect(e).toEqual((new Error("its not a file MD"))),
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

describe('Read Data Function', () => {

  it('should return the data of a file ...', () => {
    const route = '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md'
    const data =
      `## 2. Resumen del proyecto

[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript
construido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).
Esto nos va a permitir ejecutar JavaScript en el entorno del sistema operativo,
ya sea tu máquina o un servidor, lo cual nos abre las puertas para poder
interactuar con el sistema en sí, archivos, redes, ...`
    expect(api.readFiles(route)).toEqual(data)
  });
});

describe('getLinks Function', () => {

  it('should return array of links ...', () => {
    const file = '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md'
    const html = `<h2>2. Resumen del proyecto</h2>
   <p><a href="https://nodejs.org/es/">Node.js</a> es un entorno de ejecución para JavaScript
   construido con el <a href="https://developers.google.com/v8/">motor de JavaScript V8 de Chrome</a>.
   Esto nos va a permitir ejecutar JavaScript en el entorno del sistema operativo,
   ya sea tu máquina o un servidor, lo cual nos abre las puertas para poder
   interactuar con el sistema en sí, archivos, redes, ...</p>`
    const linksArray = [{
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md'
      },
      {
        href: 'https://developers.google.com/v8/',
        text: 'motor de JavaScript V8 de Chrome',
        file: '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md'
      }
    ]
    expect(api.getLinks(file, html)).toEqual(linksArray)
  });
});

describe('ListLinks Function', () => {

  it('should return array of OBject with links ...', () => {
    const path = '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md'
    const linksArray = [{
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md'
    }, {
      href: 'https://developers.google.com/v8/',
      text: 'motor de JavaScript V8 de Chrome',
      file: '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md'
    }]
    api.listLinks(path).then((data) => {
      expect(data).toEqual(linksArray)
    })
  });
});


describe('validateLinks Function', () => {

  it('should return array of links validated ...', () => {
    const linksArray = [{
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md'
    }]
    const linksArrayvalidated = [{
      file: '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md',
      href: 'https://nodejs.org/es/',
      message: 'OK',
      status: 200,
      text: 'Node.js'
    }]

    fetch.mockResolvedValue({status:200,statusText:'OK'})

    api.validateLinks(linksArray).then((data) => {
      expect(data).toEqual(linksArrayvalidated)
    })
  });

  it("status: 200 - message: 'OK'",  () => {

   // fetch.mockResponseOnce({status:200,statusText:'OK'})
    const recieveObject = [{
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md'
    }];
    const resultObject = [{
      file: '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md',
      href: 'https://nodejs.org/es/',
      message: 'OK',
      status: 200,
      text: 'Node.js'
    }];
    fetch.mockResolvedValue({status:200,statusText:'OK'})
    return api.validateLinks(recieveObject)
      .then((result) => {
        expect(result).toEqual(resultObject);
      })

  });

  it("status: 404 - message: 'Not Found'", () => {
    const recieveObject = [{
      href: 'https://nodejs.org/fail',
      text: 'Node.js',
      file: '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md'
    }];
    const resultObject = [{
      file: '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md',
      href: 'https://nodejs.org/fail',
      message: 'Not Found',
      status: 404,
      text: 'Node.js'
    }];
  fetch.mockResolvedValue({status:404,statusText:'Not Found'})
  //Internal Server Error
    return api.validateLinks(recieveObject)
      .then((result) => {
        expect(result).toEqual(resultObject);
      })
  });

  it("status: 500 - message: 'Internal Server Error", () => {
    const recieveObject = [{
      href: 'https://nodejs.org/fail',
      text: 'Node.js',
      file: '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md'
    }];
    const resultObject = [{
      file: '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md',
      href: 'https://nodejs.org/fail',
      message: 'Internal Server Error',
      status: 500,
      text: 'Node.js'
    }];
  fetch.mockResolvedValue({status:500,statusText:'Internal Server Error'})
  //Internal Server Error
    return api.validateLinks(recieveObject)
      .then((result) => {
        expect(result).toEqual(resultObject);
      })
  });


  it("status: 'Doesnt Respond' - message: 'Fail'", () => {
    const recieveObject = [{
      href: 'https://dfnodejs.org/jjv.html',
      text: 'Node.js',
      file: '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md'
    }];
    const resultObject = [{
      file: '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md',
      href: 'https://dfnodejs.org/jjv.html',
      message: 'Fail',
      status: 'Doesnt Respond',
      text: 'Node.js'
    }];
    fetch.mockRejectedValue()
    return api.validateLinks(recieveObject)
      .then((result) => {
        expect(result).toEqual(resultObject);
      })
  });
});
