import * as utils from "./utils.js";
import eventHandlers from "./handlers.js";
import data from "./data/data.json";
import "./css/master.css";
import "animate.css";


const textos = data.textos;
const cajasAreas = data.cajasAreas;



onload =()=> setup();

async function setup() {
  console.log("setup");
  
  //console.log(textos,  cajasAreas);
  
  utils.eliminarElemento("divCargandoDatos");
  utils.renderTexto("divTitulo1", textos.titulo, "h1" );
  utils.renderTexto("divInstrucciones", textos.instrucciones, "p", "alert alert-secondary" );
  
  
  utils.renderAreasImg(cajasAreas);
  utils.renderCajasTexto(cajasAreas);
  //eventHandlers(cajasAreas, textos );  
}
