import React, { useState, useEffect } from "react";

import data from "./data/data.json";
import { desordenar, ingresarElemento } from "./utils";
//cantidad de itemes (cajas) para determinar si ya colocó todos los textos (completado)
let cantItems = 0;

export default function App() {
  const [textos, setTextos] = useState(null);
  const [cajasAreas, setCajasAreas] = useState(null);
  const [desordenadas, setDesordenadas] = useState(null);

  useEffect(() => {
    setup();
  }, []);

  const setup = () => {
    console.log(data);
    setTextos(data.textos);
    setCajasAreas(data.cajasAreas);
  };

  useEffect(() => {
    if (cajasAreas) {
      cantItems = cajasAreas.length;
      setDesordenadas(desordenar(cajasAreas));
    }    
  }, [cajasAreas]);

  const handleclic = (e) => {
    const tmp = e.currentTarget.dataset.idArea;
    //console.log(tmp);
  };

  function handleAllowDrop(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const idItem = e.dataTransfer.getData("texto");
    //console.log("Objeto seleccionado: ", idItem);
    e.target.appendChild(document.getElementById(idItem));
    const areaSeleccionada = e.currentTarget.id;
    //console.log("Area seleccionada >>>", areaSeleccionada);
    ingresarElemento(idItem, areaSeleccionada, cantItems);
  }

  function handleDragStart(e) {
    //console.log(e.target.id);
    e.dataTransfer.setData("texto", e.target.id);
  }

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-12 text-center">
          <h1> {textos && textos.titulo} </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 alert alert-secondary">
          {textos && textos.instrucciones}
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
        {desordenadas &&
          desordenadas.map((item) => (
            <div
              key={item._id}
              id={"txt-" + item._id}
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
