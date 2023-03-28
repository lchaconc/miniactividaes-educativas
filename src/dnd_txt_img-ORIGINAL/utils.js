import Globals from "./globals";

export function eliminarElemento(id) {
  const element = document.getElementById(id);
  element.remove();
}

export function renderTexto(elemento, texto, etiqueta, clase) {
  document.getElementById(elemento).innerHTML = `<${etiqueta}  ${
    clase ? `class="${clase}"` : ""
  }   > ${texto} </${etiqueta}>`;
}

export function renderAreasImg(areas) {
  console.log("areas", areas);

  const divAreasImagen = document.getElementById("divAreasImagen");
  areas.forEach((area) => {
    //console.log(area);
    const card = document.createElement("div");
    const img = document.createElement("img");
    const cardBody = document.createElement("div");

    card.classList.add("col-4", "card", "animate__animated");
    img.classList.add("card-img-top", "area-img");
    cardBody.classList.add("area-drop");
    cardBody.id = area.id;

    img.src = `./${area.urlImg}`;
    img.alt = area.alt;

    card.append(img);
    card.append(cardBody);
    divAreasImagen.append(card);
  });
}

export function renderCajasTexto(cajas) {
  console.log("cajas", cajas);
  const divCajasTexto = document.getElementById("divCajasTexto");
  const longCajas = cajas.length;
  //console.log(longCajas);
  cajas = desordenar(cajas);
  cajas.forEach((caja) => {
    const spnAlert = document.createElement("span");

    const iSpeaker = document.createElement("img");

    spnAlert.classList.add(
      "alert",
      "alert-info",
      "box",
      "text-center",
      "card-text",
      "animate__animated"
    );
    spnAlert.setAttribute("draggable", true);
    spnAlert.id = caja._id;
    spnAlert.dataset.idArea = caja.idArea;
    spnAlert.innerText = `🔊 ${caja.texto}`;

    const divColumna = document.createElement("div");
    divColumna.classList.add("col-sm-4", "mb-3", "text-center");

    divColumna.append(spnAlert);
    divCajasTexto.append(divColumna);

    //Creación del emeneto audio par luego insertarlos enpropiedad audios de Globals
    // Esto con el fin de cargar dicha varbiale en el manejador de evnetos y reproducir su sonido
    const tmpAudio = document.createElement("AUDIO");
    tmpAudio.setAttribute("src", `${caja.urlAurio}.mp3`);
    tmpAudio.setAttribute("id", `audio${caja.idArea}`);
    tmpAudio.setAttribute("preload", "auto");
    Globals.audios.push(tmpAudio);
  });
}

function desordenar(array) {
  return array.sort(() => Math.random() - 0.5);
}
