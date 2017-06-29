var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var path = require('path');

module.exports = {
    entry: ['./src/chapter3/chapter3'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'

    },

    plugins: [
        new OpenBrowserPlugin({url: 'http://localhost:9543'}),
        new HtmlWebpackPlugin({
            title: 'Javascript-Web-Developers',
            template: './index.html',
            filename: 'index.html',
            favicon: path.resolve(__dirname, 'favicon.ico')
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9543
    }
}
