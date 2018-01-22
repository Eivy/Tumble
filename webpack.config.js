var JavaScriptObfuscator = require('webpack-obfuscator');
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
      rules: [
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader'
        }
      ],
    },
    node: {
      __dirname: false,
      __filename: false
    },
    target: 'electron-main',
    plugins: [
      new JavaScriptObfuscator ({
        rotateUnicodeArray: true
      }, [])
    ],
  },
  {
    entry: './render/index.js',
    externals: [{ 'electron-store': 'require("electron-store")' }],
    output: {
      path: __dirname,
      filename: 'render.js'
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.(js|vue)$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        },
        {
          test: /\.vue$/, loader: 'vue-loader'
        },
        {
          test: /\.js$/, loader: 'babel-loader'
        }
      ],
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
      path: __dirname,
      filename: 'style.css'
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
