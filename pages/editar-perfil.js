import Layout from "../layouts/layout";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import UsuarioEliminado from "../components/UsuarioEliminado";
import Image from "next/image";
import FormEditNombre from "../formularios/FormEditNombre";
import FormEditEmail from "../formularios/FormEditEmail";
import FormEditPassword from "../formularios/FormEditPassword";
import FormEditTelefono from "../formularios/FormEditTelefono";
import FormEditImagen from "../formularios/FormEditImagen";
import {imgENV} from "../helpers";

export default function EditarPerfil() {
    const [usuario, setUsuario] = useState({
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

    // console.log(usuario);

    const { nombre, email, telefono, imagen } = usuario;

    const [editarNombre, setEditarNombre] = useState(false);
    const [editarEmail, setEditarEmail] = useState(false);
    const [editarTelefono, setEditarTelefono] = useState(false);
    const [editarImagen, setEditarImagen] = useState(false);
    const [editarPassword, setEditarPassword] = useState(false);

    return (
        <Layout
            pagina={"Editar datos"}
            title={"Página de editar perfil"}
            datosUsuario={usuario}
        >
            { eliminado !== null && (
                <UsuarioEliminado />
            ) }
            <h2 className={"mb-5 md:block hidden text-xl font-semibold md:my-10 md:text-center"}>Cambie los datos que usted desee</h2>
            <p className={"mb-10 text-center md:hidden"}>Elija que desea editar</p>
            <dl className={"md:max-w-3xl md:mx-auto mb-10"}>
                <dt
                    className={"flex justify-between items-center text-sm cursor-pointer"}
                    onClick={() => setEditarNombre(!editarNombre)}
                >Nombre
                    <Image src={editarNombre ? "/imgs/close.svg" : "/imgs/editar.svg"} width={15} height={15} layout={"fixed"} alt={editarNombre ? "Dejar de editar" : "Editar"}/></dt>
                { editarNombre ? (
                    <FormEditNombre
                        campo={nombre}
                        setEditarNombre={setEditarNombre}
                        setUsuario={setUsuario}
                    />
                    ) : (
                        <dd className={"text-violeta"}>{nombre ?? 'Sin completar'}</dd>
                    )
                }
                <hr className={"my-5"}/>
                <dt
                    className={"flex justify-between items-center text-sm cursor-pointer"}
                    onClick={() => setEditarEmail(!editarEmail)}
                >
                    Email <Image src={editarEmail ? "/imgs/close.svg" : "/imgs/editar.svg"} width={15} height={15} layout={"fixed"} alt={editarEmail? "Dejar de editar" : "Editar"} />
                </dt>
                { editarEmail ? (
                    <FormEditEmail
                        email={email}
                        setEditarEmail={setEditarEmail}
                        setUsuario={setUsuario}
                    />
                    ) : (
                    <dd className={"text-violeta"}>{email}</dd>
                    )
                }
                <hr className={"my-5"}/>
                <dt
                    className={"flex justify-between items-center text-sm cursor-pointer"}
                    onClick={() => setEditarTelefono(!editarTelefono)}
                >Teléfono <Image src={"/imgs/editar.svg"} width={15} height={15} layout={"fixed"} alt={editarTelefono ? "Dejar de editar" : "Editar"}/>
                </dt>
                { editarTelefono ?
                    (
                        <FormEditTelefono
                            setEditarTelefono={setEditarTelefono}
                            setUsuario={setUsuario}
                            telefono={telefono}
                        />
                    )
                    :
                    (
                        <dd className={"text-violeta"}>{telefono ?? 'Sin completar'}</dd>
                    )
                }
                <hr className={"my-5"}/>
                <dt
                    className={"flex justify-between items-center text-sm cursor-pointer"}
                    onClick={() => setEditarImagen(!editarImagen)}
                >Imagen <Image src={editarImagen ? "/imgs/close.svg" : "/imgs/editar.svg"} width={15} height={15} layout={"fixed"} alt={editarImagen ? "Dejar de editar" : "Editar"} />
                </dt>
                {
                    editarImagen ?
                        (
                            <FormEditImagen
                                imagen={imagen}
                                setUsuario={setUsuario}
                                setEditarImagen={setEditarImagen}
                            />
                        )
                        :
                        (
                            <dd>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={imagen ? process.env.API_IMAGEN + imgENV(imagen) : '/imgs/user-default.png'} width={150} height={150} alt={"Imagen de perfil"}/>
                            </dd>
                        )
                }
                <hr className={"my-5"}/>
                <dt
                    className={"flex justify-between items-center text-sm  cursor-pointer"}
                    onClick={() => setEditarPassword(!editarPassword)}
                >Contraseña <Image src={editarPassword ? "/imgs/close.svg" : "/imgs/editar.svg"} width={15} height={15} layout={"fixed"} alt={editarPassword ? "Dejar de editar" : "Editar"}/>
                </dt>
                { editarPassword &&
                    (
                        <FormEditPassword
                            setEditarPassword={setEditarPassword}
                            setUsuario={setUsuario}
                        />
                    )
                }
            </dl>
        </Layout>
    )
}