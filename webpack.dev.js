const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

const idApp = "dnd_imagen_area";

module.exports = ()=> {
  
  console.log("idApp en modo de desarrollo", idApp);


  return {
    entry:  `./src/${idApp}/public/scripts/main.js`,
    output: {                
        path: path.resolve( __dirname,  `build`),
        filename: "bundle.[contenthash].js"
    },
    mode: "development",
    resolve: {
      extensions: [".js", ".json"]
    },
    plugins: [new HtmlWebpackPlugin({template:   `./src/${idApp}/public/index.html`}),
    new CopyPlugin({
        patterns: [
          { from:  `./src/${idApp}/public/assets`, to: "./" },
          { from: `./src/${idApp}/public/css`, to: "./" }              
        ],
      })   
   ]
  }

}