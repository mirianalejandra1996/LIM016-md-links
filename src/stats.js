const totalLinks = (links) => {
  total = links.length
  return total
}

const unique = (links) => {
  visitados = {}
  links.forEach(elem => {
    if (visitados[elem.link]) {
      visitados[elem.link] += 1
    } else {
      visitados[elem.link] = 1
    }
  });
  const totalUnique = Object.keys(visitados).length
  // const linksNoRepetido = links.filter((link) => visitados[link.link] == 1)
  return totalUnique
}

const broken = (links) => {
let linksRotos = links.filter(link => link.message === 'Not Found')
let broken = linksRotos.length
return broken
}

module.exports = {
  totalLinks,
  unique,
  broken
}



//console.log(unique([{link:'a'},{link:'a'},{link:'b'},{link:'v'},{link:'v'}]))

// let arr = [{number:1},{number:0},{number:0}];
// let res = arr.filter(x =>arr.indexOf(x.number) === arr.lastIndexOf(x.number)
// );

// console.log(res)
