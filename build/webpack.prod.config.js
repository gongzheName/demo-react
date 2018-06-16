/* eslint-disable import/no-extraneous-dependencies */

const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.base.config');


common.plugins.push(

  // generate index.html
  new HtmlWebpackPlugin({
    template: 'index.ejs',
  }),

  // optimize
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'],
  }),

  // Constants
  new webpack.DefinePlugin({
    'process.env': {
      // for smaller React
      PROFILE: JSON.stringify(process.env.PROFILE),
    },
    __DEVELOPMENT__: false,
  }));

common.module.rules.push(
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader',
    }),
  },
  {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 2,
            localIdentName: '[local]__[hash:base64:5]',
          },
        },
        'less-loader',
      ],
    }),
  },
  {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 2,
            localIdentName: '[local]__[hash:base64:5]',
          },
        },
        'sass-loader',
      ],
    }),
  });

module.exports = _.extend({
  entry: {
    // order matters !!
    vendor: [
      'babel-polyfill',
      'bootstrap-loader',
      'jquery',
      'react-bootstrap',
      'lodash',
      'echarts',
      'date-fns',
      'moment',
      'animate.css',
    ],
    app: path.join(__dirname, '../src/index'),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'static/js/[name]-[chunkhash].js',
    chunkFilename: 'static/js/[name]-[chunkhash].js',
    publicPath: '/',
  },
  cache: false,
}, common);
