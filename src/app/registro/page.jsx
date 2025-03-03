"use client"
import { useForm } from "react-hook-form";
import { conexionRegistro } from "@/conexionApi/peticiones";
import { redirect } from "next/navigation";
import styles from './registro.module.css'; // Usar el archivo de estilos del registro
import Head from 'next/head'; // Importar Head para incluir la fuente
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Importar iconos

export default function Registro() {
    const { register, handleSubmit } = useForm();
    return (
        <div className={styles.container}> {/* Aplicar estilo de contenedor */}
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            <h1 className={styles.title}>Registro</h1> {/* Aplicar estilo */}
            <form action="" onSubmit={handleSubmit(async (usuario) => {
                // console.log(usuario);
                const respuesta = await conexionRegistro(usuario);
                console.log(respuesta);
                redirect("/");

            })} className={styles.form}> {/* Aplicar estilo */}
                <div className={styles.inputContainer}>
                    <FaUser className={styles.icon} />
                    <input type="text" placeholder="Usuario" {...register("username")} className={styles.input} /> {/* Aplicar estilo */}
                </div>
                <div className={styles.inputContainer}>
                    <FaEnvelope className={styles.icon} />
                    <input type="text" placeholder="Correo" {...register("email")} className={styles.input} /> {/* Aplicar estilo */}
                </div>
                <div className={styles.inputContainer}>
                    <FaLock className={styles.icon} />
                    <input type="text" placeholder="Contraseña" {...register("password")} className={styles.input} /> {/* Aplicar estilo */}
                </div>
                <button type="submit" className={styles.button}>Registrar usuario</button> {/* Aplicar estilo */}
            </form>
        </div>
    );
}