const path = require('path');
const HtmlWebpackPlugin = require ("html-webpack-plugin");
const  CopyPlugin = require("copy-webpack-plugin");
const ZipPlugin = require( "zip-webpack-plugin" );


const ruleForStyles = {
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
} 

const rules = [ruleForStyles]
//const idApp = argv.idApp;
module.exports = (env) => { 
    const {idApp} = env;
    
    console.log(`Iniciando el empaquetado en modo "PRODUCCIÓN" de la aplicación ${idApp}`);    


    return  {
    entry: `./src${idApp}main.js`,
    output: {
        path: path.resolve(__dirname,  `../dist/${idApp}`),
        filename: "bundle.[contenthash].js"
    },
    mode: "production",
    resolve: {
        extensions: [".js", ".json"]
      },
      module : {rules},
    plugins: [ 
    new HtmlWebpackPlugin ({
        title: idApp,
        template: `./src${idApp}public/index.html`,
    }),
    new CopyPlugin ({
        patterns: [
            {from: `./src${idApp}/public/assets`, to: "./" }            
        ]
    }),
    new ZipPlugin ({
        path: path.resolve(__dirname, "../zips"),
        filename: idApp,
        extension: "zip",
    })
 ]
}

}