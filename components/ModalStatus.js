import Styles from '../styles/ModalStatus.module.css';
import {useRouter} from "next/router";
import {useState} from "react";

export default function ModalStatus({ setModal }) {
    const datos = useState(sessionStorage.getItem('usuario') ? JSON.parse(sessionStorage.getItem('usuario')) : '');

    const router = useRouter();

    return (
        <div
            className={"w-screen h-screen bg-slate-900/75 fixed z-10 flex items-center justify-center inset-0"}
        >
            <div className={"w-4/5 bg-white relative py-10 px-5 rounded-lg md:max-w-lg md:p-10"}>
                <button
                    aria-describedby={"cerrar modal"}
                    onClick={() => setModal(false)}
                    className={`${Styles.close} text-violeta py-5 rounded-full z-10`}
                >X</button>
                { datos[0].telefono && datos[0].imagen && datos[0].nombre ? (
                    <p className={"font-semibold"}>Gracias por completar sus datos. <br/>Nos contactaremos con usted a la brevedad</p>
                ) : (
                    <>
                        <p className={"font-semibold"}>Su usuario no ha sido verificado, complete los siguientes datos para acelerar su verificación. <br/>Nos contactaremos con usted a la brevedad</p>
                        <button
                            className={Styles.boton}
                            onClick={() => router.push('/completar-perfil')}
                        >Completar los datos</button>
                    </>
                ) }
            </div>
        </div>
    )
}