let retroCorrecta;
let retroIncorrecta;

export default function handlerSetup(textos) {
  const btnRevisar = document.getElementById("btnRevisar");
  btnRevisar.hidden = false;
  retroCorrecta = textos.retroCorrecta;
  retroIncorrecta = textos.retroIncorrecta;
  btnRevisar.addEventListener("click", handleVerificar);
}

function handleVerificar() {
  console.log("verificando");
  let cantIncorrectas = 0;
  let selectores = document.getElementsByTagName("select");
  selectores = [...selectores];
  selectores.forEach((selector) => {    
    console.log(selector.dataset.correcta);
    selector.classList.remove("correcta", "incorrecta", "animate__rubberBand" );     
    
    if (selector.value == selector.dataset.correcta) {
      selector.classList.add("correcta", "animate__rubberBand" );
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
    alert.classList.add ("alert", "alert-success", "animate__animated", "animate__flipInY" );
    alert.innerText = retroCorrecta;
  } else {
    alert.classList.add ("alert", "alert-danger", "animate__animated", "animate__shakeX" );
    alert.innerText = retroIncorrecta;
  }
  divMensaje.innerHTML = ""; 
  divMensaje.append (alert);
}
