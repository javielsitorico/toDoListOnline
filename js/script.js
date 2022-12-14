let svgTiempo = 'media/svg/time.svg';
let svgPapelera = 'media/svg/trash.svg';


class Tarea {

     constructor(nombre, tiempo, buttonTask) {
          this._pNombre = document.createElement('p');
          this._pNombre.classList.add('nombre-tarea');
          this._pNombre.innerHTML = nombre;

          this._imgTiempo = document.createElement('img');
          this._imgTiempo.setAttribute('src', svgTiempo)

          this._pTiempo = document.createElement('p');
          this._pTiempo.innerHTML = tiempo;

          this._buttonTask = document.createElement('button');
          this._buttonTask.classList.add('button-small');
          this._buttonTask.innerHTML = buttonTask;

          this._buttonDelete = document.createElement('button');
          this._buttonDelete.classList.add('button-small', 'button-red');
          let imgTrash = document.createElement('img');
          imgTrash.setAttribute('src', svgPapelera)
          this._buttonDelete.append(imgTrash);
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

     get buttonTask() {
          return this._buttonTask;
     }

     get buttonDelete() {
          return this._buttonDelete;
     }

}

function comprobarTareasVacias() {
     let parrafoElementoVacio = document.createElement('p');
     parrafoElementoVacio.classList.add('texto-secundario');
     parrafoElementoVacio.innerHTML = 'There are currently no tasks';
     let listasTareas = document.getElementsByClassName('lista-tareas');
     for (let lista of listasTareas) {
          if (lista.childElementCount <= 0) {
               lista.appendChild(parrafoElementoVacio.cloneNode(true));
          }
     }
}

// let tarea = document.createElement('div');
// tarea.classList.add('tarea');

// let tareaPrueba = new Tarea('Hacer Powerpoint', '200', 'Begin Task');

// tarea.append(tareaPrueba.nombre,
//      tareaPrueba.imgTiempo,
//      tareaPrueba.tiempo,
//      tareaPrueba.buttonTask,
//      tareaPrueba.buttonDelete);

// listaParaHacer.appendChild(tarea.cloneNode(true));


comprobarTareasVacias();