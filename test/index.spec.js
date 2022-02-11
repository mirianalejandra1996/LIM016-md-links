const mdlinks = require('../src/index')

describe('mdLinks', () => {

  it('should return a Promise with links', () => {
    path = 'test/test-folder/archivo.md'
    option = {
      validate: true
    }
    let arrayObject = [{
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md',
      status: '200',
      message: 'OK'
    }]
    mdlinks(path, option).resolves.toEqual(arrayObject)
  });

});
