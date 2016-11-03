const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const gitRevision = require('git-revision');
const packages = require('./package.json');

const BUILD = process.env.BABEL_ENV = process.env.NODE_ENV;

const PATHS = {
  app: path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'dist'),
};

const common = {
  output: {
    path: PATHS.dist,
    publicPath: './',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: PATHS.app
      },
      { test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file?name=img/[hash].[ext]', 'img?-minimize']
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: 'app/index.html',
      inject: 'body'
    })
  ]
};

const different = function(build) {
  switch(build) {
    case "development":
      return {
        entry: PATHS.app,
        output: {
          filename: 'bundle.js'
        },
        module: {
          loaders: [
            {
              test: /\.sass$/,
              loaders: ['style', 'css', 'sass?indentedSyntax=true'],
              include: PATHS.app
            }
          ]
        },
        // devtool: 'eval-source-map',
        devServer: {
          historyApiFallback: true,
          hot: true,
          inline: true,
          progress: true,
          stats: 'errors-only',
          host: process.env.HOST,
          port: process.env.PORT
        },
        plugins: [
          new webpack.HotModuleReplacementPlugin()
        ]
      };
    case "production":
      return {
        entry: {
          app: PATHS.app,
          vendor: Object.keys(packages.dependencies)
        },
        output: {
          filename: 'js/[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js'
        },
        module: {
          loaders: [
            {
              test: /\.sass$/,
              loader: ExtractTextPlugin.extract({
                notExtractLoader: 'style',
                loader: ['css', 'sass?indentedSyntax=true']
              }),
              include: PATHS.app
            }
          ]
        },
        plugins: [
          new webpack.DefinePlugin({
            "process.env": {
              VERSION: JSON.stringify(gitRevision("short")),
              NODE_ENV: JSON.stringify("production"),
            }
          }),
          new ExtractTextPlugin("css/[name].[chunkhash].css"),
          new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
          }),
          new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false}
          })
        ]
      };
    default:
      return {};
  }
}(BUILD);

module.exports = merge(common, different);
