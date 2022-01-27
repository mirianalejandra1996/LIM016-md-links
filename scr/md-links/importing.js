import {readFile, printListFiles} from "./functions.js";

// const file = 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos\\filemd2.md'
const file2 = 'filemd2.md'
const directory = 'C:\\Users\\Miria\\Desktop\\MD-LINKS\\LIM016-md-links\\scr\\Archivos';
const extension = '.md'; 


// readFile(file)
readFile(file2)

printListFiles(directory,extension)