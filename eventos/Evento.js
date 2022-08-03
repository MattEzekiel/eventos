import Styles from '../styles/Evento.module.css';
import {dateTime, imgENV} from "../helpers";
import Link from "next/link";

export default function Evento({evento}) {
    // console.log(evento)
    const { nombre, desde, hasta, id_evento, imagen, deleted_at } = evento;

    return (
        <article
            className={Styles.evento}
        >
            <div className={"relative"}>
                { deleted_at && (
                    <span className={`${Styles.eliminado} bg-red-100 text-red-700 px-5 py-1 font-semibold rounded`}>Evento bloqueado</span>
                ) }
                <picture>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={process.env.API_IMAGEN + imgENV(imagen)} alt={`${nombre} imagen`}/>
                </picture>
            </div>
            <div className={Styles.contenido}>
                <h2
                    className={"text-center text-xl my-3 font-semibold break-all"}
                >{nombre}</h2>
                <ul
                    className={"mb-5"}
                >
                    <li className={"font-semibold"}>Desde: <span>{dateTime(desde)}</span></li>
                    <li className={"font-semibold"}>Hasta: <span>{dateTime(hasta)}</span></li>
                </ul>
                <Link href={`eventos/${id_evento}`}>
                    <a className={Styles.link}>Ver más</a>
                </Link>
            </div>
        </article>
    )
}