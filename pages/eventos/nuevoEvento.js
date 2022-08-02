import Layout from "../../layouts/layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import FormEvento from "../../formularios/FormEvento";
import PawLoader from "../../components/PawLoader";

export default function NuevoEvento() {
    const [usuario, setUsuario] = useState({
        nombre: 'Nombre',
        apellido: 'Apellido',
    });
    const [success,setSuccess] = useState(false);
    const [loader, setLoader] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (!sessionStorage.getItem('usuario')) {
            router.push('/login');
        } else {
            setUsuario(JSON.parse(sessionStorage.getItem('usuario')));
        }
    },[router]);

    useEffect(() => {
        if (success) {
            router.push('/eventos');
        }
    },[router, success])

    return (
        <Layout
            pagina={"Nuevo Evento"}
            title={"Nuevo evento"}
            datosUsuario={usuario}
        >
            { loader && (
                <PawLoader />
            )}
            <h2 className={"text-xl font-semibold text-center my-10 md:hidden"}>Cree aquí su evento</h2>
            <div className={"mt-5"}>
                <FormEvento
                    setSuccess={setSuccess}
                    setLoader={setLoader}
                />
            </div>
        </Layout>
    )
}