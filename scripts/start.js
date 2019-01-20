
const webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server')
const path = require('path')
var opn = require('opn');

const config = require('../config/webpack.dev.config.js');

const compiler = webpack(config);
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
console.log(config)
const app = new WebpackDevServer(compiler, {
  disableHostCheck: true,
  compress: true,
  clientLogLevel: 'none',
  contentBase: path.resolve(__dirname, '../public'),
  hot: true,
  publicPath: config.output.publicPath,
  quiet: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  https: false,
});
app.use(require('webpack-hot-middleware')(compiler, {
  path: '/__webpack_hmr'
}))
// Serve the files on port 3000.
app.listen(3000, '0.0.0.0', function (err) {

  if (err) {
    return console.log(err);
  }
  console.log('Example app listening on port 3000!\n');
  opn('http://localhost:3000/page1', {app: 'chrome'});
});