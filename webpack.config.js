var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = [
  {
    entry: './main/entry.js',
    externals: [{ 'electron-store': 'require("electron-store")' }],
    output: {
      path: __dirname,
      filename: './main.js'
    },
    devtool: 'inline-source-map',
    module: {
      loaders: [
        {test: /\.js$/, loader: 'babel-loader'},
      ]
    },
    node: {
      __dirname: false,
      __filename: false
    },
    target: 'electron-main',
  },
  {
    entry: './render/index.js',
    externals: [{ 'electron-store': 'require("electron-store")' }],
    output: {
      path: __dirname+'/render',
      filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
      loaders: [
        {
          test: /\.vue$/, loader: 'vue-loader'
        },
        {
          test: /\.js$/, loader: 'babel-loader'
        }
      ]
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.js'
      }
    },
    target: 'electron'
  },
  {
    entry: {
      style: './render/index.scss'
    },
    output: {
      path: __dirname+'/render',
      filename: '[name].css'
    },
    module: {
      rules: [{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        })
      }]
    },
    plugins: [
      new ExtractTextPlugin("[name].css")
    ]
  }
];
