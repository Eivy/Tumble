module.exports = [
  {
    entry: './render/index.js',
    output: {
      path: __dirname+'/render',
      filename: 'bundle.js'
    },
    module: {
      loaders: [{
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
  }
]
;
