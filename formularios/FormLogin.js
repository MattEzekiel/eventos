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
            errores.cuit = 'El CUIT debe tener al menos 11 n??meros';
        }

        if (isNaN(cuit)) {
            errores.cuit = 'El CUIT debe contener solamente n??meros';
        }

        if (cuit === '') {
            errores.cuit = 'El campo CUIT est?? vac??o';
        }

        if (email === '') {
            errores.email = 'El campo email est?? vac??o';
        }

        if (validateEmail(email)) {
            errores.email = 'El email es inv??lido';
        }

        if (password === '') {
            errores.password = 'La contrase??a est?? vac??a';
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
                    placeholder={"Ingrese su CUIT aqu??"}
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
                    placeholder={"Ingrese su email aqu??"}
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
                    htmlFor={"password"}>Contrase??a</label>
                <input
                    type={ !togglePassword ? "password" : "text" }
                    name={"password"}
                    id={"password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={"Ingrese su contrase??a aqu??"}
                    disabled={disabled}
                />
                <button
                    onClick={ () => setTogglePassword( !togglePassword ) }
                    className={Styles.ojo}
                    type={"button"}
                >
                    {
                        togglePassword ?
                            <Image layout={"fixed"} width={48} height={48} src={"/imgs/eye.svg"} alt={"ocultar contrase??a"} priority />
                            :
                            <Image layout={"fixed"} width={48} height={48} src={"/imgs/eye-closed.svg"} alt={"ver contrase??a"} priority />
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
                    value={"Iniciar Sesi??n"}
                    className={"py-2"}
                />
            </div>
        </form>
    )
}