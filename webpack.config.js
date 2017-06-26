var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');



module.exports = {
    entry: ['./src/chapter1', './src/chapter2'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'

    },

    plugins: [new HtmlWebpackPlugin({
        title: 'Javascript-Web-Developers',
        template: './index.html',
        filename: 'index.html'
    })],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
}
