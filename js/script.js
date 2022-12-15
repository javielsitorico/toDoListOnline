let svgTiempo = 'media/svg/time.svg';
let svgPapelera = 'media/svg/trash.svg';
let listaParaHacer = document.getElementById('elementos-para-hacer');
let listaHaciendo = document.getElementById('elementos-haciendo');
let listaHecho = document.getElementById('elementos-hechos');
let listasTareas = [listaParaHacer, listaHaciendo, listaHecho];
let textoContenedorVacio = '<p id="texto--tareas-vacias" class="texto-secundario">There are currently no tasks</p>';

let tareas = {};

function actualizarContenedoresVacios() {
      for (lista of listasTareas) {
            if (lista.childElementCount < 1) {
                  lista.innerHTML = (textoContenedorVacio);
            } else if (lista.innerHTML != textoContenedorVacio && lista.childElementCount > 1){
                  let contenidoNuevo = (lista.innerHTML).replace(textoContenedorVacio, '');
                  lista.innerHTML = contenidoNuevo;
            }
      }
}

function formatoTarea(nombre, duracion, estado) {
      let accionBoton = null;
      let nombreAccionBoton = null;

      switch (estado) {
            case 0:
                  accionBoton = `empezarTarea('${nombre}')`;
                  nombreAccionBoton = 'Begin Task';
                  break;
            case 1:
                  accionBoton = `marcarTareaAcabada('${nombre}')`;
                  nombreAccionBoton = 'Complete Task ✔️';
                  break;
            case 2:
                  return `
                  <div class="tarea" id="${nombre}>
                        <p class="nombre-tarea">${nombre}</p>
                        <img src="media/svg/time.svg" alt="">
                        <p>: ${duracion} min</p>
                        <button class="button-red button-small" onclick="eliminarTarea('${nombre}')">
                              <img src="media/svg/trash.svg" alt="">
                        </button>
                  </div>
                  `
            default:
                  return
      }

      return `
      <div class="tarea" id="${nombre}">
            <p class="nombre-tarea">${nombre}</p>
            <img src="media/svg/time.svg" alt="">
            <p>: ${duracion} min</p>
            <button class="button-small" onclick="${accionBoton}">${nombreAccionBoton}</button>
            <button class="button-red button-small" onclick="eliminarTarea('${nombre}')">
                  <img src="media/svg/trash.svg" alt="">
            </button>
      </div>
      `
}

function crearTarea() {
      let nombreNuevaTarea = document.getElementById('input--nombre-tarea');
      let tiempoTarea = document.getElementById('input--tiempo-tarea');
      let estadoTarea = 0;

      if (nombreNuevaTarea.value in tareas || nombreNuevaTarea.value == '') {
            nombreNuevaTarea.style.border = '1px solid #E02929'; 
            return;
      } else {
            nombreNuevaTarea.style.border = 'none'; 
      }

      if (tiempoTarea.value < 1 || tiempoTarea.value > 360 || tiempoTarea.value == '') {
            tiempoTarea.style.border = '1px solid #E02929';
            return;
      } else {
            tiempoTarea.style.border = 'none';
      }

      tareas[nombreNuevaTarea.value] = [tiempoTarea.value, estadoTarea];
      let nuevaTarea = formatoTarea(nombreNuevaTarea.value, tiempoTarea.value, estadoTarea)
      listaParaHacer.innerHTML += nuevaTarea;
      actualizarContenedoresVacios();
}

function empezarTarea(nombreTarea) {
      console.log(nombreTarea);
}

function marcarTareaAcabada(nombreTarea) {

}

function eliminarTarea(nombreTarea) {
      document.getElementById(nombreTarea).remove();
      delete tareas[nombreTarea];
      actualizarContenedoresVacios();
}

actualizarContenedoresVacios();