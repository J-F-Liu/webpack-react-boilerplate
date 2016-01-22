const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Clean = require('clean-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const packages = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
const BUILD = process.env.NODE_ENV || (TARGET === 'build' ? 'production' : 'development');
process.env.BABEL_ENV = BUILD;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: PATHS.app
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
          path: PATHS.build,
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
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js'
        },
        module: {
          loaders: [
            {
              test: /\.sass$/,
              loader: ExtractTextPlugin.extract('style', ['css', 'sass?indentedSyntax=true']),
              include: PATHS.app
            }
          ]
        },
        plugins: [
          new Clean([PATHS.build]),
          new webpack.DefinePlugin({
            "process.env": {
              NODE_ENV: JSON.stringify("production")
            }
          }),
          new ExtractTextPlugin("styles.[chunkhash].css"),
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
