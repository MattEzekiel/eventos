import Styles from "../styles/Comentario.module.css";
import {useEffect, useState} from "react";
import Mensaje from "../components/Mensaje";
import {imgENV} from "../helpers";

export default function FormComentario({ usuario, id_noticia, setComentarios }) {
    const [disabled, setDisabled] = useState(true);
    const [comentario, setComentario] = useState('');
    const [error, setError] = useState('');
    const { nombre, razon_social, imagen } = usuario;

    const handleSubmit = async e => {
      e.preventDefault();

        const formData = new FormData();
        formData.append('comentario', comentario);

        const id_verificado = parseInt(JSON.parse(sessionStorage.getItem('id')));
        const url = `${process.env.API_URL}/comentarios/${id_verificado}/${id_noticia}`;

        const respuesta = await fetch(url, {
            method: 'POST',
            body: formData
        });
        const resultado = await respuesta.json();

        if (resultado.success) {
            setComentarios(resultado['comentarios']);
            setComentario('');
        } else {
            setError('Hubo un problema al intentar agregar su comentario')
        }
    }

    useEffect(() => {
        if (comentario.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [comentario]);

    return (
        <div className={"bg-gray-300 p-3 rounded-b-md"}>
            <div className={"flex items-center mb-2"}>
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
            <form
                onSubmit={handleSubmit}
                className={`${Styles.form} bg-gray-300 p-1 mb-10`}
            >
                <label
                    htmlFor={"comentario"}
                    className={"sr-only"}>Comentar</label>
                <textarea
                    name={"comentario"}
                    id={"comentario"}
                    placeholder={"Escribir un comentario"}
                    className={"w-full rounded-md p-3"}
                    onChange={e => setComentario(e.target.value)}
                    value={comentario}
                ></textarea>
                { error.length > 0 && (
                    <Mensaje
                        tipo={false}
                        mensaje={error}
                    />
                ) }
                <button
                    type={"submit"}
                    className={"flex justify-center items-center bg-violeta text-white font-semibold rounded w-full p-2 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-300"}
                    disabled={disabled}
                >Enviar</button>
            </form>
        </div>
    )
}