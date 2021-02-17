const path = require("path");
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, "js", "app.js"),
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                sourceMaps: true,
                presets: ['babel-preset-env', 'babel-preset-react'],
                plugins: ["react-html-attrs", "react-hot-loader/babel"],
              },
            }
          },
          {
            test: /\.scss$/,
            use: [
              {
                loader: 'style-loader', // creates style nodes from JS strings
              },
              {
                loader: 'css-loader', // translates CSS into CommonJS
              },
              {
                loader: 'sass-loader', // compiles Sass to CSS
              },
            ],
          }
        ]
    },
    watch: true,
    watchOptions: {
      ignored: '/node_modules/',
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js",
        publicPath: "/"
    }, 
    plugins: [
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        filename: 'index.html',
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, "public"),
        hot: true,
        historyApiFallback: true,
        port: 3000,
        compress: false,
    }
};