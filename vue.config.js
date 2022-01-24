const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const resolve = dir => path.resolve(__dirname, dir)

const BUILD_CONFIG = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.externals({ moment: 'moment' })
    config.module.rule('js').rule('vue').include.add('/packages').end()
  },
  configureWebpack: {
    output: {
      filename: 'quick-drawer/index.js',
      libraryTarget: 'commonjs2',
      path: path.join(__dirname, 'dist'),
      publicPath: '/'
    },
    performance: {
      hints: false
    },
    optimization: {
      minimize: true,
      minimizer: []
    },
    plugins: [
      new TerserPlugin({
        exclude: /\/node_modules/,
        extractComments: false,
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            drop_console: true
          },
          mangle: true,
          module: false,
          output: {
            comments: false
          },
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: 11
        }
      })
    ]
  }
}
module.exports =
  process.env.NODE_ENV === 'development'
    ? {
        pages: {
          index: {
            entry: './src/examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
          }
        },
        devServer: {
          port: 8080,
          hot: true,
          open: true,
          disableHostCheck: true
        },
        css: {
          extract: {
            filename: 'style/[name].css'
          },
          loaderOptions: {
            less: { javascriptEnabled: true }
          }
        }
      }
    : {
        ...BUILD_CONFIG,
        css: {
          extract: {
            filename: 'style.css'
          },
          loaderOptions: {
            less: { javascriptEnabled: true }
          }
        }
      }
