import Layout from "../../layouts/layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {fecha} from "../../helpers";
import Styles from '../../styles/Noticia.module.css'
import Breadcrum from "../../components/Breadcrum";
import Comentarios from "../../components/Comentarios";
import FormComentario from "../../formularios/FormComentario";

export default function EntradaNoticia({noticia}) {
    const [usuario, setUsuario] = useState({
        nombre: 'Nombre',
        apellido: 'Apellido',
    });
    const router = useRouter();

    useEffect(() => {
        if (!sessionStorage.getItem('usuario')) {
            return router.push('/login');
        } else {
            setUsuario(JSON.parse(sessionStorage.getItem('usuario')));
        }
    },[router]);

    const { contenido, created_at, imagen, titulo } = noticia;

    const [comentarios, setComentarios] = useState({});

    useEffect(() => {
        buscarNoticias();
    },[noticia]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const buscarNoticias = async () => {
        const URL = `${process.env.API_URL}/comentarios/${noticia['id_noticia']}`;
        const respuesta = await fetch(URL);
        const resultado = await respuesta.json();

        if (resultado.success) {
            setComentarios(resultado['comentarios']);
        }
    }

    return(
        <Layout
            pagina={"Detalle de la Noticia"}
            title={titulo}
            datosUsuario={usuario}
        >
            <div className={"md:my-10"}>
                <Breadcrum
                    link={'/noticias'}
                    anterior={'Noticias'}
                    actual={titulo}
                />
                <div className={Styles.imagen}>
                    <picture>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={process.env.API_IMAGEN + '/public/imgs/noticias/' + imagen}
                            alt={`${titulo} - noticia`}
                        />
                    </picture>
                </div>
                <h2 className={"text-xl font-semibold mt-5 md:text-3xl"}>{titulo}</h2>
                <small className={"block mt-3 mb-5 text-gray-400 text-sm"}>Publicado {fecha(created_at)}</small>
                <p className={Styles.contenido}>{contenido}</p>
                <hr className={"mb-10 mt-5"}/>
                {
                    comentarios.length > 0 && (
                        <div className={"flex flex-col bg-gray-300 rounded-t-md p-5 gap-y-4"}>
                            {comentarios.map(comentario => (
                                <Comentarios
                                    key={comentario['id_comentario']}
                                    comentario={comentario}
                                />
                            ))}
                        </div>
                    )
                }
                <FormComentario
                    usuario={usuario}
                    id_noticia={noticia['id_noticia']}
                    setComentarios={setComentarios}
                />
            </div>
        </Layout>
    )
}

export async function getServerSideProps({query: {slug}}) {
    const URL = `${process.env.API_URL}/noticias/${slug}`;
    const respuesta = await fetch(URL);
    const resultado = await respuesta.json();
    const noticia = await resultado.noticia;

    return {
        props: {
            noticia: noticia,
        }
    }
}