import Layout from "../layouts/layout";
import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import Noticia from "../components/Noticia";
import UsuarioEliminado from "../components/UsuarioEliminado";

export default function Noticias({noticias}) {
    const [usuario, setUsuario] = useState({
        nombre: 'Nombre',
        apellido: 'Apellido',
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
            pagina={"Noticias"}
            title={"Página de noticias"}
            datosUsuario={usuario}
        >
            { eliminado !== null && (
                <UsuarioEliminado />
            ) }
            <h2 className={"text-xl font-semibold my-10 md:text-center"}>Novedades para mantenerlo informado</h2>
            <div className={"md:flex md:flex-wrap md:items-center md:gap-10"}>
                { noticias.map((noticia, index) => (
                    <Noticia
                        key={noticia.id ? noticia.id : index}
                        noticia={noticia}
                    />
                ))}
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const URL = `${process.env.API_URL}/noticias`;
    const respuesta = await fetch(URL);
    const resultado = await respuesta.json();
    // console.log(resultado);

    return {
        props: {
            noticias: resultado.noticias
        }
    }
}