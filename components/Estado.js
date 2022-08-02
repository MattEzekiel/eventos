import Styles from "../styles/Estado.module.css";
import {useEffect, useState} from "react";
import ModalStatus from "./ModalStatus";
import Image from "next/image";

export default function Estado({ status }) {
    const [modal,setModal] = useState(false);
    const [verificado, setVerificado] = useState(false);

    useEffect(() => {
        if (status === 1) {
            setVerificado(true)
        } else {
            setVerificado(false);
        }
    },[status])

    return (
        <div>
            <p className={"mt-5 text-center text-white flex gap-2 mx-auto items-center justify-center"}>Estado
                { verificado ? (
                    // eslint-disable-next-line jsx-a11y/alt-text
                    <Image layout={"fixed"} width={20} height={20} src={"/imgs/verificado.svg"} />
                ) : (
                    <button
                        className={Styles.pregunta}
                        onClick={(e) => {setModal(!modal)}}
                    >
                        ?
                        <span className={`animate-ping ${Styles.ping}`}></span>
                    </button>
                )}

            </p>
            {modal && (
                <ModalStatus
                    setModal={setModal}
                />
            )}
        </div>
    )
}