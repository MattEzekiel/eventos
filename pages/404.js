import Layout from "../layouts/layout";
import Link from "next/link";
import Styles from '../styles/404.module.css'
import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import UsuarioEliminado from "../components/UsuarioEliminado";

export default function Error404() {
    const [usuario,setUsuario] = useState({
        nombre: 'Nombre',
        apellido: 'Apellido'
    });
    const [eliminado, setEliminado] = useState(null);

    const router = useRouter();

    useEffect(() => {
        if (!sessionStorage.getItem('usuario')) {
            router.push('/login');
        } else {
            setUsuario(JSON.parse(sessionStorage.getItem('usuario')));
            setEliminado(JSON.parse(sessionStorage.getItem('eliminado')));
        }
    },[router]);

    return (
        <Layout
            pagina={"Error"}
            title={"Página no encontrada"}
            datosUsuario={usuario}
        >
            { eliminado !== null && (
                <UsuarioEliminado />
            ) }
            <h2 className={"sr-only"}>Página no encontrada</h2>
            <p className={"text-5xl text-center font-semibold"}>¡Ups!</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img width={330} height={330} src={"/imgs/404.svg"} alt={"Error"} className={"mx-auto"} />
            <p className={"mt-5 text-2xl font-semibold text-center"}>Parece que la sección que busca no existe</p>
            <Link href={"/"}>
                <a className={Styles.error}>Click aquí para volver</a>
            </Link>
        </Layout>
    )
}
