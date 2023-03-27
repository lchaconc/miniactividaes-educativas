import {renderTexto} from "./utils.js";
import Globals from "./globals.js";

let cajas;
//cantidad de elementos arrastrables. Obtiene el valor length de "cajas":
let cantItems=0;
let textos;
let listaAcomodados = [];


export default function eventHandlers (pCajas, pTextos ) {
    cajas = pCajas; 
    textos = pTextos;
    cantItems = pCajas.length;   
    let areaDrop = document.getElementsByClassName("area-drop");
    let box = document.getElementsByClassName("box");        
    areaDrop = [...areaDrop  ];
    box = [...box];
    //console.log(areaDrop);
    areaDrop.forEach(item => {        
        item.addEventListener("drop", handleDrop );
        item.addEventListener("dragover", handleAllowDrop );
    });

    box.forEach(item => {
        item.addEventListener("dragstart", handleDrag );
        item.addEventListener("click", handlePlayAudioBox);
    });

    document.getElementById("btnRevisarReiniciar").addEventListener("click", handleConmutador);
    
}

function handlePlayAudioBox(e) {    
    const { idArea}= e.target.dataset;        
    console.log(idArea); 
    console.log(Globals.audios);
    Globals.audios.forEach( audio => {
        console.log(audio.id);
        if (audio.id === `audio${idArea}` ) {
            audio.play()    
        }
        
    } )

}



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
    const idArea = obtenerDatos(idItem);
    console.log("idArea", idArea);
    ingresarElemento(idItem, idArea, areaSeleccionada )

    
}


function handleDrag (e) {
    console.log(e.target.id);
    e.dataTransfer.setData("texto", e.target.id);  
  }

  
function obtenerDatos (idItem) {
    let idArea
    cajas.forEach( caja => {
        //console.log(caja);
        if (caja.id == idItem) {
            idArea = caja.idArea
        }
    })
    return idArea;
  }

function ingresarElemento (idItem, idArea, areaSeleccionada ) {
    const tmp = {
        idItem, areaSeleccionada, idArea
    }
/*
   proceso de revisión de elementos de la lista
   clausula que indica si hay un elemento en la lista igual al que se va a ingresar lo elimina antes
   para evitar duplicados.
*/

    listaAcomodados.forEach((item, i) =>{
        if (item.idItem == idItem) {
            listaAcomodados.splice(i, 1);
        }
    })
    //ingresa el item solatado a la fila 
    listaAcomodados.push (tmp);        
    //console.log("listaAcomodados", listaAcomodados);


    //verifica longitudes de arreglos para determinar si despliega el botón revisar
    //En caso de la igualadad significa que todos los elementos están colocados
    console.log("listaAcomodados",listaAcomodados.length);
    console.log("cantItems", cantItems);

    if (listaAcomodados.length == cantItems ) {
       document.getElementById("filaBoton").hidden = false;
    }


  }


function handleConmutador (e) {
    /*
    manjedaor de ventos que verifica qué estado de botón es: REVISAR o REINICIAR
    Esta verificación la hace mediante la propiedad "title" del botón
    depende de la verificación carga el método revisar o reiniciar
    */ 

    if (e.target.title == "revisar" ) {
        revisar()
    } else {
        reiniciar()
    };

    

    
}


function revisar () {
    let cantIncorrectas = 0;
    //console.log(listaAcomodados);

    listaAcomodados.forEach(item => {
        console.log("item", item); 
        //instrucción para quitarle el arrastarble para evitar que el usuario las vuelva a acomodar
        //(debe reiniciar la aplicación para poder arrastrarlas nuevamente)
        document.getElementById(item.idItem).draggable= false;      

        if (item.idArea == item.areaSeleccionada ) {
            document.getElementById(item.idItem).classList.add ("correcta", "animate__tada"  ) 
        } else {
            document.getElementById(item.idItem).classList.add ("incorrecta", "animate__animated"   )
            cantIncorrectas++            
        }
        console.log(">>>>>", cantIncorrectas );
    } );

    //Funcionalidad para mostrar mensaje de retroalimentación 
    //si encuentra una sola incorrecta despliega mesanje de incorrecto.
    //El texto de carga del json textos
    if (cantIncorrectas <= 0) {
        renderTexto("divMensaje", textos.retroCorrecta, "p", "alert alert-success animate__animated animate__flipInX"); 
    } else {
        renderTexto("divMensaje", textos.retroIncorrecta, "p", "alert alert-danger animate__animated animate__bounce");
    }


    //Cambia el botón de "revisar" a reiniciar
    const btnRevisarReiniciar = document.getElementById("btnRevisarReiniciar");
    btnRevisarReiniciar.innerText = "REINICIAR";
    btnRevisarReiniciar.classList.remove ("btn-azul");
    btnRevisarReiniciar.classList.add("btn-rojo");
    btnRevisarReiniciar.title = "reiniciar";

}


function reiniciar () {
    window.location.reload();
}

