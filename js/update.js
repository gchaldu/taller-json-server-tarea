import { Tarea } from "../tarea/tarea.js";
import { getTareaById, putTarea } from "./api.js";

const input = document.getElementById("tarea");
const param = new URLSearchParams(window.location.search);

document.addEventListener("DOMContentLoaded", async () => {
  const tarea = await getTarea();
  input.value = tarea.nombre;
});

async function getTarea() {
  try {
    const tarea = getTareaById(param.get("id"));
    return tarea;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function actualizarTarea() {
  try {
    const tarea = new Tarea(input.value);
    const id = param.get("id");
    await putTarea(id, tarea);
    window.location.href = "index.html";
  } catch (error) {
    console.log(error);
  }
}

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", () => {
  actualizarTarea();
});
