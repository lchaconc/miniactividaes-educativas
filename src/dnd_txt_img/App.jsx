import React, { useState, useEffect, useRef } from "react";

import data from "./data/data.json";
import { desordenar, ingresarElemento, verificarCorrectas } from "./utils";
//cantidad de itemes (cajas) para determinar si ya colocó todos los textos (completado)
let cantItems = 0;

export default function App() {
  const [textos, setTextos] = useState(null);
  const [cajasAreas, setCajasAreas] = useState(null);
  const [desordenadas, setDesordenadas] = useState(null);
  const [isCompletados, setIsCompletados] = useState(false);
  const [isCorrectas, setIsCorrectas] = useState(false);

  //verifica si renderiza la alerta de retroalimentación
  //además renderiza el btn "reset"
  const [isRetro, setIsRetro] = useState(false);
  

  const refCajas = useRef([]);

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
    setIsCompletados(ingresarElemento(idItem, areaSeleccionada, cantItems));
  }

  function handleDragStart(e) {
    //console.log(e.target.id);
    e.dataTransfer.setData("texto", e.target.id);
  }

  const handleVerificarCorrectas = () => {
    const res = verificarCorrectas();
    //ciclo que recorre las referencias y las incorrecta para determianr si hay
    //alguna incorrecta y agregarle una clase css "de incorrecta"
    refCajas.current.forEach((caja) => {
      console.log(caja.id);
      res.incorrectas.forEach((item) => {
        //validación si conincide con un elemento incoreto  se agrega una clase css:
        if (caja.id === item) {
          caja.setAttribute("class", "incorrecta");
        }
      });

      res.correctas.forEach((item) => {
        //validación si conincide con un elemento incoreto  se agrega una clase css:
        if (caja.id === item) {
          caja.setAttribute("class", "correcta");
        }
      });
    });

    res.incorrectas.length === 0 && setIsCorrectas(true);
    //Activa el estado "isRetro" para poder mostrar el alert
    setIsRetro(true);     

  };

  const handleReset =()=> {
    location.reload();     
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
        {isRetro && isCorrectas && (
          <div className="col-12 alert alert-success animate__animated  animate__rubberBand">
            {textos && textos.retroCorrecta}
          </div>
        )}
        {isRetro && !isCorrectas && (
          <div className="col-12 alert alert-danger animate__animated animate__bounce">
            {textos && textos.retroIncorrecta}
          </div>
        )}
      </div>

      <div className="row">
        {cajasAreas &&
          cajasAreas.map((item, i) => (
            <div key={item._id} className="col card pb-2">
              <img className="img-fluid" src={item.urlImg} alt={item.alt} />

              <div
                id={item._id}
                ref={(ref) => (refCajas.current[i] = ref)}
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

      <div className="row mt-4">
        <div className="col-12 text-end">
          {(isCompletados && !isRetro )  && (
            <button
              id="btnRevisarReiniciar"
              title="revisar"
              className="btn btn-azul"
              onClick={handleVerificarCorrectas}
            >
              REVISAR MI PRÁCTICA
            </button>
          )}

          {
            (isCompletados && isRetro) && (
                <button 
                className="btn btn-rojo"
                onClick={handleReset}
                >
                    REINICIAR
                </button>
            )
          }



        </div>
      </div>
    </div>
  );
}
