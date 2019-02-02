const path = require('path');
const webpack = require('webpack');

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  PROD_DIST: path.resolve(__dirname, 'public/dist'),
  JS: path.resolve(__dirname, 'src'),
};


// Webpack configuration

const configuration = {

  output: {
    path: paths.DIST,
    filename: '[name].bundle.js',
    library: 'evCalc',
    libraryTarget: 'umd',
    publicPath: '/dist/'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              //cacheDirectory: true,
              plugins: [/*'babel-plugin-styled-components',*/ 'react-hot-loader/babel', '@babel/plugin-proposal-class-properties']
            }
          }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }]
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};

const development = {
  entry: {
    main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', path.join(paths.JS, 'index.js')] ,
  },
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // uncomment hot lines in frontend/js/App.js
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

const production = {
  entry: {
    main: path.join(paths.JS, 'index.js')
  },
  output: {
    path: paths.PROD_DIST,
    filename: '[name].bundle.js',
    library: 'evCalc',
    libraryTarget: 'umd',
    publicPath: '/'
  },
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify('production') }
    }),
  ],
};

module.exports = (env={dev: true}) => Object.assign(
  {},
  configuration,
  env.prod ? production : development
);