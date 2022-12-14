comprobarTareasVacias();

function comprobarTareasVacias() {
     let parrafoElementoVacio = document.createElement('p');
     parrafoElementoVacio.classList.add('texto-secundario');
     parrafoElementoVacio.innerHTML = 'There are currently no tasks';
     let listasTareas = document.getElementsByClassName('lista-tareas');
     for (let lista of listasTareas) {
          if(lista.childElementCount <= 0) {
               lista.appendChild(parrafoElementoVacio.cloneNode(true));
          }
     }
}