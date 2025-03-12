"use client";
import { useForm } from "react-hook-form";
import { registrarUsuario } from "@/conexionApi/peticiones";
import { redirect } from "next/navigation";
import Head from 'next/head'; // Importar Head para incluir la fuente
import styles from './registro.module.css'; // Importar el archivo CSS

export default function Registro() {
    const { register, handleSubmit } = useForm();

    return (
        <div className={styles.container}> {/* Aplicar la clase container */}
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            <div className={styles.card}> {/* Envolver el formulario en una tarjeta */}
                <form action="" onSubmit={handleSubmit(async (datosUsuario) => {
                    const respuesta = await registrarUsuario(datosUsuario);
                   // console.log(respuesta);
                    redirect("/");
                })} className={styles.form}> {/* Aplicar estilo */}
                    <p className={styles.title}>Registro</p>
                    <p className={styles.message}>Ingresa tus datos para el registro.</p>
                    <label>
                        <input type="text" id="username" {...register("username")} className={styles.input} required />
                        <span>Usuario</span>
                    </label>
                    <label>
                        <input type="email" id="email" {...register("email")} className={styles.input} required />
                        <span>Correo</span>
                    </label>
                    <label>
                        <input type="text" id="password" {...register("password")} className={styles.input} required />
                        <span>Contraseña</span>
                    </label>
                    <button type="submit" className={styles.submit}>Registrar usuario</button>
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className={`${styles.submit} ${styles.btnRegresar}`}
                    >
                        Regresar
                    </button>
                </form>
            </div>
        </div>
    );
}