const defaultConfig = require('jest-config').defaults
const config = {
  ...defaultConfig,
    "reporters": [
        "default",
        "jest-audio-reporter",
      ]
    
}

module.exports =  config