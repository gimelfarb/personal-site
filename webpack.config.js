const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (_, {mode = 'development'}) => ({
    mode,
    devtool: 'source-map',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `static/js/[name]${mode === 'production' ? '.[contenthash:8]' : ''}.js`
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin([
            { from: 'public' },
        ]),
        new MiniCssExtractPlugin({
            filename: `static/css/[name]${mode === 'production' ? '.[hash]' : ''}.css`
        }),
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }),
        new HtmlBeautifyPlugin()
    ],
    optimization: {
        minimizer: [new TerserJSPlugin({sourceMap: true}), new OptimizeCSSAssetsPlugin()],
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: mode !== 'production'
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'static/fonts/'
                    }
                }]
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            // Need everyone to point to the same React library
            'react': path.resolve(__dirname, 'node_modules/react')
        }
    },
});