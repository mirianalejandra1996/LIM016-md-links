const laboratoria2 = {
  key: ["Jamil", "Albrey"],
};

const getElementOfArrayProperty = (obj, key, index) => {
  
    if (!obj[key]) {
      return undefined
    } else if (obj[key].length === 0) {
      return undefined;
    } else if (!Array.isArray(obj[key])) {
      return undefined;
    } else if (!obj[key]) {
      return undefined;
    } else {
      return obj[key][index];
    }
  };

console.log(getElementOfArrayProperty(laboratoria2, "key", 0));
//   'Jamil'

// Si el índice dado está fuera de rango del arreglo ubicado en la llave dada, debería devolver undefined.
// Si la propiedad en la llave dada no es un arreglo, debería devolver undefined.
// Si no hay ninguna propiedad en la llave, debería devolverse undefined.
