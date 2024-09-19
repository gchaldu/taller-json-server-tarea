const urlBase = "http://localhost:3000/tareas";

//GET

export async function getTareas() {
  try {
    const response = await fetch(urlBase, { method: "GET" });

    if (!response.ok) {
      throw new Error("HTTP error");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Error de red!!!");
    } else {
      console.error("Error al obtener las tareas");
    }
    throw error;
  }
}

export function getTareasPromise() {
  return fetch(urlBase)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error");
      }

      return response.json();
    })
    .then((json) => console.log(json))
    .catch((error) => {
      if (error instanceof TypeError) {
        console.error("Error de red!!!");
      } else {
        console.error("Error al obtener las tareas");
      }
      throw error;
    });
}

export async function getTareas2() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout de 5 segundos

  try {
    const response = await fetch(urlBase, {
      method: "GET",
      signal: controller.signal, // Soporte para abortar la petición
    });

    clearTimeout(timeoutId); // Limpiar el timeout si la petición responde a tiempo

    if (!response.ok) {
      // Lanzar un error con más detalles
      throw new Error(
        `HTTP error! status: ${response.status} - ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("La petición fue cancelada por timeout");
    } else {
      console.error(`Error en la petición: ${error.message}`);
    }
    throw error; // Propagar el error para manejo en niveles superiores
  }
}

//POST

export async function postTareas(tarea) {
  let misCabeceras = new Headers();
  misCabeceras.append("Content-Type", "application/json");

  let miInicializador = {
    method: "POST",
    headers: misCabeceras,
    body: JSON.stringify(tarea),
  };

  try {
    const response = await fetch(urlBase, miInicializador);
    if (!response.ok) {
      throw new Error("HTTP request error: " + response.status);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      console.log("Error de red");
    } else {
      console.log("Error al intentar guardar");
    }
    throw error;
  }
}

//DELETE
export async function deleteTarea(id) {
  try {
    const response = await fetch(`${urlBase}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("HTTP request error " + response.status);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      console.log("Error");
    } else {
      console.log("Error al eliminar la tarea");
    }
    throw error;
  }
}

export async function deleteTarea2(id) {
  try {
    const response = await fetch(`${urlBase}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Error en la petición DELETE: ${response.status} - ${response.statusText}`
      );
    }

    // Solo intentamos parsear si hay contenido en la respuesta
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return { message: "Tarea eliminada con éxito" };
    }
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Error de red o CORS: Verifica tu conexión o la URL");
    } else {
      console.error("Error al eliminar la tarea:", error.message);
    }
    throw error; // Propagar el error
  }
}

//GET by ID

export async function getTareaById(id) {
  try {
    const response = await fetch(`${urlBase}/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("HTTP request error " + response.status);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      console.log("Error red");
    } else {
      console.log("Error al intentar encontrar la tarea");
    }
    throw error;
  }
}

//PUT
export async function putTarea(id, tarea) {
  try {
    const response = await fetch(`${urlBase}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tarea),
    });

    if (!response.ok) {
      throw new Error(
        "HTTP request error " + response.status + " " + response.statusText
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      console.log("Error de red");
    } else {
      console.log("Error al actualizar la tarea");
    }

    throw error;
  }
}
