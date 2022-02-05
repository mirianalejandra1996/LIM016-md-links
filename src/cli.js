#!/usr/bin/env node
const mdlinks = require('./index')

let path = process.argv[2]


console.log({path})

mdlinks(path)
