import {dateTime} from "../helpers";
import Styles from '../styles/DetalleEvento.module.css';
import Breadcrum from "../components/Breadcrum";

export default function Detalle({
    nombre,
    descripcion,
    direccion,
    imagen,
    hasta,
    desde,
    publicado,
    updated_at,
    created_at,
    setEditar
})
    {
    return (
        <div className={"md:my-10"}>
            <Breadcrum
                link={'/eventos'}
                anterior={'Eventos'}
                actual={nombre}
            />
            <div className={Styles.imagen}>
                <picture>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={process.env.API_IMAGEN + imagen} alt={`${nombre}. Imagen del evento`} />
                </picture>
            </div>
            <h2 className={"text-xl text-center font-semibold my-5 break-all"}>{nombre}</h2>
            <p className={Styles.descripcion}>{descripcion}</p>
            <dl className={"mt-5"}>
                <dt className={"font-bold"}>Fechas:</dt>
                <dl className={"font-semibold"}>Desde: <span className={Styles.fechas}>{dateTime(desde)}</span></dl>
                <dl className={"font-semibold"}>Hasta: <span className={Styles.fechas}>{dateTime(hasta)}</span></dl>
                <div className={"mt-3 flex w-full"}>
                    <dt className={"font-bold"}>Dirección:</dt>
                    <dl className={Styles.resaltar}>{direccion}</dl>
                </div>
                <div className={"mt-3 flex w-full"}>
                    <dt className={"font-bold"}>Status:</dt>
                    <dl className={Styles.resaltar}>{publicado === 1 ? 'Publicado' : 'Borrador' }</dl>
                </div>
            </dl>
            <ul className={"mt-5"}>
                <li className={"text-sm"}>Creado el: <span className={Styles.timestamp}>{dateTime(created_at)}</span></li>
                <li className={"text-sm"}>Última modificación: <span className={Styles.timestamp}>{dateTime(updated_at)}</span></li>
            </ul>
            <div className={"md:flex md:justify-end md:items-center"}>
                <button
                    type={"button"}
                    className={Styles.boton}
                    onClick={() => setEditar(true)}
                >Modificar</button>
            </div>
        </div>
    )
}