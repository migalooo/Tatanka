const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './src/js/app.js'),
  output: {
    filename:'js/bundle.js',
    path: path.resolve(__dirname, "dist/assets/" ),
    // publicPath: `http://${serverIp}:9000/assets/`
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // boolean | string | array, static file location
    port: 9000,
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    // noInfo: true, // only errors & warns on hot reload
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader','css-loader'] },
      { test: /\.less/, use: ['style-loader','css-loader','less-loader']},
      { test: /\.scss$/, use: [ 'style-loader', 'css-loader'] },
      // { test: /\.(glsl|frag|vert)$/, use: 'raw-loader'},
      // { test: /\.(glsl|frag|vert)$/, use: [ 'raw-loader', 'glslify-loader']}
      {
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        use: [
          'raw-loader',
          {
            loader: 'glslify-loader',
            options: {
              transform: [
                ['glslify-hex', { 'option-1': true, 'option-2': 42 }]
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
