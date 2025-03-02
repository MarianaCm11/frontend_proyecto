import Link from 'next/link';
import styles from './inicio.module.css'; // Importar el archivo de estilos
import Head from 'next/head'; // Importar Head para incluir la fuente
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // Importar iconos

export default function Inicio() {
    return(
        <>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            <div className={styles.container + ' ' + styles.fontMontserrat}>
                <h1 className={styles.title}>Estas en inicio</h1>
                <div className={styles.links}>
                    <Link href="/login" className={styles.link}>
                        <FaSignInAlt className={styles.icon} /> Iniciar Sesión
                    </Link>
                    <Link href="/registro" className={styles.link}>
                        <FaUserPlus className={styles.icon} /> Ir a Registro
                    </Link>
                </div>
            </div>
        </>
    );
}