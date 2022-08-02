import {useRouter} from "next/router";
import UsuarioEliminado from "../components/UsuarioEliminado";
import { useEffect, useState } from "react";
import Layout from "../layouts/layout";
import FormContacto from "../formularios/FormContacto";

export default function Contacto() {
    const [usuario,setUsuario] = useState({
        razon_social: 'Nombre Apellido',
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
            pagina={"Contacto"}
            title={"Página de contacto"}
            datosUsuario={usuario}
        >
            { eliminado !== null && (
                <UsuarioEliminado />
            ) }
            <h2 className={"mb-5 text-xl font-semibold md:my-10 md:text-center"}>Complete los campos</h2>
            <FormContacto />
        </Layout>
    )
}