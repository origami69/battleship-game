const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        bundle: './src/index.js',
    },
    output: {
        filename: '[name][contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: '[name][ext]',
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg|webp)$/i,
                use: {
                    loader: 'file-loader',
                }
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'ToDo',
            filename: 'index.html',
            template: 'src/template.html'
        })
    ]
}