import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Layout from "../layouts/layout";
import FormCompletar from "../formularios/FormCompletar";
import UsuarioEliminado from "../components/UsuarioEliminado";

export default function CompletarPerfil() {
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
        
    },[router, usuario.imagen, usuario.nombre, usuario.telefono]);

    return (
        <Layout
            pagina={"Completar Perfil"}
            title={"Completar datos del perfil"}
            datosUsuario={usuario}
        >
            { eliminado !== null && (
                <UsuarioEliminado />
            ) }
            <FormCompletar />
        </Layout>
    )
}