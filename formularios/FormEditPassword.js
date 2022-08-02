import Style from  '/styles/Inputs.module.css';
import {useState} from "react";
import Image from "next/image";
import Mensaje from "../components/Mensaje";

export default function FormEditPassword({ setEditarPassword, setUsuario } ) {
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState(false);
    const [verPassword, setVerPassword] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setDisabled(true);

        const formData = new FormData();
        formData.append('password', password);
        formData.append('_method', 'PUT');

        try {
            const id = await JSON.parse(sessionStorage.getItem('id'));
            const url = `${process.env.API_URL}/verificado/${id}/EditarPassword`;
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

                setMensaje('Su contraseña ha sido cambiado');
                setTipoMensaje(true);

                setTimeout(() => {
                    setEditarPassword(false);
                    setMensaje('');
                }, 5000)

            } else {
                console.log(resultado);
            }

        } catch (e) {
            console.error(e);
        }
    }

    const validatePassword = password => {
        if (password.length < 6) {
            setDisabled(true);
            setMensaje('la contraseña es muy corta');
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
                <div
                    className={Style.mostrarPassword}
                    onClick={() => setVerPassword(!verPassword)}
                >
                    <Image src={verPassword ? "/imgs/eye.svg" : "/imgs/eye-closed.svg"} width={20} height={20} layout={"fixed"} alt={"mostrar contraseña"}/>
                </div>
                <label
                    htmlFor="password"
                    className={"sr-only"}
                >Contraseña</label>
                <input
                    type={verPassword ? "text" : "password"}
                    onChange={(e) => {
                            setPassword(e.target.value)
                            validatePassword(e.target.value)
                        }
                    }
                    placeholder={"Ingrese la nueva contraseña"}
                    value={password}
                    name={"password"}
                    id={"password"}
                    className={"relative"}
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