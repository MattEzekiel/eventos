import {useState} from "react";
import Styles from '../styles/LoginForm.module.css';
import Mensaje from "../components/Mensaje";
import {validateEmail} from "../helpers";
import Image from "next/image";

export default function FormLogin({ router, setLoader }) {
    const [cuit,setCuit] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState(false);
    const [mensajeError, setMensajeError] = useState('');
    const [errorCuit, setErrorCuit] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [togglePassword, setTogglePassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setLoader(true);

        const data = {
            cuit: Number(cuit),
            email,
            password
        }

        if (validateData(data)) {
            setMensajeError('Error al completar los campos');
            setError(true);
            setDisabled(false);
            setLoader(false);

          setTimeout(() => {
              setError(false);
          },10000)
            return;
        }

        try {
            const url = `${process.env.API_URL}/verificado/login`;
            const respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const resultado = await respuesta.json();

            // console.log(resultado)

            if (resultado.success === false) {
                setError(true);
                setMensajeError(resultado.mensaje);
                setDisabled(false);

                setTimeout(() => {
                    setError(false);
                },10000);

                return setLoader(false);
            }

            sessionStorage.setItem('usuario',JSON.stringify(resultado.data.original.data[0]));
            sessionStorage.setItem('id',JSON.stringify(resultado.data.original.id));
            sessionStorage.setItem('eliminado',JSON.stringify(resultado.data.original.data[0]['deleted_at']));

            router.push('/dashboard');
        }
        catch (e) {
            console.error(e);
            setError(true);
            setMensajeError('Ha ocurrido un error al momento de autenticar sus datos');
            setLoader(false);
        }
        setLoader(false);
    }

    function validateData(datos) {
        setErrorCuit('');
        setErrorEmail('');
        setErrorPassword('');

        const { cuit, email, password } = datos;
        let errores  = {};

        if (cuit.toString().length !== 11) {
            errores.cuit = 'El CUIT debe tener al menos 11 números';
        }

        if (isNaN(cuit)) {
            errores.cuit = 'El CUIT debe contener solamente números';
        }

        if (cuit === '') {
            errores.cuit = 'El campo CUIT está vacío';
        }

        if (email === '') {
            errores.email = 'El campo email está vacío';
        }

        if (validateEmail(email)) {
            errores.email = 'El email es inválido';
        }

        if (password === '') {
            errores.password = 'La contraseña está vacía';
        }

        if (Object.keys(errores).length > 0) {

            if (errores.cuit) {
                setErrorCuit(errores.cuit);
            }

            if (errores.email) {
                setErrorEmail(errores.email);
            }

            if (errores.password) {
                setErrorPassword(errores.password);
            }

            return true;

        } else {
            return false;
        }
    }

    return (
        <form
            className={`${Styles.form} flex flex-col items-center justify-center`}
            onSubmit={e => handleSubmit(e)}
        >
            { error && (
                <Mensaje
                    tipo={false}
                    mensaje={mensajeError}
                />
            )}
            <div className={Styles.inpiutContainer}>
                <label
                    className={"text-lg"}
                    htmlFor={"cuit"}>CUIT</label>
                <input
                    type={"number"}
                    name={"cuit"}
                    id={"cuit"}
                    value={cuit}
                    onChange={e => setCuit(e.target.value)}
                    placeholder={"Ingrese su CUIT aquí"}
                    disabled={disabled}
                />
                <small>CUIT sin guiones ni espacios</small>
                { errorCuit !== '' && (
                    <div className={"mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"} role={"alert"}>
                        <p className={"text-center"}>{errorCuit}</p>
                    </div>
                )}
            </div>
            <div className={Styles.inpiutContainer}>
                <label
                    className={"text-lg"}
                    htmlFor={"email"}>Email</label>
                <input
                    type={"email"}
                    name={"email"}
                    id={"email"}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={"Ingrese su email aquí"}
                    disabled={disabled}
                />
                { errorEmail !== '' && (
                    <div className={"mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"} role={"alert"}>
                        <p className={"text-center"}>{errorEmail}</p>
                    </div>
                )}
            </div>
            <div className={Styles.inpiutContainer}>
                <label
                    className={"text-lg"}
                    htmlFor={"password"}>Contraseña</label>
                <input
                    type={ !togglePassword ? "password" : "text" }
                    name={"password"}
                    id={"password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={"Ingrese su contraseña aquí"}
                    disabled={disabled}
                />
                <button
                    onClick={ () => setTogglePassword( !togglePassword ) }
                    className={Styles.ojo}
                    type={"button"}
                >
                    {
                        togglePassword ?
                            <Image layout={"fixed"} width={48} height={48} src={"/imgs/eye.svg"} alt={"ocultar contraseña"} priority />
                            :
                            <Image layout={"fixed"} width={48} height={48} src={"/imgs/eye-closed.svg"} alt={"ver contraseña"} priority />
                    }
                </button>
                { errorPassword !== '' && (
                    <div className={"mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"} role={"alert"}>
                        <p className={"text-center"}>{errorPassword}</p>
                    </div>
                )}
            </div>
            <div className={Styles.inpiutContainer}>
                <input
                    type={"submit"}
                    value={"Iniciar Sesión"}
                    className={"py-2"}
                />
            </div>
        </form>
    )
}