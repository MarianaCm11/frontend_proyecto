"use client"
import { useForm } from "react-hook-form";
import { conexionLogin } from "@/conexionApi/peticiones";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter
import styles from './login.module.css'; // Importar el archivo de estilos
import Head from 'next/head'; // Importar Head para incluir la fuente
import { FaUser, FaLock } from 'react-icons/fa'; // Importar iconos

export default function Login() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(null);
    const router = useRouter(); // Inicializar useRouter

    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            <div className={styles.container + ' ' + styles.fontMontserrat}>
                <h1 className={styles.title}>Login</h1>
                <form className={styles.form} action="" onSubmit={handleSubmit(async(usuario) => { 
                    try {
                        const respuesta = await conexionLogin(usuario);
                        console.log(respuesta);
                        router.push("/"); // Redirigir a la página principal
                    } catch (error) {
                        if (error.response) {
                            // Errores que tienen respuesta del servidor
                            setError(`Error al iniciar sesión: ${error.response.data.message}`);
                        } else if (error.request) {
                            // Errores que ocurren al hacer la petición pero no se recibe respuesta
                            setError("Error al iniciar sesión: No se recibió respuesta del servidor");
                        } else {
                            // Otros errores
                            setError(`Error al iniciar sesión: ${error.message}`);
                        }
                    }
                })}>
                    <div className={styles.inputContainer}>
                        <FaUser className={styles.icon} />
                        <input className={styles.input} type="text" placeholder="Usuario" {...register("username")} />
                    </div>
                    <div className={styles.inputContainer}>
                        <FaLock className={styles.icon} />
                        <input className={styles.input} type="password" placeholder="Contraseña" {...register("password")} />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button className={styles.button} type="submit">Iniciar Sesión</button>
                </form>
            </div>
        </>
    );
}
