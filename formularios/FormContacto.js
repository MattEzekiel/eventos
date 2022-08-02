import {useEffect, useState} from "react";
import Mensaje from "../components/Mensaje";

export default function FormContacto() {
    const [asunto, setAsunto] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [errores, setErrores] = useState(true);
    const [success, setSuccess] = useState('');

    const handleSubmit = async e => {
      e.preventDefault();
      
      const data = {
          asunto,
          mensaje,
      }
      
      if (validateData(data)) {
          return;
      }

        const formData = new FormData();
        formData.append('asunto', asunto);
        formData.append('mensaje', mensaje);
        formData.append('id_verificado', parseInt(JSON.parse(sessionStorage.getItem('id'))));

        const url = `${process.env.API_URL}/contacto`;

        const respuesta = await fetch(url, {
            method: 'POST',
            body: formData
        });
        const resultado = await respuesta.json();

        if (resultado.success) {
            setSuccess(resultado['mensaje']);
            setErrores('');

            setTimeout(() => {
                setSuccess('');
            },10000)
        } else {
            setErrores('Ocurrió un error al intentar enviar el formulario');
            console.error(resultado);
        }

    }
    
    const validateData = data => {
      const { asunto, mensaje } = data;
      const errores = {};

      if (asunto === '') {
          errores.asunto = 'Debe seleccionar una opción';
      }

      if (asunto !== 'bloqueado' && asunto !== 'eventos' && asunto !== 'noticias' && asunto !== 'verificado' && asunto !== 'otro') {
          errores.asunto = 'Debe seleccionar una opción válida';
      }

      if (mensaje === '') {
          errores.mensaje = 'Debe escribir un mensaje';
      }

      if (Object.keys(errores).length > 0) {
          setErrores(errores);
          return true;
      } else {
          return false;
      }

    }

    useEffect(() => {
        if (asunto !== '' && mensaje !== '') {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [asunto, mensaje]);

    return (
        <form
            onSubmit={handleSubmit}
            className={"border rounded p-3 md:max-w-3xl md:mx-auto md:shadow"}
        >
            { success !== '' && (
                <div className={"mb-5"}>
                    <Mensaje
                        tipo={true}
                        mensaje={success}
                    />
                </div>
            ) }
            <div className={"flex flex-col mb-5"}>
                <label
                    htmlFor={"asunto"}
                    className={"mb-1"}
                >Asunto</label>
                <select
                    name={"asunto"}
                    id={"asunto"}
                    className={"border rounded border-violet-700 py-1 px-2"}
                    onChange={e => setAsunto(e.target.value)}
                    value={asunto}
                >
                    <option value="" disabled>Elija una opción</option>
                    <option value={"bloqueado"}>Cuenta bloqueada</option>
                    <option value={"eventos"}>Problema con evento/s</option>
                    <option value={"noticias"}>Problema con noticia/s</option>
                    <option value={"verificado"}>Problema con verificación de cuenta</option>
                    <option value={"otro"}>Otro</option>
                </select>
                { errores.asunto && (
                    <Mensaje
                        tipo={false}
                        mensaje={errores.asunto}
                    />
                ) }
            </div>
            <div className={"flex flex-col mb-5"}>
                <label
                    htmlFor={"mensaje"}
                    className={"mb-1"}
                >Mensaje</label>
                <textarea
                    name={"mensaje"}
                    id={"mensaje"}
                    onChange={e => setMensaje(e.target.value)}
                    value={mensaje}
                    className={"border rounded p-1 h-36"}
                    placeholder={"Escriba su mensaje"}
                ></textarea>
                { errores.mensaje && (
                    <Mensaje
                        tipo={false}
                        mensaje={errores.mensaje}
                    />
                ) }
            </div>
            <button
                type={"submit"}
                className={"flex justify-center items-center bg-violeta text-white font-semibold rounded w-full p-2 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-300"}
                disabled={disabled}
            >Enviar</button>
        </form>
    )
}