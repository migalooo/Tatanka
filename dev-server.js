const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// Receive compiler folder name
const [folder] = process.argv.splice(2)
try {
  fs.statSync(path.resolve(__dirname, `src/gallary/${folder}`))
} catch (err) {
  console.log(chalk.red(`Sorry, The folder ${chalk.blue(folder)} is not exist.`))
  process.exit(0)
}

// Add dynamic entry form command
const config = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, 'src/gallary/'+folder+'/main.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.glsl', '.json'],
    alias: {
      '>': path.resolve('src')
    }
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.glsl$/,
        use: {
          loader: 'glsl-shader-loader',
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*']),
    new HtmlWebpackPlugin({
      title: 'WebGL Gallary',
      template: path.resolve(__dirname, `src/gallary/${folder}/main.html`)
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

try {
  fs.statSync(path.resolve(__dirname, `src/gallary/${folder}/static`))
  config.plugins.push(
    new CopyWebpackPlugin([{
        from: path.resolve(__dirname, `src/gallary/${folder}/static`),
        ignore: ['.*']
    }])
  )
  console.log(`static-file-serve: static folder copy from src/gallary/${folder}/static folder.`)
} catch (err) {
  console.log('static-file-serve: have no static folder.')
}

const options = {
  contentBase: './dist',
  hot: true,
  stats: "errors-only",
  host: 'localhost'
}

webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)

server.listen(5100, 'localhost', () => {
  console.log(chalk.blue('Your dev-server listening on port 5100'))
  console.log(`The compiler folder is ${chalk.blue('src/gallary/'+folder)}`)
})
