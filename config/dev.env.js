var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://api-dev"',
  SYS_API: '"http://127.0.0.1:7777"',
  ZWFW_API: '"http://127.0.0.1:9012"'
})
