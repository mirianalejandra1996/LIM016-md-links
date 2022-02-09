#!/usr/bin/env node

const mdlinks = require('./index')
const stats = require('./stats.js')
const yargs = require('yargs')
const msg = require('./mensajes.js')
// const {
//   hideBin
// } = require('yargs/helpers')
// const argv = yargs(hideBin(process.argv)).argv


const argv =

  yargs
  
  .options({
    validate: {
      //   type: "boolean",
      alias: "v",
      name: 'validate',
      describe: 'valida los links'
    },
    stats: {
      //   type: "boolean",
      alias: "s"
    }
})
.strictOptions(true)
.showHelpOnFail(false, msg.helpMDLinks())
.argv

 let path = (argv._)

// console.log(path[0])

if(path.length > 1){
console.log("porfavor solo ingrese una ruta")
}else{
    if (argv.validate && argv.stats) {
        mdlinks(path[0],{validate:true}).then((data) => {
        const total = stats.totalLinks(data)
        const unique = stats.unique(data)
        const broken = stats.broken(data)
        msg.statsAndValidate(total,unique,broken)
        })
    } else if (argv.stats) {
        mdlinks(path[0],{validate:true}).then((data) => {
        const total = stats.totalLinks(data)
        const unique = stats.unique(data)
        msg.stats(total,unique)
        })
    } else if (argv.validate) {
        mdlinks(path[0],{validate:true}).then((data) => {
        msg.mdlinksCompletedValidate(data)
        })
    } else {
        mdlinks(path[0],{validate:false}).then((data) => {
            msg.mdlinksCompleted(data)
        })
    }
}


