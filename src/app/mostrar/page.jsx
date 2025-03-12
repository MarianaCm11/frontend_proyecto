"use client";
import React, { useEffect, useState } from 'react';
import { obtenerUsuarios, cerrarSesion, verificarAdministrador, eliminarUsuario } from '../../conexionApi/peticiones';
import { useRouter } from 'next/navigation';
import styles from './mostrar.module.css'; // Importar los estilos del módulo CSS
import { TbDoorExit } from "react-icons/tb";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";

const MostrarUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [esAdmin, setEsAdmin] = useState(false);
    const [eliminando, setEliminando] = useState(false);
    const [usuarioActual, setUsuarioActual] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuestaAdmin = await verificarAdministrador();
                if (!respuestaAdmin.error) {
                    setEsAdmin(true);
                }

                // Obtener lista de usuarios
                const respuesta = await obtenerUsuarios();
                setUsuarios(respuesta.data);

                // Obtener datos del usuario actual
                const usuario = respuesta.data.find(user => user.type === 'user');
                setUsuarioActual(usuario);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };

        cargarDatos();
    }, []);

    const manejarCerrarSesion = async () => {
        try {
            await cerrarSesion();
            router.push("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const manejarEditar = (id) => {
        router.push(`/editar/${id}`);
    }

    const manejarEliminar = async (id) => {
        setEliminando(true);
        try {
            await eliminarUsuario(id);
            setUsuarios(usuarios.filter(user => user._id !== id)); // Actualizar el estado de usuarios
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        } finally {
            setEliminando(false);
        }
    }

    return (
        <div className={`${styles.container} ${styles.fontMontserrat}`}>
            <div className={styles.bottom}>
                <div className={styles.links}>
                    <a onClick={manejarCerrarSesion} className={styles.link_exit}>
                        <TbDoorExit className={styles.icon_exit} /> Cerrar Sesión
                    </a>
                </div>
            </div>
            {esAdmin && <h1 className={styles.title}>Bienvenido Michi Admin</h1>}
            {!esAdmin && <h1 className={styles.title}>Bienvenido Michi Usuario</h1>}
            <table className={styles['data-table']}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        {esAdmin && <th>Tipo</th>}
                        {esAdmin && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {esAdmin ? (
                        usuarios.map((item, index) => (
                            <tr key={index} className={styles['data-row']}>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.type}</td>
                                <td>
                                    <div className={styles.actions}>
                                        <a onClick={() => manejarEditar(item._id)}>
                                            <MdEditSquare className={styles.icon} />
                                        </a>
                                        <a onClick={() => manejarEliminar(item._id)}>
                                            <RiDeleteBin2Fill className={styles.icon} />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        usuarioActual && (
                            <tr className={styles['data-row']}>
                                <td>{usuarioActual.username}</td>
                                <td>{usuarioActual.email}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MostrarUsuarios;

