const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");
const path = require("path");



module.exports = (idApp)=> {
  
  console.log("idApp en modo producción", idApp);


  return {
    entry:  `./proy/${idApp}/public/scripts/main.js`,    
    output: {                
        path: path.resolve( __dirname,  `../../builds/${idApp}`),
        filename: "bundle.[contenthash].js"
    },
    mode: "production",
    resolve: {
      extensions: [".js", ".json"]
    },
    plugins: [new HtmlWebpackPlugin({template:   `./proy/${idApp}/public/index.html`}),    
    new CopyPlugin({
        patterns: [
          { from:  `./proy/${idApp}/public/assets`, to: "./" },
          { from: `./proy/${idApp}/public/css`, to: "./" }       
        ],
      }),
      new ZipPlugin({
        path: path.resolve(__dirname, "../../zips"),
        filename: `${idApp}.zip`,
        extension: "zip",
      })
   ]
  }

}