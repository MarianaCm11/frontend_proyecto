import axios from "axios";
const API = "http://localhost:3000/api";

export const conexionRegistro = async (usuario) => {
    try {
        return await axios.post(`${API}/registro`, usuario);
    } catch (error) {
        console.error("Error en conexionRegistro:", error);
        throw error;
    }
};

export const conexionLogin = async (usuario) => {
    try {
        return await axios.post(`${API}/login`, usuario);
    } catch (error) {
        console.error("Error en conexionLogin:", error);
        throw error;
    }
};

export const conexionMostrar = async () => {
    try {
        return await axios.get(`${API}/mostrar`);
    } catch (error) {
        console.error("Error en conexionMostrar:", error);
        throw error;
    }
};