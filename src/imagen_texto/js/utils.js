export async function cargarJson(path) {
    const res = await fetch (path);
    return await res.json()    
}


export function eliminarElemento(id) {
    const element = document.getElementById(id);
    element.remove();
    
}


export function renderTexto( elemento, texto, etiqueta, clase ) {    
        document.getElementById( elemento ).innerHTML = 
        `<${etiqueta}  ${clase ? `class="${clase}"` : ""  }   > ${texto} </${etiqueta}>`    
    
}


export function renderAreasImg (areas) {
    const divAreasImagen = document.getElementById("divAreasImagen");
    areas.forEach(area => {
        //console.log(area);
        const card = document.createElement("div");        
        const img = document.createElement("img");        
        const cardBody = document.createElement("div");       

        card.classList.add("col-4", "card" );        
        img.classList.add (`card-img-top`);
        cardBody.classList.add ( "area-drop" );        
        cardBody.id = area.id;      


        img.src = `./assets/${area.archivo}`;
        img.alt = area.alt;
        
               
        
        card.append (img);      
        card.append (cardBody);        
        divAreasImagen.append(card);
    });
    
}


export function renderCajasTexto(cajas) {
    console.log("cajas", cajas);
    const divCajasTexto = document.getElementById("divCajasTexto");    
    const longCajas = cajas.length;    
    //console.log(longCajas);    
    
    cajas.forEach(caja => {
        const spnAlert = document.createElement("span");

        spnAlert.classList.add ("alert", "alert-info", "box", "text-center" , "card-text" );
        spnAlert.setAttribute("draggable", true); 
        spnAlert.id = caja.id; 
        spnAlert.innerText = caja.texto;

        const divColumna = document.createElement("div");
        divColumna.classList.add ("col-sm-4", "mb-3", "text-center");
        divColumna.append(spnAlert);
        divCajasTexto.append(divColumna);
    });
    
    
}
