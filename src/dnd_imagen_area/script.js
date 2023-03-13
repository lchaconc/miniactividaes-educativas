const {buildProd, buildDev} = require ("./builder.js")

async function setup () {
    const stats = await buildProd("63fd14642400e59c6411bc50");
    //const stats = await buildDev ("63fd14642400e59c6411bc50");
    //console.log(stats);    
}

setup()