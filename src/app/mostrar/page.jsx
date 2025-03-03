"use client";

import React, { useEffect, useState } from 'react';
import { conexionMostrar } from '../../conexionApi/peticiones';
import styles from './mostrar.module.css'; // Importar los estilos del módulo CSS
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importar iconos

const MostrarPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await conexionMostrar();
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={`${styles.container} ${styles.fontMontserrat}`}>
            <h1 className={styles.title}>Datos</h1>
            <table className={styles['data-table']}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Tipo</th>
                        <th>Editar/Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.type}</td>
                            <td>
                                <FaEdit className={styles.icon} />
                                <FaTrash className={styles.icon} />
                            </td>
                        </tr>
                    ))} 
                </tbody>
            </table>
        </div>
    );
};

export default MostrarPage;
