let svgTiempo = 'media/svg/time.svg';
let svgPapelera = 'media/svg/trash.svg';
let listaParaHacer = document.getElementById('elementos-para-hacer');
let listaHaciendo = document.getElementById('elementos-haciendo');
let listaHecho = document.getElementById('elementos-hechos');
let tareas = [];

class Tarea {

     constructor(nombre, tiempo, buttonTarea, idTarea) {
          let pNombre = document.createElement('p');
          pNombre.classList.add('nombre-tarea');
          pNombre.innerHTML = nombre;
          this._pNombre = pNombre;

          this._imgTiempo = document.createElement('img');
          this._imgTiempo.setAttribute('src', svgTiempo)

          this._pTiempo = document.createElement('p');
          this._pTiempo.innerHTML = tiempo;

          this._buttonTarea = document.createElement('button');
          this._buttonTarea.classList.add('button-small');
          this._buttonTarea.setAttribute('onclick', `pasarTareaWIP(${tareas.length})`);
          this._buttonTarea.innerHTML = buttonTarea;

          this._buttonBorrar = document.createElement('button');
          this._buttonBorrar.classList.add('button-small', 'button-red');
          let imgTrash = document.createElement('img');
          imgTrash.setAttribute('src', svgPapelera)
          this._buttonBorrar.append(imgTrash);
     }

     set nombre(nombre) {
          this._pNombre = nombre;
     }

     get nombre() {
          return this._pNombre;
     }

     get imgTiempo() {
          return this._imgTiempo;
     }

     set tiempo(tiempo) {
          this._pTiempo = tiempo;
     }

     get tiempo() {
          return this._pTiempo;
     }

     set buttonTarea(buttonTarea) {
          this._buttonTarea.innerHTML = buttonTarea;
     }

     get buttonTarea() {
          return this._buttonTarea;
     }

     get buttonBorrar() {
          return this._buttonBorrar;
     }

}

function crearTarea() {

     let tiempo = document.getElementById('input--tiempo-tarea').value;
     if (document.getElementById('input--tiempo-tarea').value > 360) tiempo = 360;

     for (let tarea of tareas) {
          if (tarea.nombre.innerHTML == document.getElementById('input--nombre-tarea').value) {
               document.getElementById('input--nombre-tarea').style.border = '1px solid #E02929';
               return;
          }
     }

     document.getElementById('input--nombre-tarea').style.border = 'none';

     tareas.push(new Tarea(
          document.getElementById('input--nombre-tarea').value,
          tiempo,
          'Begin Task',
          tareas[tareas.length - 1]
     ));

     let tarea = tareas[tareas.length - 1];

     let contenedorTarea = document.createElement('div');
     contenedorTarea.classList.add('tarea');

     contenedorTarea.append(
          tarea.nombre,
          tarea.imgTiempo,
          tarea.tiempo,
          tarea.buttonTarea,
          tarea.buttonBorrar
     );

     listaParaHacer.appendChild(contenedorTarea);


     if (document.getElementById('texto--tareas-vacias_para-hacer')) {
          document.getElementById('texto--tareas-vacias_para-hacer').remove();
     }

}

function pasarTareaWIP() {

}