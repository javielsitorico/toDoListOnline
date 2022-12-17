let svgTiempo = 'media/svg/time.svg';
let svgPapelera = 'media/svg/trash.svg';
let temasColoresJSON = './../media/colorThemes.json';
let temasColores;
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
            } else if (lista.innerHTML != textoContenedorVacio && lista.childElementCount > 1) {
                  let contenidoNuevo = (lista.innerHTML).replace(textoContenedorVacio, '');
                  lista.innerHTML = contenidoNuevo;
            }
      }
}

function formatoTarea(nombre, duracion, etapa) {
      let accionBoton = null;
      let nombreAccionBoton = null;

      switch (etapa) {
            case 0:
                  accionBoton = `empezarTarea('${nombre}')`;
                  nombreAccionBoton = 'Begin';
                  break;
            case 1:
                  accionBoton = `marcarTareaAcabada('${nombre}')`;
                  nombreAccionBoton = 'Done ✔️';
                  break;
            case 2:
                  return `
                  <div class="tarea" id="${nombre}">
                        <p class="nombre-tarea">${nombre}</p>
                        <img src="${svgTiempo}" class="imagen-reloj" alt="">
                        <p>: ${duracion} min</p>
                        <button class="button-red button-small" onclick="eliminarTarea('${nombre}')">
                              <img src="${svgPapelera}" class="imagen-papelera" alt="">
                        </button>
                  </div>
                  `
            default:
                  return
      }

      return `
      <div class="tarea" id="${nombre}">
            <p class="nombre-tarea">${nombre}</p>
            <img src="${svgTiempo}" class="imagen-reloj" alt="">
            <p>: ${duracion} min</p>
            <button class="button-small" onclick="${accionBoton}">${nombreAccionBoton}</button>
            <button class="button-red button-small" onclick="eliminarTarea('${nombre}')">
                  <img src="${svgPapelera}" class="imagen-papelera" alt="">
            </button>
      </div>
      `
}

function eliminarTarea(nombreTarea) {
      document.getElementById(nombreTarea).remove();

      if (tareas[nombreTarea][2]) {
            clearTimeout(tareas[nombreTarea][2]);
      }
      delete tareas[nombreTarea];

      actualizarContenedoresVacios();
}

function crearTarea() {
      let nombreNuevaTarea = document.getElementById('input--nombre-tarea');
      let tiempoTarea = document.getElementById('input--tiempo-tarea');
      let etapaTarea = 0;

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

      tareas[nombreNuevaTarea.value] = [parseInt(tiempoTarea.value), etapaTarea];
      let nuevaTarea = formatoTarea(nombreNuevaTarea.value, parseInt(tiempoTarea.value), etapaTarea)
      listaParaHacer.innerHTML += nuevaTarea;

      actualizarContenedoresVacios();
}

function empezarTarea(nombreTarea) {
      document.getElementById(nombreTarea).remove();

      tareas[nombreTarea][1] = 1;
      let nuevaTarea = formatoTarea(nombreTarea, tareas[nombreTarea][0], tareas[nombreTarea][1])
      listaHaciendo.innerHTML += nuevaTarea;

      tareas[nombreTarea][2] = setTimeout(
            function () {
                  notificionTimeOut(nombreTarea);
            }, (parseInt(tareas[nombreTarea][0] * 60000))
      );

      actualizarContenedoresVacios();
}

function notificionTimeOut(nombreTarea) {
      let nombre = document.getElementById(nombreTarea).querySelector('p.nombre-tarea');
      nombre.style.color = '#A51A1A';
      nombre.style.fontWeight = 'bold';
      alert(`Time's over for ${nombreTarea}! Time to get another task done...`);
}

function marcarTareaAcabada(nombreTarea) {
      document.getElementById(nombreTarea).remove();
      if (tareas[nombreTarea][2]) {
            clearTimeout(tareas[nombreTarea][2]);
      }

      tareas[nombreTarea][1] = 2;
      let nuevaTarea = formatoTarea(nombreTarea, tareas[nombreTarea][0], tareas[nombreTarea][1])
      listaHecho.innerHTML += nuevaTarea;

      actualizarContenedoresVacios();
}

function completarTareasHaciendo() {
      for (let tarea in tareas) {
            if (document.getElementById(tarea).parentElement == listaHaciendo) marcarTareaAcabada(tarea);
      }
      actualizarContenedoresVacios();
}

function eliminarTareasHechas() {
      for (let tarea in tareas) {
            if (document.getElementById(tarea).parentElement == listaHecho) eliminarTarea(tarea);
      }
      actualizarContenedoresVacios();
}

function cambiarTema(botonTema) {
      let tema = botonTema.id;

      let colores = document.querySelector(':root');

      let propiedades = getComputedStyle(colores);
      propiedades.getPropertyValue('--blanco');
      colores.style.setProperty('--blue', 'lightblue');

      for (let color in temasColores[tema]) {
            colores.style.setProperty('--'+color, temasColores[tema][color]);
      }
      
}

fetch(temasColoresJSON)
      .then((response) => response.json())
      .then((json) => temasColores = json);

actualizarContenedoresVacios();