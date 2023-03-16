import * as utils from "./utils.js";
import eventHandlers from "./handlers.js";
import data from "./data/data.json";
import "./css/master.css";

const textos = data.textos;
const areasImagen = data.areasImagen;
const cajasTexto = data.cajasTexto;


onload =()=> setup();

async function setup() {
  console.log("setup");
  
  console.log(textos, areasImagen, cajasTexto);
  
  utils.eliminarElemento("divCargandoDatos");
  utils.renderTexto("divTitulo1", textos.titulo, "h1" );
  utils.renderTexto("divInstrucciones", textos.instruccion, "p", "alert alert-secondary" );
  
  
  utils.renderAreasImg(areasImagen);
  utils.renderCajasTexto(cajasTexto);
  eventHandlers(cajasTexto, textos );  
}
