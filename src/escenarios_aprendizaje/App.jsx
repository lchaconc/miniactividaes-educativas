import React, { useRef, useEffect, useState } from "react";
import sprites from "./data/data.json";
import * as utils from "./utils";

const container = {
  backgroundImage: `url("fondo.jpg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  width: "100%",
};

export default function App() {
  const [tipo, setTipo] = useState(null);
  const [info, setInfo] = useState(null);
  const [detalles, setDetalles] = useState(null);
  const [titulo, setTitulo] = useState(null);
  const [isModal, setIsModal] = useState(false);

  const animarSprite = (e) => {
    const actual = e.target;
    const animacion = actual.dataset.animacion;
    actual.classList.add(animacion, "color-rojo");
  };

  const removerAnimacion = (e) => {
    const actual = e.target;
    const animacion = actual.dataset.animacion;
    actual.classList.remove(animacion, "color-rojo");
  };

  const handleAbrirModal = (e) => {
    const sprite = utils.buscarPorId(e.target.id, sprites);
    console.log(sprite);
    setTipo(sprite.tipo);
    setInfo(sprite.info);
    setDetalles(sprite.detalles);
    setTitulo(sprite.titulo);
    setIsModal(true);
  };

  const handleCerrarModal = () => {
    setIsModal(false);
    setInfo(null);
  };

  return (
    <>
      <div style={container}>
        {sprites.map(({ id, nombreArchivo, alt, animacion, x, y, h, w }) => (
          <img
            key={id}
            id={id}
            data-animacion={animacion}
            src={nombreArchivo}
            alt={alt}
            style={{
              top: x,
              left: y,
            }}
            onMouseOver={animarSprite}
            onMouseLeave={removerAnimacion}
            onClick={handleAbrirModal}
            className={"img-sprite animate__animated"}
          />
        ))}
      </div>
      {isModal && (
        <div id="modal" className="modal">
          <div className="modal-content">
            <span
              id="btnCloseModal"
              className="close"
              onClick={handleCerrarModal}
            >
              &times;
            </span>

            {tipo === "video" && info && (
              <>
                <h3>{titulo}</h3>
                <iframe className="visor-video" src={info}></iframe>
                <p>{detalles}</p>
              </>
            )}
            {tipo === "audio" && (
              <>
                <h3>{titulo}</h3>
                <audio src={info} controls autoPlay>
                  {" "}
                </audio>
                <p>{detalles}</p>
              </>
            )}
            {tipo === "texto" && (
              <>
                <h3>{titulo}</h3>
                <p dangerouslySetInnerHTML={utils.crearHtml(info)}></p>
                <span>{detalles} </span>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
