import Link from "next/link";
import {fecha} from "../helpers";
import Styles from '../styles/Noticia.module.css';

export default function Noticia({noticia}) {
    const { titulo, imagen, created_at, slug } = noticia;

    return (
        <article className={Styles.carta}>
            <figure>
                <picture>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={process.env.API_IMAGEN + '/public/imgs/noticias/' + imagen} alt={`${titulo} portada`} />
                </picture>
                <figcaption className={"text-gray-400 text-sm my-3 pl-3"}>Publicado el: {fecha(created_at)}</figcaption>
            </figure>
            <div>
                <h2 className={"text-md font-semibold text-center"}>{titulo}</h2>
                <Link href={`/noticia/${slug}`}>
                    <a>Ver más</a>
                </Link>
            </div>
        </article>
    )
}