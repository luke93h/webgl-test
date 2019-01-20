let path = require('path');
let fs = require('fs')
let HtmlWebpackPlugin = require('html-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let webpack = require('webpack')
let CopyWebpackPlugin = require('copy-webpack-plugin')


let pages = fs.readdirSync(path.resolve(__dirname, '../src'))
let entry = pages.reduce( (entry, item) => {
  entry[item] = [path.resolve(__dirname, `../src/${item}`)]
  return entry
}, {})

let plugins = [
].concat(pages.filter(item => item != 'common').map((item) => {
  const htmlPlugin = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, `../src/${item}/index.html`),
    filename: `${item}/index.html`,
    chunks: ['common', 'commons', `${item}`],
    hash:true,
    minify: {
      removeComments: true,
      collapseWhitespace: false //删除空白符与换行符
    }
  });
  return htmlPlugin
}))
plugins.push(
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../public'),
      to: path.resolve(__dirname, '../dist'),
    }
  ])
)
const config = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]/index.min.js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'commons',
                chunks: 'all'
            }
        }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'less-loader', "sass-loader" ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          },
          {
            loader: 'url-loader',
            options: {
            }
          }
        ]
      }
    ]
  }, 
  plugins: plugins
};

module.exports = config;