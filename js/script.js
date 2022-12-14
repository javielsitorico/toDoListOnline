function comprobarTareasVacias() {
     let parrafoElementoVacio = '';
     let listasTareas = document.getElementsByClassName('lista-tareas');
     for (let lista of listasTareas) {
          if(lista.childElementCount <= 0) {
               lista.appendChild(parrafoElementoVacio)
          }
     }
}

comprobarTareasVacias();