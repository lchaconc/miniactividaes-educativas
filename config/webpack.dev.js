const path = require('path');
const HtmlWebpackPlugin = require ("html-webpack-plugin");
const  CopyPlugin = require("copy-webpack-plugin");


const ruleForStyles = {
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
}

const ruleBabel = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          ["@babel/preset-env", { corejs: 3.29, useBuiltIns: "usage" }],
          ["@babel/preset-react", { runtime: "automatic" }]
        ]
      }
    }
  };



const rules = [ruleForStyles, ruleBabel ]

module.exports = (env)=> {
    const {idApp} = env;

    console.log(`Iniciando ${idApp} en modo de desarrollo...`);

    return  {
    entry:  path.resolve( __dirname, `../src${idApp}index.js` ),
    output: {
        path: path.resolve(__dirname,  `dev/${idApp}`),
        filename: "bundle.[contenthash].js"
    },
    mode: "development",
    resolve: {
        extensions: [".js", "jsx", ".json"]
      },
      module : {rules},
    plugins: [ new HtmlWebpackPlugin ({
        title: idApp,
        template:   path.resolve(__dirname, `../src${idApp}public/index.html`),
    }),
    new CopyPlugin ({
        patterns: [
            {
              from:  path.resolve (__dirname, `../src${idApp}/public/assets` ), 
              to: "./" 
            }
        ]
    })
 ]
}

}
