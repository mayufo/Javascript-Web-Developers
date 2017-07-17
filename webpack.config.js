var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var path = require('path');
var chapter = 13; // please select you want show chapter, you can select 3、4

module.exports = {
    entry: './src/chapter'+ chapter +'/chapter' + chapter,
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
