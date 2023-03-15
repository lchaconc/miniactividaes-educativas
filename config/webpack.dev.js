const path = require('path');
const HtmlWebpackPlugin = require ("html-webpack-plugin");
const  CopyPlugin = require("copy-webpack-plugin");


const ruleForStyles = {
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
} 

const rules = [ruleForStyles]

module.exports = (env)=> {
    const {idApp} = env;

    console.log(`Iniciando ${idApp} en modo de desarrollo...`);

    return  {
    entry: `./src${idApp}main.js`,
    output: {
        path: path.resolve(__dirname,  `dev/${idApp}`),
        filename: "bundle.[contenthash].js"
    },
    mode: "development",
    resolve: {
        extensions: [".js", ".json"]
      },
      module : {rules},
    plugins: [ new HtmlWebpackPlugin ({
        title: idApp,
        template: `./src${idApp}public/index.html`,
    }),
    new CopyPlugin ({
        patterns: [
            {from: `./src${idApp}/public/assets`, to: "./" }            
        ]
    })
 ]
}

}
