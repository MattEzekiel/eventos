import Layout from "../layouts/layout";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import UsuarioEliminado from "../components/UsuarioEliminado";

export default function Configuracion() {
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
            pagina={"configuración"}
            title={"Página de configuración"}
            datosUsuario={usuario}
        >
            { eliminado !== null && (
                <UsuarioEliminado />
            ) }
            <h2 className={"mb-5 text-xl font-semibold"}>¿Desea editar datos de su perfil?</h2>
            <p className={"mb-5"}>Esto lo puede hacer en cualquier momento, tenga en cuenta que una vez editado los datos con su usuario ya validado; esos cambios ya estarán visibles en la aplicación de Unidos. Tenga en cuenta que los datos como CUIT y RAZÓN SOCIAL no se podrán modificar. En ese caso póngase en contacto con nosotros.</p>
            <Link href={"/editar-perfil"}><a className={"mb-10 block bg-amarillo w-fit rounded px-3 py-2"}>Editar perfil</a></Link>
            <h2 className={"mb-5 text-xl font-semibold"}>¿Su cuenta ha sido bloqueada?</h2>
            <p>Si ese es el caso póngase en contacto con nosotros para solucionar el inconveniente</p>
            <Link href={"/contacto"}><a className={"mt-5 block bg-amarillo w-fit rounded px-3 py-2"}>Contacto</a></Link>
        </Layout>
    )
}