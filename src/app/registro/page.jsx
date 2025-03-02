"use client"
import { useForm } from "react-hook-form";
import { conexionRegistro } from "@/conexionApi/peticiones";
import { redirect } from "next/navigation";
import styles from './registro.module.css'; // Importar el archivo de estilos
import Head from 'next/head'; // Importar Head para incluir la fuente
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Importar iconos

export default function Registro() {
    const { register, handleSubmit } = useForm();

    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            <div className={styles.container + ' ' + styles.fontMontserrat}>
                <h1 className={styles.title}>Registro</h1>
                <form className={styles.form} action="" onSubmit={handleSubmit(async(usuario) => { 
                   // console.log(usuario);
                    const respuesta = await conexionRegistro(usuario);
                    console.log(respuesta);
                    redirect("/login");
                    
                })}>
                    <div className={styles.inputContainer}>
                        <FaUser className={styles.icon} />
                        <input className={styles.input} type="text" placeholder="Usuario" {...register("username")} />
                    </div>
                    <div className={styles.inputContainer}>
                        <FaEnvelope className={styles.icon} />
                        <input className={styles.input} type="text" placeholder="Correo" {...register("email")} />
                    </div>
                    <div className={styles.inputContainer}>
                        <FaLock className={styles.icon} />
                        <input className={styles.input} type="text" placeholder="Contraseña" {...register("password")} />
                    </div>
                    <button className={styles.button} type="submit">Guardar Usuario</button>
                </form>
            </div>
        </>
    );
}