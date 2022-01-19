/* eslint-disable no-undef */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },
  plugins: [
    new ESLintPlugin(),
    new CompressionPlugin(), // create compressed Files
    // new BundleAnalyzerPlugin(), // to analyze size of plugins and JS files
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
    }),
    new ProgressBarPlugin({
      format: chalk.yellow.bold(':msg') + ' [:bar ' + chalk.green.bold(':percent') + '] (' + chalk.red.bold(':elapsed') + ' seconds)',
      clear: false
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin()],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'reactVendor'
        },
        utilityVendor: {
          test: /[\\/]node_modules[\\/](lodash)[\\/]/,
          name: 'utilityVendor'
        },
        utilityTimeVendor: {
          test: /[\\/]node_modules[\\/](moment|moment-timezone)[\\/]/,
          name: 'utilityTimeVendor'
        },
        validationVendor: {
          test: /[\\/]node_modules[\\/](@hapi[\\/]joi)[\\/]/,
          name: 'validationVendor'
        },
        beautifyVendor: {
          test: /[\\/]node_modules[\\/](sweetalert2|react-spinners)[\\/]/,
          name: 'beautifyVendor'
        },
        materialVendor: {
          test: /[\\/]node_modules[\\/](@material-ui[\\/]core)[\\/]/,
          name: 'materialVendor'
        },
        vendor: {
          test: /[\\/]node_modules[\\/](!@material-ui[\\/]core)(!@hapi[\\/]joi)(!sweetalert2)(!react-spinners)(!lodash)(!moment)(!moment-timezone)[\\/]/,
          name: 'vendor'
        }
      }
      // cacheGroups: {
      //   vendor: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name(module) {
      //       // get the name. E.g. node_modules/packageName/not/this/part.js
      //       // or node_modules/packageName
      //       const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

      //       // npm package names are URL-safe, but some servers don't like @ symbols
      //       return `npm.${packageName.replace('@', '')}`;
      //     }
      //   }
      // }
    }
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(s*)css$/, // match any .scss or .css file,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              name: '[name][hash].[ext]'
            }

          }
        ]
      },
      {
        test: /\.(svg)$/,
        exclude: /fonts/, /* dont want svg fonts from fonts folder to be included */
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              noquotes: true
            }
          }
        ]
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: /images/, /* dont want svg images from image folder to be included */
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts/',
              name: '[name][hash].[ext]'
            }
          }
        ]
      }
    ]
  }
};
