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


export function renderAreas (areas) {
    const divAreas = document.getElementById("divAreas");
    areas.forEach(area => {
        //console.log(area);
        const div = document.createElement("div");        
        div.className = `col-sm-6 area-drop`;  
        div.innerHTML= `<h3> ${area.titulo} </h3>`;
        div.setAttribute("id", area._id ); 
        div.style.backgroundColor = area.backgroundColor;        
        divAreas.append(div);
    });
    
}


export function renderCajas(cajas) {
    console.log("cajas", cajas);
    const divCajas = document.getElementById("divCajas");    
    const longCajas = cajas.length;    
    //console.log(longCajas);    
    
    cajas.forEach(caja => {
        const imagen = document.createElement("img");
        imagen.src = `./${caja.id}`;
        imagen.alt = caja.alt;
        imagen.setAttribute("id", caja.id);
        imagen.className = "img-fluid box";
        imagen.setAttribute("draggable", true);  
        const divColumna = document.createElement("div");
        divColumna.className = "col-sm-2 mb-3";              
        divColumna.append(imagen);
        divCajas.append(divColumna);
    });
    
    
}
