var config = require('./webpack.common.config')
let webpack = require('webpack')
config.plugins.push(
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin({}),
  new webpack.NoEmitOnErrorsPlugin()
)
Object.keys(config.entry).forEach(item => {
  config.entry[item].unshift('webpack-hot-middleware/client?reload=true')
})

module.exports = config;