"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { buscarUsuario, actualizarUsuario } from "@/conexionApi/peticiones";
import styles from './editar.module.css';
import Head from 'next/head';

export default function EditarUsuario() {
    const { register, handleSubmit, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        async function obtenerUsuario() {
            try {
                const { data, status } = await buscarUsuario(id);
                if (status === 200) {
                    actualizarFormulario(data);
                } else {
                    alert("Error al cargar los datos del usuario");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false);
            }
        }

        obtenerUsuario();
    }, [id, setValue]);

    const actualizarFormulario = (usuario) => {
        const { username, email, type } = usuario;
        setValue("username", username);
        setValue("email", email);
        setValue("type", type);
        setValue("password", "");
    };

    const onSubmit = async (data) => {
        try {
            const response = await actualizarUsuario(id, data);
            if (response) {
                router.push("/mostrar");
            } else {
                alert("Error al editar el usuario");
            }
        } catch (error) {
            console.error("Error editing user:", error);
        }
    };

    if (isLoading) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Cargando datos del usuario...</h1>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            <div className={styles.card}> {/* Envolver el formulario en una tarjeta */}
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
                    <label>
                        <select {...register("type")} className={styles.input} required>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        <span>Tipo de usuario</span>
                    </label>
                    <button type="submit" className={styles.submit}>Guardar cambios</button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className={`${styles.submit} ${styles.btnRegresar}`}
                    >
                        Regresar
                    </button>
                    <p className={styles.title}>Editando usuario</p>
                    <p className={styles.message}>Modifica los datos del usuario.</p>
                </form>
            </div>
        </div>
    );
}