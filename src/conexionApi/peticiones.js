import axios from "axios";
const API_URL = "http://localhost:3000/api";

axios.defaults.withCredentials = true;

export const registrarUsuario = async (datosUsuario) => {
  try {
    const respuesta = await axios.post(`${API_URL}/registro`, datosUsuario);
    return respuesta.data;
  } catch (error) {
    const mensajeError = error.response?.data || error.message;
    console.error("Error en la solicitud de registro:", mensajeError);

    // Verificar si el error es porque el usuario ya está registrado
    if (mensajeError.includes("Usuario ya registrado")) {
      alert("El usuario ya está registrado. Por favor, intenta con otro correo electrónico.");
    }

    return {
      error: true,
      mensaje: mensajeError || "Error desconocido en el registro",
    };
  }
}

export const iniciarSesion = async (datosUsuario) => {
  try {
    const respuesta = await axios.post(`${API_URL}/login`, datosUsuario);
    return respuesta.data;
  } catch (error) {
    return {
      error: true,
      mensaje: error.response?.data || "Error desconocido en el login",
    };
  }
};

export const obtenerUsuarios = async () => {
  return await axios.get(`${API_URL}/mostrar`);
}

export const verificarUsuarioLogueado = () => {
  return axios.get(`${API_URL}/usuariosLogeados`);
}

export const verificarAdministrador = async () => {
  try {
    const respuesta = await axios.get(`${API_URL}/usuariosAdmin`);
    return respuesta.data;
  } catch (error) {
    return {
      error: true,
      mensaje: error.response?.data || "Error desconocido al verificar admin",
    };
  }
};

export const cerrarSesion = async () => {
  return await axios.get(`${API_URL}/exit`);
}

export const actualizarUsuario = async (idUsuario, datosUsuario) => {
  try {
    const respuesta = await axios.put(`${API_URL}/actualizar/${idUsuario}`, datosUsuario);
    return respuesta.data;
  } catch (error) {
    return {
      error: true,
      mensaje: error.response?.data || "Error desconocido al editar usuario",
    };
  }
};

export const eliminarUsuario = async (idUsuario) => {
  return await axios.delete(`${API_URL}/borrar/${idUsuario}`);
}

export const buscarUsuario = async (idUsuario) => {
  try {
    return await axios.get(`${API_URL}/buscar/${idUsuario}`);
  } catch (error) {
    return {
      error: true,
      mensaje: error.response?.data || "Error desconocido al buscar usuario",
    };
  }
};