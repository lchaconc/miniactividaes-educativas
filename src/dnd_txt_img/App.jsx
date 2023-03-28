import data from "./data/data.json";
import { desordenar } from "./utils";

console.log(data);
const textos = data.textos;
const cajasAreas = data.cajasAreas;
const desordenadas = desordenar(cajasAreas);
//elementos que se sueltan sobre el area
const soltados = []

console.log("desordenadas", desordenadas);

const handleclic = (e) => {
  const tmp = e.currentTarget.dataset.idArea;
  console.log(tmp);
};

function handleAllowDrop(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  const idItem = e.dataTransfer.getData("texto");
  console.log("Objeto seleccionado: ", idItem);
  e.target.appendChild(document.getElementById(idItem));
  const areaSeleccionada = e.currentTarget.id;
  console.log("Area seleccionada >>>", areaSeleccionada);  
 ingresarElemento(idItem, areaSeleccionada);
}

function handleDragStart (e) {
  console.log(e.target.id);
  e.dataTransfer.setData("texto", e.target.id);
}

const ingresarElemento = (idItem, areaSeleccionada ) => {
    const tmp = {idItem, areaSeleccionada}
    soltados.push (tmp);
    console.log("soltados",soltados);
}

export default function App() {
  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-12 text-center">
          <h1> {textos.titulo} </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 alert alert-secondary">
          {textos.instrucciones}
        </div>
      </div>
      <div className="row">
        {cajasAreas &&
          cajasAreas.map((item) => (
            <div key={item._id} className="col card pb-2">
              <img className="img-fluid" src={item.urlImg} alt={item.alt} />

              <div 
              id={item._id} 
              className="card-body bg-info area-drop"              
              onDragOver={handleAllowDrop}
              onDrop={handleDrop}
              ></div>
            </div>
          ))}
      </div>

      <div className="row">
        {desordenadas.map((item) => (
          <div
            key={item._id}
            id={"txt-"+item._id }
            data-id-area={item._id}
            className="col text-center alert alert-primary box"
            draggable={true}
            onClick={handleclic}
            onDragStart={handleDragStart}
          >
            <h4> {item.texto}</h4>
            <audio
              className="audio-player"
              src={item.urlAudio}
              preload="auto"
              controls={true}
            ></audio>
          </div>
        ))}
      </div>
    </div>
  );
}
