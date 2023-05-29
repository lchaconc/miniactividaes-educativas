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




export default function App () {

    const refSprites = useRef([]);


    const animarSprite = ()=> {
        console.log(refSprites.current);
    }
    
    return (
        <div style={container}>
            {
                sprites.map(({id, nombreArchivo, alt, animacion, x, y, h, w}, index ) => (
                    <img 
                    key={id}
                    src={nombreArchivo}  
                    alt={alt}
                    style={{
                        top: x,
                        left: y
                    }}
                    onMouseOver={ animarSprite}
                    className={ `img-sprite animate` }
                    ref={elemento => (refSprites.current[index] = elemento)}                  
                      />
                ))
            }
               
        </div>
    )
}
