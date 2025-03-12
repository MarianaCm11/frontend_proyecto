"use client";
import { useForm } from "react-hook-form";
import { registrarUsuario } from "@/conexionApi/peticiones";
import { redirect } from "next/navigation";
import Head from 'next/head';
import styles from './registro.module.css';

export default function Registro() {
    const { register, handleSubmit } = useForm();

    return (
        <div className={styles.container}>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            <div className={styles.card}>
                <form action="" onSubmit={handleSubmit(async (datosUsuario) => {
                    const respuesta = await registrarUsuario(datosUsuario);
                    redirect("/");
                })} className={styles.form}>
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
                </form>
            </div>
        </div>
    );
}