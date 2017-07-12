const webpack = require('webpack')
const devConfig = require('./webpack.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ASSET_PATH = process.env.ASSET_PATH || '/static/'

module.exports = Object.assign(devConfig, {
  entry: {
    bundle: './src/index.js',
  },
  output: Object.assign(devConfig.output, {
    filename: '[name].[chunkhash].js',
    publicPath: ASSET_PATH,
  }),
  module: {
    rules: [
      devConfig.module.rules[0],
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: true } },
            'less-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.[chunkhash].js',
      minChunks: module => module.context && module.context.includes('node_modules'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': {
         JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('bundle.[hash].css'),
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ]
})
