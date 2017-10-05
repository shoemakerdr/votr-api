// for .env vars
require('dotenv').config()
// enable @std/esm loader
require = require('@std/esm')(module, { cjs: true, esm: "js" })
module.exports = require('./src/index.js').default
