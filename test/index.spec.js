const mdlinks = require('../src/index')
const api = require('../src/api.js')

jest.mock('../src/api.js')



describe('mdLinks', () => {

  it('should return a Promise with links opcion validate true', () => {
    path = 'test/test-folder/archivo.md'
    option = {
      validate: true
    }

    api.ExistPath.mockReturnValue(true)
    api.listLinks.mockResolvedValue([{"file": "/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md", "href": "https://nodejs.org/es/", "text": "Node.js"}])
    api.validateLinks.mockResolvedValue([{"file": "/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md", "href": "https://nodejs.org/es/", "message": "OK", "status": 200, "text": "Node.js"}])
    let arrayObject = [{
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md',
      status:200,
      message:'OK'
    }]


    mdlinks(path, option).then((res) => {
      expect(res).toEqual(arrayObject)
    })
  });

  it('should return a Promise with links opcion validate false ', () => {
    path = 'test/test-folder/archivo.md'
    option = {
      validate: false
    }

    api.ExistPath.mockReturnValue(true)
    api.listLinks.mockResolvedValue([{"file": "/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md", "href": "https://nodejs.org/es/", "text": "Node.js"}])
   let arrayObject = [{
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md'
    }]


    mdlinks(path, option).then((res) => {
      expect(res).toEqual(arrayObject)
    })
  });

  it('should return a Promise with links opcion validate undefined', () => {
   const path = 'test/test-folder/archivo.md'


    api.ExistPath.mockReturnValue(true)
    api.listLinks.mockResolvedValue([{"file": "/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md", "href": "https://nodejs.org/es/", "text": "Node.js"}])

    let arrayObject = [{
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md'
    }]


    mdlinks(path).then((res) => {
      expect(res).toEqual(arrayObject)
    })
  });

  it('should return a rejected value when file is not md o the directory is empty', () => {
    path = 'test/test-folder/archivo.md'
    option = {
      validate: false
    }

    api.ExistPath.mockReturnValue(true)
    api.listLinks.mockRejectedValue(new Error('error'))
  
    mdlinks(path, option).catch(err => {
      expect(err).toEqual(new Error('error'))
    })
  });

  it('should return a message when path doesnt exist', () => {
    path = 'test/test-folder/archivo.md'
    option = {
      validate: false
    }

    api.ExistPath.mockReturnValue(false)

    let arrayObject = [{
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: '/Users/lucero/Projectos/LIM016-md-links/test/test-folder/archivo.md'
    }]


    mdlinks(path, option).then((res) => {
      expect(res).toEqual(arrayObject)
    }).catch(err => {
      expect(err).toEqual(new Error('The path doesnt exist'))
    })
  });

});
