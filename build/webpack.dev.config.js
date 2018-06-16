/* eslint-disable import/no-extraneous-dependencies */

const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const base = require('./webpack.base.config');

base.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      PROFILE: JSON.stringify(process.env.PROFILE),
    },
    __DEVELOPMENT__: true,
  }),

  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin());

base.module.rules.push(
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
    ],
  },
  {
    test: /\.less$/,
    use: [
      'style-loader',
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
  },
  {
    test: /\.scss$/,
    use: [
      'style-loader',
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
  });

module.exports = _.extend({
  devtool: 'eval',
  context: path.resolve(__dirname, '..'),
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:8081',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    'bootstrap-loader',
    './src/app',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'static/js/[name].js',
    publicPath: '/',
    devtoolModuleFilenameTemplate: '/[absolute-resource-path]',
  },
  cache: true,
}, base);
