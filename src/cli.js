#!/usr/bin/env node

const mdlinks = require('./index')
const stats = require('./stats.js')
const yargs = require('yargs')
const msg = require('./mensajes.js')

const argv =
  yargs
  .options({
    validate: {
      type: "boolean",
      alias: "v",
      name: 'validate',
      describe: 'validate links'
    },
    stats: {
      type: "boolean",
      alias: "s",
      name: 'stats',
      describe: "give stats about links"
    }
  })
  .strictOptions(true)
  .showHelpOnFail(false, msg.helpMDLinks())
  .help(msg.helpMDLinks())
  .argv

let path = (argv._)

if (path.length > 1) {
  msg.errorMessage('Input only one path')
} else {
  if (argv.validate && argv.stats) {
    mdlinks(path[0], {
        validate: true
      }).then((data) => {
        const total = stats.totalLinks(data)
        const unique = stats.unique(data)
        const broken = stats.broken(data)
        msg.statsAndValidate(total, unique, broken)
      })
      .catch((error) => msg.errorMessage(error.message))
  } else if (argv.stats) {
    mdlinks(path[0], {
      validate: true
    }).then((data) => {
      const total = stats.totalLinks(data)
      const unique = stats.unique(data)
      msg.stats(total, unique)
    })
    .catch((error) => msg.errorMessage(error.message))
  } else if (argv.validate) {
    mdlinks(path[0], {
      validate: true
    }).then((data) => {
      msg.mdlinksCompletedValidate(data)
    })
    .catch((error) => msg.errorMessage(error.message))
  }else {
    mdlinks(path[0], {
        validate: false
      }).then((data) => {
        msg.mdlinksCompleted(data)
      })
      .catch((error) => msg.errorMessage(error.message))
  }
}
