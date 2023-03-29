//elementos que se sueltan sobre el area
const soltados = [];

export function ingresarElemento(idItem, areaSeleccionada, cantItemes) {
  let isCompletados = false;

  /*
   proceso de revisión de elementos de la lista
   clausula que indica si hay un elemento en la lista igual al que se va a ingresar lo elimina antes
   para evitar duplicados.
*/

  soltados.forEach((item, i) => {
    if (item.idItem == idItem) {
      soltados.splice(i, 1);
    }
  });

  const tmp = { idItem, areaSeleccionada };
  soltados.push(tmp);
  console.log("soltados", soltados);

  //verifica longitudes de arreglos para determinar si despliega el botón revisar
  //En caso de la igualadad significa que todos los elementos están colocados

  if (soltados.length == cantItemes) {
    console.log("Completados!!!!!", soltados.length);
    isCompletados = true;
  } else {
    console.log("falta Cantidad:", soltados.length);
    isCompletados = false;
  }

  return isCompletados;
}

export function desordenar(array) {
  //Se hace una copia del areglo mediante spread (paso paramátero por valor)
  //Con el fin de que el primero no se vea afectado
  const tmp = [...array];
  return tmp.sort(() => Math.random() - 0.5);
}

export function verificarCorrectas() {
  const res = {
    correctas: [],
    incorrectas: [],
  };
  soltados.forEach(({ idItem, areaSeleccionada }) => {
    const tmp = idItem.split("-");
    const id = tmp[1];
    //console.log(id);
    //console.log(areaSeleccionada);

    if (id === areaSeleccionada) {
      res.correctas.push(id);
    } else {
      res.incorrectas.push(id);
    }
  });

  return res;

}
