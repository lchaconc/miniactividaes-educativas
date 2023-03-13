import textos from "../data/textos.js";

export default function handlerSetup() {
  const btnRevisar = document.getElementById("btnRevisar");
  btnRevisar.hidden = false;
  btnRevisar.addEventListener("click", handleVerificar);
}

function handleVerificar() {
  console.log("verificando");
  let cantIncorrectas = 0;
  let selectores = document.getElementsByTagName("select");
  selectores = [...selectores];
  selectores.forEach((selector) => {
    console.log(selector.dataset.correcta);
    if (selector.value == selector.dataset.correcta) {
      selector.classList.add("correcta");
    } else {
      selector.classList.add("incorrecta");
      cantIncorrectas++;
    }
  });
  mostrarRetroalimentacion(cantIncorrectas)
}

function mostrarRetroalimentacion(cantIncorrectas) {
  const divMensaje = document.getElementById("divMensaje");
  const alert = document.createElement("div");
  if (cantIncorrectas <= 0) {
    alert.classList.add ("alert", "alert-success");
    alert.innerText = textos.retroCorrecta;
  } else {
    alert.classList.add ("alert", "alert-danger");
    alert.innerText = textos.retroIncorrecta;
  }
  divMensaje.innerHTML = ""; 
  divMensaje.append (alert);
}
