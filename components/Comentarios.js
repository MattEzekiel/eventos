import Styles from '/styles/Comentario.module.css';
import React from "react";
import {fecha, imgENV} from "../helpers";

export default function Comentarios({comentario}) {
    const { razon_social, nombre, imagen } = comentario['verificado'];
    const { created_at, updated_at } = comentario;

    return (
    <div className={"bg-gray-200 p-3 rounded-md"}>
        <div className={"flex items-center"}>
            <div className={Styles.perfil}>
                {
                    imagen !== null ?
                        // eslint-disable-next-line @next/next/no-img-element
                        (<img src={process.env.API_IMAGEN + imgENV(imagen)} alt="Imagen de perfil"/>)
                        :
                        // eslint-disable-next-line @next/next/no-img-element
                        (<img src={"/imgs/user-default.png"} alt={"Imagen de perfil"} />)
                }
            </div>
            <div className={"pl-3"}>
                <p className={"font-semibold"}>{ nombre ?? razon_social }</p>
            </div>
        </div>
        <p className={"text-base mt-3 md:pl-10"}>{comentario['comentario']}</p>
        <div className={"flex justify-end items-center"}>
            <p className={"text-xs text-gray-500 mt-1"}>{ created_at === updated_at ? fecha(created_at) : 'Editado ' + fecha(updated_at) }</p>
        </div>
    </div>
    )
}