import Style from  '/styles/Inputs.module.css';
import {useState} from "react";
import Image from "next/image";
import Mensaje from "../components/Mensaje";

export default function FormEditNombre({ nombre, setEditarNombre, setUsuario } ) {
    const [nombreEdit, setNombreEdit] = useState(nombre);
    const [disabled, setDisabled] = useState(true);
    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setDisabled(true);

        const formData = new FormData();
        formData.append('nombre', nombreEdit);
        formData.append('_method', 'PUT');

        try {
            const id = await JSON.parse(sessionStorage.getItem('id'));
            const url = `${process.env.API_URL}/verificado/${id}/EditarNombre`;
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

                setMensaje('Su nombre ha sido cambiado');
                setTipoMensaje(true);

                setTimeout(() => {
                    setEditarNombre(false);
                    setMensaje('');
                }, 5000)

            } else {
                console.log(resultado);
            }

        } catch (e) {
            console.error(e);
        }
    }

    const validateNombre = nombre => {
      if (nombre.length < 3) {
          setDisabled(true);
          setMensaje('El nombre no puede ser menor a 3 caracteres');
      } else {
          setDisabled(false);
          setMensaje('');
      }
    }

    return (
        <form
            onSubmit={e => handleSubmit(e)}
        >
            <div className={Style.inpiutContainer}>
                <label
                    htmlFor="nombre"
                    className={"sr-only"}
                >Nombre</label>
                <input
                    type={"text"}
                    onChange={(e) => {
                            setNombreEdit(e.target.value)
                            validateNombre(e.target.value)
                        }
                    }
                    placeholder={"Ingrese el nuevo nombre"}
                    value={nombreEdit}
                    name={"nombre"}
                    id={"nombre"}
                />
                <button
                    type={"submit"}
                    className={"bg-violeta"}
                    disabled={disabled}
                >
                    <Image src={"/imgs/ok.svg"} width={30} height={30} layout={"fixed"} alt={"Guardar cambios"}/>
                </button>
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