import React, {useState} from "react";
import Mensaje from "../components/Mensaje";
import Styles from "../styles/FormCompletar.module.css";
import {imgENV, previewImage} from "../helpers";

export default function FormEditImagen({ imagen, setUsuario, setEditarImagen } ) {
    const [imagenEdit, setImagenEdit] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setDisabled(true);

        const formData = new FormData();
        formData.append('imagen', imagenEdit);
        formData.append('_method', 'PUT');

        try {
            const id = await JSON.parse(sessionStorage.getItem('id'));
            const url = `${process.env.API_URL}/verificado/${id}/EditarImagen`;
            const respuesta = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            const resultado = await respuesta.json();

            if (resultado[0].original.success === true) {
                const { razon_social, nombre, email, imagen, telefono } = resultado[0].original.data[0];
                const id_verificado = resultado[0].original.id;

                const usuario = {
                    razon_social,
                    nombre,
                    email,
                    imagen,
                    telefono,
                }

                setUsuario(usuario);

                await sessionStorage.setItem('usuario',JSON.stringify(usuario));
                await sessionStorage.setItem('id',JSON.stringify(id_verificado));

                setMensaje('Su imagen ha sido cambiada');
                setTipoMensaje(true);

                setTimeout(() => {
                    setEditarImagen(false);
                    setMensaje('');
                }, 5000)

            } else {
                console.log(resultado);
            }

        } catch (e) {
            console.error(e);
        }
    }

    const validateImagen = imagen => {
    if (imagen === '') {
        setMensaje('El campo imagen está vacío');
      } else {
          setDisabled(false);
          setMensaje('');
      }
    }

    return (
        <form
            onSubmit={e => handleSubmit(e)}
        >
            <div className={"mt-5"}>
                <label
                    htmlFor="imagen"
                    className={"sr-only"}
                >Imagen</label>
                <input
                    type={"file"}
                    onChange={(e) => {
                            setImagenEdit(e.target.files[0])
                            validateImagen(e.target.files[0])
                        }
                    }
                    placeholder={"Ingrese su nueva imagen"}
                    name={"imagen"}
                    id={"imagen"}
                    className={"file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"}
                />
            </div>
            { typeof imagenEdit === "object" ?
                (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    className={Styles.preview}
                    src={previewImage(imagenEdit)}
                    alt="imagen" />
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        className={Styles.preview}
                        src={process.env.API_IMAGEN + imgENV(imagen)}
                        alt="imagen" />
                )
            }
            <div className={Styles.inpiutContainer}>
                <input
                    type={"submit"}
                    value={"Guardar datos"}
                    className={"mt-5 mx-auto px-20 block py-2"}
                    disabled={disabled}
                />
            </div>
            { mensaje !== '' && (
                <Mensaje
                    tipo={tipoMensaje}
                    mensaje={mensaje}
                />
            ) }
        </form>
    )
}