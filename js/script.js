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
            console.log(lista.innerHTML);
            if (lista.childElementCount <= 0) {
                  lista.innerHTML = (textoContenedorVacio);
            } else if (lista.innerHTML != textoContenedorVacio){
                  console.log(lista.innerHTML);
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
                  accionBoton = 'empezarTarea()';
                  nombreAccionBoton = 'Begin Task';
                  break;
            case 1:
                  accionBoton = 'marcarTareaAcabada()';
                  nombreAccionBoton = 'Complete Task ✔️';
                  break;
            case 2:
                  return `
                  <div class="tarea">
                        <p class="nombre-tarea">${nombre}</p>
                        <img src="media/svg/time.svg" alt="">
                        <p>: ${duracion} min</p>
                        <button class="button-red button-small" onclick="eliminarTarea(${nombre})">
                              <img src="media/svg/trash.svg" alt="">
                        </button>
                  </div>
                  `
            default:
                  return
      }

      return `
      <div class="tarea">
            <p class="nombre-tarea">${nombre}</p>
            <img src="media/svg/time.svg" alt="">
            <p>: ${duracion} min</p>
            <button class="button-small" onclick="${accionBoton}">${nombreAccionBoton}</button>
            <button class="button-red button-small" onclick="eliminarTarea(${nombre})">
                  <img src="media/svg/trash.svg" alt="">
            </button>
      </div>
      `
}

function crearTarea() {
      let nombreTarea = document.getElementById('input--nombre-tarea');
      let tiempoTarea = document.getElementById('input--tiempo-tarea');
      let estadoTarea = 0;

      if (nombreTarea.value in tareas || nombreTarea.value == '') {
            nombreTarea.style.border = '1px solid #E02929'; 
            return;
      } else {
            nombreTarea.style.border = 'none'; 
      }

      if (tiempoTarea.value < 1 || tiempoTarea.value > 360 || tiempoTarea.value == '') {
            tiempoTarea.style.border = '1px solid #E02929';
            return;
      } else {
            tiempoTarea.style.border = 'none';
      }


      tareas[nombreTarea.value] = [tiempoTarea.value, estadoTarea];
      let nuevaTarea = formatoTarea(nombreTarea.value, tiempoTarea.value, estadoTarea)
      listaParaHacer.innerHTML += nuevaTarea;
      actualizarContenedoresVacios();
}

actualizarContenedoresVacios();