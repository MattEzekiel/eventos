import {useState} from "react";
import Styles from '../styles/LoginForm.module.css';
import Image from "next/image";
import process from "../next.config";
import {validateEmail} from "../helpers";
import Mensaje from "../components/Mensaje";

export default function FormRegister({ router, setLoader }) {
    const [cuit, setCuit] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [togglePassword, setTogglePassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(false);
    const [mensajeError, setMensajeError] = useState('');
    const [cuitError,setCuitError] = useState('');
    const [emailError,setEmailError] = useState('');
    const [passwordError,setPasswordError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setCuitError('');
        setEmailError('');
        setPasswordError('');
        setLoader(true);

        const data = {
            cuit: Number(cuit),
            email,
            password,
        }

        try {
            const url = `${process.env.API_URL}/verificado/register`;
            const respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const resultado = await respuesta.json();
            console.log(resultado);

            if (resultado.success === false) {
                mostrarErrores(resultado.data)
            } else if (resultado.success === true) {
                sessionStorage.setItem('usuario',JSON.stringify(resultado.data[0]));
                sessionStorage.setItem('id',JSON.stringify(resultado.id));
                router.push('/dashboard');
            }

            setDisabled(false);
            setLoader(false);
        }
        catch (e) {
            // console.error(e);
            setError(true);
            setMensajeError('Ha ocurrido un error al momento de autenticar sus datos');
        }
        setLoader(false);
    }

    function mostrarErrores(mensajes) {
        if (typeof mensajes.cuit !== 'undefined') {
            setCuitError(mensajes.cuit[0]);
        }

        if (typeof mensajes.email !== 'undefined') {
            setEmailError(mensajes.email[0]);
        }

        if (typeof mensajes.password !== 'undefined') {
            setPasswordError(mensajes.password[0]);
        }
    }

    const handleCheckCuit = cuit => {
        if ((cuit.trim()).length !== 11) {
            setCuitError('El Cuit debe contener 11 caracteres')
        } else if(isNaN(cuit)) {
            setCuitError('El campo Cuit solo debe contener números sin espacios')
        } else {
            setCuitError('');
        }
    }

    const handleEmail = email => {
        if ((email.trim()).length === 0) {
            setEmailError('El campo email está vacío');
        } else if(validateEmail(email)) {
            setEmailError('Debe cargar un email válido');
        }
    }

    const handlePassword = password => {
        if (password === '') {
            setPasswordError('La contraseña no puede estar vacía');
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
                    htmlFor={"cuit"}>Cuit</label>
                <input
                    type={"number"}
                    name={"cuit"}
                    id={"cuit"}
                    value={cuit}
                    onChange={e => setCuit(e.target.value)}
                    placeholder={"Ingrese su CUIT aquí"}
                    onBlur={e => handleCheckCuit(e.target.value)}
                    disabled={disabled}
                />
                <small>CUIT sin guiones ni espacios</small>
                { cuitError.length > 0 && (
                    <div className={"mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"} role={"alert"}>
                        <p className={"text-center"}>{cuitError}</p>
                    </div>
                ) }
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
                    onBlur={e => handleEmail(e.target.value)}
                    disabled={disabled}
                />
                { emailError.length > 0 && (
                    <div className={"mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"} role={"alert"}>
                        <p className={"text-center"}>{emailError}</p>
                    </div>
                ) }
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
                    onBlur={e => handlePassword(e.target.value)}
                    disabled={disabled}
                />
                <button
                    onClick={ () => setTogglePassword( !togglePassword ) }
                    className={Styles.ojo}
                    type={"button"}
                >
                    {
                        togglePassword ?
                            <Image layout={"fixed"} width={48} height={48} src={"/imgs/eye.svg"} alt={"ocultar contraseña"} />
                            :
                            <Image layout={"fixed"} width={48} height={48} src={"/imgs/eye-closed.svg"} alt={"ver contraseña"} />
                    }
                </button>
            </div>
            { passwordError.length > 0 && (
                <div className={"mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full"} role={"alert"}>
                    <p className={"text-center"}>{passwordError}</p>
                </div>
            ) }
            <div className={Styles.inpiutContainer}>
                <input
                    type={"submit"}
                    value={"Registrarse"}
                    className={"py-2"}
                />
            </div>
        </form>
    )
}