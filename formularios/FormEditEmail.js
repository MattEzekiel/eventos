import Style from  '/styles/Inputs.module.css';
import {useState} from "react";
import Image from "next/image";
import Mensaje from "../components/Mensaje";
import {validateEmail} from "../helpers";

export default function FormEditEmail({ email, setEditarEmail, setUsuario } ) {
    const [emailEdit, setEmailEdit] = useState(email);
    const [disabled, setDisabled] = useState(true);
    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setDisabled(true);

        const formData = new FormData();
        formData.append('email', emailEdit);
        formData.append('_method', 'PUT');

        try {
            const id = await JSON.parse(sessionStorage.getItem('id'));
            const url = `${process.env.API_URL}/verificado/${id}/EditarEmail`;
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

                setMensaje('Su email ha sido cambiado');
                setTipoMensaje(true);

                setTimeout(() => {
                    setEditarEmail(false);
                    setMensaje('');
                }, 5000)

            } else {
                console.log(resultado);
            }

        } catch (e) {
            console.error(e);
        }
    }

    const validarEmail = email => {
        if (validateEmail(email)) {
            setDisabled(true);
            setMensaje('El email no es válido');
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
                    htmlFor="email"
                    className={"sr-only"}
                >Email</label>
                <input
                    type={"text"}
                    onChange={(e) => {
                        setEmailEdit(e.target.value)
                        validarEmail(e.target.value)
                    }
                    }
                    placeholder={"Ingrese el nuevo email"}
                    value={emailEdit}
                    name={"email"}
                    id={"email"}
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