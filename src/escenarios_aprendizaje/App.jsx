import React, { useRef } from 'react';
import sprites from "./data/data.json";

const container = {
  backgroundImage: `url("fondo.jpg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  width: "100%",
};

export default function App() {

    const refModal = useRef(null);

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

  const handleAbrirModal =()=> {        
    refModal.current.style.display = "block"; 
  }

  const handleCerrarModal =()=> {
    refModal.current.style.display = "none"; 
  }

  return (
    <>
      <div style={container}>
        {sprites.map(
          ({ id, nombreArchivo, alt, animacion, x, y, h, w }, index) => (
            <img
              key={id}
              id={id}
              data-index={index}
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
          )
        )}
      </div>
      <div id="modal" className="modal" ref={refModal} >
        <div className="modal-content">
          <span 
          id="btnCloseModal" 
          className="close"
          onClick={handleCerrarModal}
          >
            &times;
          </span>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos
          voluptate dolore minima. Ut quis id, soluta delectus hic quam pariatur
          unde nisi voluptatum, perspiciatis animi ipsum voluptatibus dolores
          molestias. Quo.
        </div>
      </div>
    </>
  );
}
