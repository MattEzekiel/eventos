import {useState} from "react";
import Styles from '../styles/LoginForm.module.css';
import Mensaje from "../components/Mensaje";

export default function FormOlvidePassword({setLoader}) {
    const [cuit,setCuit] = useState('');
    const [email,setEmail] = useState('');
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorCuit, setErrorCuit] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(false);
      setMensaje('');
      setErrorCuit('');
      setErrorEmail('');
      setDisabled(true);
      setSuccess(false);

      const datos = {
          cuit,
          email,
      }

      if (await validarData(datos)) {
          setMensaje('Error al intentar validar su información')
          setError(true);
          setDisabled(false);
          return;
      }

        setLoader(true);
        try {
            const url = `${process.env.API_URL}/verificado/olvidePassword`;
            const respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(datos),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const resultado = await respuesta.json();
            // console.log(resultado)

            if (resultado.success === false) {
                if (resultado.data) {
                    resultado.data.cuit ? setErrorCuit(resultado.data.cuit) : '';
                    resultado.data.email ? setErrorCuit(resultado.data.email) : '';
                    setError(true);
                    setMensaje('Error al intentar validar su información');
                } else {
                    setError(true);
                    setMensaje(resultado.mensaje);
                }
            } else if(resultado.success) {
                setSuccess(true);
                setMensaje(resultado.mensaje);
                setCuit('');
                setEmail('');
            }
        } catch (e) {
            console.error(e);
        }

      setLoader(false);
      setDisabled(false);
    }

    async function validarData(datos) {
        const { email, cuit } = datos;
        let errores = false;

        if (email === '') {
            setErrorEmail('El email no puede estar vacío');
            errores = true;
        }

        if (cuit === '') {
            setErrorCuit('El cuit no puede estar vacío')
            errores = true;
        }

        return errores;
    }

    return (
        <form
            className={`${Styles.form} flex flex-col items-center justify-center`}
            onSubmit={e => handleSubmit(e)}
        >
            { error && (
                <div className={"w-full"}>
                    <Mensaje
                        tipo={false}
                        mensaje={mensaje}
                    />
                </div>
            )}
            {
                success && (
                    <div className={"w-full"}>
                        <Mensaje
                            tipo={true}
                            mensaje={mensaje}
                        />
                    </div>
                )
            }
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
                <input
                    type={"submit"}
                    value={"Recuperar Contraseña"}
                    className={"py-2"}
                />
            </div>
        </form>
    )
}