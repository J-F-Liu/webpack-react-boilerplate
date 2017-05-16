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
  dist: path.join(__dirname, 'dist/client'),
};

const common = {
  output: {
    path: PATHS.dist,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: PATHS.app
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['file-loader?name=img/[hash].[ext]', 'img-loader?-minimize']
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
          rules: [
            {
              test: /\.sass$/,
              use: ['style-loader', 'css-loader', 'sass-loader?indentedSyntax=true'],
              include: PATHS.app
            }
          ]
        },
        // devtool: 'eval-source-map',
        devServer: {
          historyApiFallback: true,
          hot: true,
          inline: true,
          stats: 'errors-only',
          host: process.env.HOST,
          port: parseInt(process.env.PORT)
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
          rules: [
            {
              test: /\.sass$/,
              use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ['css-loader', 'sass-loader?indentedSyntax=true']
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
