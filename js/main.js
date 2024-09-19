//(function () {})();

import { deleteTarea, getTareas, postTareas } from "./api.js";
import { Tarea } from "../tarea/tarea.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const lista = await getTareas();
    tableTareas(lista);
  } catch (error) {
    handleError(
      "Hubo un problema al cargar las tareas. Por favor, inténtelo de nuevo más tarde."
    );
  }
});

function handleError(error, message) {
  console.error("Error al cargar las tareas:", error);
  // Aquí podrías mostrar un mensaje al usuario, por ejemplo:
  alert(message);
}
function tableTareas(tareas) {
  tareas.forEach((tarea) => {
    filaTarea(tarea);
  });
}

function filaTarea(tarea) {
  const tr = document.createElement("tr");

  const tdNombre = document.createElement("td");
  tdNombre.textContent = tarea.nombre;
  const tdid = document.createElement("td");
  tdid.textContent = tarea.id;
  const tdEliminar = document.createElement("td");
  tdEliminar.innerHTML = `<a href="#" >Eliminar</a>`;
  tdEliminar.onclick = async () => {
    try {
      await deleteTarea(tarea.id);
    } catch (error) {
      handleError(error, "Error al eliminar la tarea");
    }
  };

  const tdModificar = document.createElement("td");
  tdModificar.innerHTML = `<a href="../modificar-tarea.html?id=${tarea.id}" >Modificar</a>`;

  const lista = document.getElementById("listaTareas");

  tr.append(tdid, tdNombre, tdEliminar, tdModificar);
  lista.appendChild(tr);
}

//POST
const input = document.getElementById("tarea");
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (event) => {
  /*   event.preventDefault();
  console.log(event);
  console.log("first"); */
  addTarea();
});

async function addTarea() {
  try {
    const tarea = new Tarea(input.value);
    await postTareas(tarea);
  } catch (error) {
    handleError(error, "Hubo un problema al crear la tarea");
  }
}
