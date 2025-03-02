"use client"
import { useEffect, useState } from "react";
import { conexionMostrar } from "@/conexionApi/peticiones";
import styles from './mostrar.module.css'; // Importar el archivo de estilos
import Head from 'next/head'; // Importar Head para incluir la fuente
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importar iconos

export default function MostrarUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const respuesta = await conexionMostrar();
                setUsuarios(respuesta.data);
            } catch (error) {
                setError("Error al cargar los usuarios.");
            }
        };
        fetchUsuarios();
    }, []);

    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            <div className={styles.container + ' ' + styles.fontMontserrat}>
                <h1 className={styles.title}>Usuarios Registrados</h1>
                {error && <p className={styles.error}>{error}</p>}
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Correo</th>
                            <th>Password</th>
                            <th>Tipo</th>
                            <th>Editar/Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario._id}>
                                <td>{usuario.username}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.password}</td>
                                <td>{usuario.type}</td>
                                <td>
                                    <FaEdit className={styles.icon} />
                                    <FaTrash className={styles.icon} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
