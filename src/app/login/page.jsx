"use client"
import { useForm } from "react-hook-form";
import { iniciarSesion, verificarUsuarioLogueado, verificarAdministrador } from "@/conexionApi/peticiones";
import { useRouter } from "next/navigation";
import styles from './login.module.css';
import Head from 'next/head'; 
import { useState } from "react";

export default function Login() {
    const { register, handleSubmit } = useForm();
    const [isVerifying, setIsVerifying] = useState(false);
    const router = useRouter();

    const onSubmit = async (datosUsuario) => {
        setIsVerifying(true);
        alert("Espere un momento...");
        try {
            const respuesta = await iniciarSesion(datosUsuario);

            if (respuesta.error) {
                alert(`Error: ${respuesta.mensaje}`);
                setIsVerifying(false);
                return;
            }

            const usuarioLogueado = await verificarUsuarioLogueado();
            if (usuarioLogueado.status !== 200) {
                alert("Usuario no logueado");
                setIsVerifying(false);
                return;
            }

            const esAdmin = await verificarAdministrador();

            setTimeout(() => {
                setIsVerifying(false);
                if (!esAdmin.error) {
                    router.push("/mostrar");
                } else {
                    router.push("/mostrar");
                }
            }, 1000);
        } catch (error) {
            console.error("Error en login:", error);
            alert("Error al iniciar sesión. Verifica tus credenciales.");
            setIsVerifying(false);
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            <div className={styles.card}> {/* Envolver el formulario en una tarjeta */}
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <p className={styles.title}>Login</p>
                    <p className={styles.message}>Ingresa tus datos para iniciar sesión.</p>
                    <label>
                        <input type="text" id="username" {...register("username")} className={styles.input} required />
                        <span>Usuario</span>
                    </label>
                    <label>
                        <input type="text" id="password" {...register("password")} className={styles.input} required />
                        <span>Contraseña</span>
                    </label>
                    <button type="submit" className={styles.submit}>Iniciar Sesión</button>
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