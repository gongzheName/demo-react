/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, '../src'),
      path.join(__dirname, '../node_modules'),
    ],
    alias: {
      '@': path.join(__dirname, '../src'),
      lorautils: path.join(__dirname, '../src/utils'),
      loracoms: path.join(__dirname, '../src/components'),
      loraactions: path.join(__dirname, '../src/redux/actions'),
      lorastyles: path.join(__dirname, '../src/styles'),
    },
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, '../src'),
      use: [{
        loader: 'babel-loader',
      }, {
        loader: 'imports-loader',
        options: {
          jQuery: 'jquery',
          $: 'jquery',
        },
      }],
    },
    {
      test: /bootstrap-sass\/assets\/javascripts\//,
      use: [{
        loader: 'imports-loader',
        options: {
          jQuery: 'jquery',
        },
      }],
    },
    {
      test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          minetype: 'application/font-woff',
          name: 'static/fonts/[hash].[ext]',
        },
      }],
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          minetype: 'application/octet-stream',
          name: 'static/fonts/[hash].[ext]',
        },
      }],
    },
    {
      test: /\.otf/,
      use: [{
        loader: 'css-loader',
        options: {
          // limit: 10000,
          // minetype: 'application/octet-stream',
          name: 'static/fonts/[hash].[ext]',
        },
      }],
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'static/fonts/[hash].[ext]',
        },
      }],
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/i,
      include: path.join(__dirname, '../src/containers/Map/coms/images'),
      use: [{
        loader: 'svgr/webpack',
        options: {
          // native: true,
        },
      }],
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/i,
      exclude: path.join(__dirname, '../src/containers/Map/coms/images'),
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          minetype: 'image/svg+xml',
          name: 'static/img/[hash].[ext]',
        },
      }],
    },
    {
      test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[hash].[ext]',
        },
      }],
    },
    {
      test: /\.json$/,
      use: 'json-loader',
    }],
  },
  plugins: [

    // Provides
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      _: 'lodash',
      moment: 'moment',
    }),

    // Copy static files
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../static'),
        to: 'static',
      },
    ]),

    // Extract CSS
    new ExtractTextPlugin('static/css/[contenthash].css'),
  ],
  stats: {
    // Add asset Information
    assets: false,
    // Sort assets by a field
    assetsSort: 'field',
    // Add information about cached (not built) modules
    cached: true,
    // Add children information
    children: false,
    // Add chunk information (setting this to `false` allows for a less verbose output)
    chunks: false,
    // Add built modules information to chunk information
    chunkModules: false,
    // Add the origins of chunks and chunk merging info
    chunkOrigins: false,
    // Sort the chunks by a field
    chunksSort: 'field',
    // Context directory for request shortening
    context: path.resolve('./src/'),
    // `webpack --colors` equivalent
    colors: true,
    // Add errors
    errors: true,
    // Add details to errors (like resolving log)
    errorDetails: true,
    // Add the hash of the compilation
    hash: true,
    // Add built modules information
    modules: false,
    // Sort the modules by a field
    modulesSort: 'field',
    // Add public path information
    publicPath: true,
    // Add information about the reasons why modules are included
    reasons: false,
    // Add the source code of modules
    source: false,
    // Add timing information
    timings: false,
    // Add webpack version information
    version: true,
    // Add warnings
    warnings: true,
  },
};
