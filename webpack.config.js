var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        bundle: [
            'webpack-dev-server/client?http://0.0.0.0:8080',
            'webpack/hot/only-dev-server',
            './resources/jsx/App.jsx'
        ],
        vendor: ['jquery', 'lodash', 'react']
    },
    output: {
        path: path.join(__dirname, 'app/js'),
        filename: '[name].js',
        publicPath: 'http://localhost:8080/js/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    ],
    resolve: {
        alias: {
            'floatthead': path.join(__dirname, 'node_modules/floatthead/jquery.floatThead.js')
        }
    },
    module: {
        loaders: [
            {test: /\.(jsx|es6)$/, exclude: /node_modules/, loaders: ['react-hot', '6to5-loader']}
        ]
    }
};
