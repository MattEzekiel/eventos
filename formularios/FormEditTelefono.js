import Style from  '/styles/Inputs.module.css';
import {useState} from "react";
import Image from "next/image";
import Mensaje from "../components/Mensaje";

export default function FormEditTelefono({ telefono, setUsuario, setEditarTelefono } ) {
    const [telefonoEdit, setTelefonoEdit] = useState(telefono);
    const [disabled, setDisabled] = useState(true);
    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setDisabled(true);

        const formData = new FormData();
        formData.append('telefono', telefonoEdit);
        formData.append('_method', 'PUT');

        try {
            const id = await JSON.parse(sessionStorage.getItem('id'));
            const url = `${process.env.API_URL}/verificado/${id}/EditarTelefono`;
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

                setMensaje('Su teléfono ha sido cambiado');
                setTipoMensaje(true);

                setTimeout(() => {
                    setEditarTelefono(false);
                    setMensaje('');
                }, 5000)

            } else {
                console.log(resultado);
            }

        } catch (e) {
            console.error(e);
        }
    }

    const validateNombre = telefono => {
      if (telefono.length < 5) {
          setDisabled(true);
          setMensaje('El número de teléfono no puede ser menor a 3 caracteres');
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
                    htmlFor="telefono"
                    className={"sr-only"}
                >Nombre</label>
                <input
                    type={"tel"}
                    onChange={(e) => {
                            setTelefonoEdit(e.target.value)
                            validateNombre(e.target.value)
                        }
                    }
                    placeholder={"Ingrese el nuevo telefono"}
                    value={telefonoEdit}
                    name={"telefono"}
                    id={"telefono"}
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