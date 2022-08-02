import Layout from "../layouts/layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import UsuarioEliminado from "../components/UsuarioEliminado";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import Styles from "../styles/Estado.module.css";
import Image from "next/image";

export default function Faq() {
    const [usuario,setUsuario] = useState({
        razon_social: 'Nombre Apellido',
    });
    const [eliminado, setEliminado] = useState(null);

    const router = useRouter();

    useEffect(() => {
        if (!sessionStorage.getItem('usuario')) {
           router.push('/login');
        } else {
            setUsuario(JSON.parse(sessionStorage.getItem('usuario')));
            setEliminado(JSON.parse(sessionStorage.getItem('eliminado')));
        }
    },[router]);
    
    return (
        <Layout
            pagina={"Consultas"}
            title={"Preguntas frecuentes"}
            datosUsuario={usuario}
        >
            { eliminado !== null && (
                <UsuarioEliminado />
            ) }
            <h2 className={"mb-5 text-xl font-semibold md:my-10 md:text-center"}>Preguntas frecuentes</h2>
            <Accordion
                allowMultipleExpanded={true}
                allowZeroExpanded={true}
            >
                <AccordionItem>
                    <AccordionItemHeading
                        aria-level={3}
                    >
                        <AccordionItemButton>
                            ¿Cómo puedo validar mi cuenta?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className={"px-5 py-8"}>
                        <p>Para validar su cuenta deberá:</p>
                        <ol>
                            <li>Completar los datos de su perfil: Esto lo puede hacer desde el menú en el ícono <button
                                className={`${Styles.pregunta} text-white`}
                            >
                                ?
                                <span className={`animate-ping ${Styles.ping}`}></span>
                            </button> <br/>
                            O en la sección de edición de datos
                            </li>
                            <li className={"mt-5"}>Por otra parte una vez completado sus perfil nosotros validaremos tus datos contactándonos con usted. Verá su cuenta validada cuando en el menú vea este ícono
                                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                <Image layout={"fixed"} width={20} height={20} src={"/imgs/verificado.svg"} /></li>
                        </ol>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading
                        aria-level={3}
                    >
                        <AccordionItemButton>
                            ¿Los datos de mi cuenta son visibles?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className={"px-5 py-8"}>
                        <p>Solamente son visibles:</p>
                        <ul>
                            <li>Su número de teléfono (para que los usuarios puedan contactarse con ustedes)</li>
                            <li>El nombre de su dispuesto por usted</li>
                            <li>La imágen que ingrese será visible como su marca</li>
                        </ul>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading
                        aria-level={3}
                    >
                        <AccordionItemButton>
                            ¿Cómo puedo crear un evento?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className={"px-5 py-8"}>
                        <p>Para crear nuevos eventos deberá dirigirse a la sección de eventos desde el menú. Ahí vera el botón que dice <b>&#34;crear evento&#34;</b>. En esta sección deberá completar todos los campos para publicar sus eventos</p>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading
                        aria-level={3}
                    >
                        <AccordionItemButton>
                            ¿Puedo crear un evento anterior a la fecha actual?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className={"px-5 py-8"}>
                        <p>No. Todos los eventos que se crean en la aplicación deben ser futuros (dentro de un par de horas, dias, meses u años)</p>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading
                        aria-level={3}
                    >
                        <AccordionItemButton>
                            ¿Qué es publicar o guardar como borrador?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className={"px-5 py-8"}>
                        <p>Guardar como borrador le permitirá a usted revisar todo su contenido antes de que los usuario de la aplicación de <b>Unidos</b> puedan verlo. Solo usted puede ver ese evento hasta que lo publique. <br/> Una vez publicado ese evento estará visible para todo usuario de la aplicación</p>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading
                        aria-level={3}
                    >
                        <AccordionItemButton>
                            Publiqué un evento y no lo veo en la aplicación
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className={"px-5 py-8"}>
                        <p>Es posible que no esté publicado debido a que su perfil no esté verificado. O en cuyo coso esté visible en unos minutos <br/> De no ser así comuníquese con nosotros en contacto</p>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading
                        aria-level={3}
                    >
                        <AccordionItemButton>
                            ¿Puedo generar un evento que se repita un día o varios días en la semana?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className={"px-5 py-8"}>
                        <p>De momento no contamos con esa funcionalidad. Solo se pueden crear eventos que existan una sola vez en la app. En futuras actualizaciones tomaremos en cuenta este punto</p>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading
                        aria-level={3}
                    >
                        <AccordionItemButton>
                            ¿Qué son las noticias?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className={"px-5 py-8"}>
                        <p>Las noticias es un medio que utilizamos desde <b>Unidos</b> para comentarles las últimas actualizaciones y que estén al tanto de todo lo que ocurre en nuestras distintas aplicaciones</p>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading
                        aria-level={3}
                    >
                        <AccordionItemButton>
                            Olvidé mi contraseña ¿Que hago?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className={"px-5 py-8"}>
                        <p>Al momento de perder su contraseña deberá completar un formulario y nosotros le restableceremos una provisional que, le sugerimos, que cambie a penas vuelva a iniciar sesión</p>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
        </Layout>
    )
}