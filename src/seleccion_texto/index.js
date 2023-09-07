import eventHandler from "./event-handler.js";
import data from "./data/data.json";
import "./css/master.css";
import "animate.css";

const {textos, oraciones } = data;

onload = () => setup();

function setup() {
  renderTextos();
  document.getElementById("divRoot").innerHTML = "";
  renderOraciones();
  eventHandler(textos);
  
}

function renderOraciones() {
  oraciones.forEach((oracion) => {
    //console.log(oracion);
    renderItemes(oracion);
  });
}

function renderItemes(oracion) {
  const items = oracion.items;
  const parrafoItem = document.createElement("p");
  parrafoItem.innerHTML = `<span class="numero" > ${oracion.id} </span>`;

  items.forEach((item) => {
    //console.log(item);

    //validación por tipo de item
    //si es oración renderiza un span, si es tipo sleccion renderiza un selecct

    if (item.tipo == "oracion") {
      const spnOracion = document.createElement("span");
      spnOracion.innerText = item.texto;
      //console.log("item.texto", item.texto);
      parrafoItem.append(spnOracion);
    }

    if (item.tipo == "seleccion") {
      const selector = document.createElement("select");
      selector.classList.add("selector", "animate__animated" );
      selector.id = item.id;
      selector.dataset.correcta = item.correcta;
      const defaultValue = document.createElement("option");
      defaultValue.defaultSelected = true;
      defaultValue.innerText = "Seleccione una opción";
      defaultValue.disabled = true;
      selector.append(defaultValue);
      item.opciones.forEach((opcion) => {
        const opt = document.createElement("option");
        opt.value = opcion;
        opt.innerHTML = opcion;
        selector.append(opt);
      });
      parrafoItem.append(selector);
    }
  });

  document.getElementById("divRoot").append(parrafoItem);
}

function renderTextos() {
    //console.log(textos);
    document.getElementById("titulo").innerHTML = textos.titulo;
    document.getElementById("instrucciones").innerHTML = textos.instrucciones;
}
