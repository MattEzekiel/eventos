import Styles from "../styles/Menu.module.css";
import Image from "next/image";
import Link from "next/link";
import Estado from "./Estado";
import MenuDatosUsuario from "./MenuDatosUsuario";
import CerrarSesion from "./CerrarSesion";

export default function Menu({ setAbierto, abierto, datosUsuario }) {
    return (
        <div
            className={`${Styles.background} ${ abierto ? Styles.aparecer : ''} w-1/3`}
            onClick={() => {setAbierto(!abierto)}}
        >
            <nav className={Styles.nav}>
                <MenuDatosUsuario
                    datosUsuario={datosUsuario}
                />
                <Estado
                    status={datosUsuario.status}
                />
                <ul className={"mt-5 px-5"}>
                    <li className={"text-white"}>
                        <Link href={"/"}>
                            <a>
                                <Image layout={"fixed"} width={30} height={30} src={"/imgs/dashboard-icon.svg"} alt={"icono de dashboard"} /> Dashboard
                            </a>
                        </Link>
                    </li>
                    <li className={"text-white"}>
                        <Link href={"/noticias"}>
                            <a>
                                <Image layout={"fixed"} width={30} height={30} src={"/imgs/noticia-icon.svg"} alt={"icono de noticias"} /> Noticias
                            </a>
                        </Link>
                    </li>
                    <li className={"text-white"}>
                        <Link href={"/eventos"}>
                            <a>
                                <Image layout={"fixed"} width={30} height={30} src={"/imgs/evento-icon.svg"} alt={"icono de evento"} /> Eventos
                            </a>
                        </Link>
                    </li>
                </ul>
                <hr className={`${Styles.hr} mx-auto my-10 border-white`} />
                <ul className={"px-5"}>
                    <li className={"text-white"}>
                        <Link href={"/configuracion"}>
                            <a>
                                <Image layout={"fixed"} width={30} height={30} src={"/imgs/configuracion-icon.svg"} alt={"icono de configuración"} /> Configuración
                            </a>
                        </Link>
                    </li>
                    <li className={"text-white"}>
                        <Link href={"/faq"}>
                            <a>
                                <Image layout={"fixed"} width={30} height={30} src={"/imgs/faq-icon.svg"} alt={"icono de preguntas frecuentes"} />
                                Consultas
                            </a>
                        </Link>
                    </li>
                </ul>
                <hr className={`${Styles.hr} mx-auto my-10 border-white`} />
                <CerrarSesion />
            </nav>
        </div>
    )
}