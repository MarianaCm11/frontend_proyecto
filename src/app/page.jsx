import Link from 'next/link';
import styles from './inicio.module.css'; // Importar el archivo de estilos
import { VscLinkExternal } from "react-icons/vsc";
import { FiUserPlus, FiGithub } from "react-icons/fi";


export default function Inicio() {
    return(
        <>
            <div className={styles.container + ' ' + styles.fontMontserrat}>
                <h1 className={styles.title}>Bienvenido a MICHIREGISTRO</h1>
                <div className={styles.links}>
                    <Link href="/login" className={styles.link}>
                        <VscLinkExternal  className={styles.icon} /> Login
                    </Link>
                    <Link href="/registro" className={styles.link}>
                        <FiUserPlus className={styles.icon} /> Registro
                    </Link> 
                    <Link href="/michi" className={styles.link}>
                        <FiGithub className={styles.icon} /> Soy un michi
                    </Link>
                </div>
            </div>
        </>
    );
}