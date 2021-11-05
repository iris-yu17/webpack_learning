const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
    mode: 'development',
    // mode:'production',
    entry: {
        // component, home, login各是一個chunk
        component: ['./src/js/component.js'],
        home: ['./src/js/pages/home.js'],
        login: ['./src/js/pages/login-page.js'],
        mainScss: ['./src/scss/project/main.scss']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.[hash].bundle.js',
        // filename: 'main.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
    devtool: 'source-map',
    //每一個HtmlWebpackPlugin實例都代表了一個HTML檔案，我們可針對各自的 HTML檔案依照chunk載入不同的entry內容
    plugins: [new HtmlWebpackPlugin({
        // 配置 HTML 模板路徑與生成名稱 (第三步)
        template: "./src/base.html",
        // filename 選項則是用來配置目標文件生成時的名稱。
        filename: 'index.html',
        // 依照chunk載入不同js
        // 沒寫的話預設是全部component, login, home都會載入
        // css可以在js檔裡import, 也可直接寫成chunk
        chunks: ['component'],
    }),
    new MiniCssExtractPlugin()],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
    }
};
