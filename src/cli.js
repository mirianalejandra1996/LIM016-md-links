#!/usr/bin/env node
const mdlinks = require('./index')

let path = process.argv[2]

//let option = process.argv[3]

console.log({path})

mdlinks(path,{validate:false})
