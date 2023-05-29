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


    const animarSprite = (e)=> {
       const actual = e.target;
       const animacion = actual.dataset.animacion;
       actual.classList.add( animacion)
    }

    const removerAnimacion =(e)=> {
        const actual = e.target;
        const animacion = actual.dataset.animacion;
        actual.classList.remove( animacion)
    }
    
    return (
        <div style={container}>
            {
                sprites.map(({id, nombreArchivo, alt, animacion, x, y, h, w}, index ) => (
                    <img 
                    key={id}
                    id={id}
                    data-index={index}
                    data-animacion={animacion}
                    src={nombreArchivo}  
                    alt={alt}
                    style={{
                        top: x,
                        left: y
                    }}
                    onMouseOver={ animarSprite}
                    onMouseLeave={removerAnimacion}
                    className={ "img-sprite animate__animated"}                    
                    
                    />
                ))
            }
               
        </div>
    )
}
