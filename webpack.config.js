const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    cache: false,
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyPlugin([
            { from: 'public', to: '' },
        ]),
    ],
    devtool: 'eval-source-map'
};