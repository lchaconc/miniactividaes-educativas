import * as utils from "./utils.js";
import rutas from "../config/rutas.js";
import eventHandlers from "./handlers.js";


onload =()=> setup();

async function setup() {
  console.log("setup");
  const textos = await utils.cargarJson(rutas.textos);
  const areasImagen = await utils.cargarJson(rutas.areasImagen);
  const cajasTexto = await utils.cargarJson(rutas.cajasTexto);  
  
  utils.eliminarElemento("divCargandoDatos");
  utils.renderTexto("divTitulo1", textos.titulo, "h1" );
  utils.renderTexto("divInstrucciones", textos.instruccion, "p", "alert alert-secondary" );
  
  
  utils.renderAreasImg(areasImagen);
  utils.renderCajasTexto(cajasTexto);
  eventHandlers(cajasTexto, textos );  
}
