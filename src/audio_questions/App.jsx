import data from "./data/data.json";
import { Fragment } from "react";



const handleVerificarCorrecta =(e)=> {
  console.log(e.target.dataset.opt );
}

export default function App(params) {
  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-12 text-center">
          <h1> {data.textos.titulo} </h1>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-12">{data.textos.instrucciones}</div>
      </div>
      <hr />

      {data.items.map(item => (
        <div className="row" key={item.id} >
          <div className="col-12">
          <audio src={item.audio} controls={true} ></audio>
          </div>
          {
            item.preguntas.map ( pregunta => (              
                <div key={pregunta.id} className="alert alert-primary" >
                  {pregunta.enunciado}
                  <ul>
                    {
                      pregunta.opciones.map ( (opcion, i ) => (
                        <Fragment key={i}>
                        <li
                        data-opt={i} 
                        className="badge text-bg-info wt-s"
                        onClick={handleVerificarCorrecta}
                        role={"button"}
                          > 
                        🔸 {opcion} 
                        </li>
                        <br />
                        </Fragment >
                      ))
                    }
                  </ul>
                </div>              
            ) )
          }
        </div>
      ))}
    </div>
  );
}
