import Image from "next/image";

export default function CerrarSesion() {
    const handleCerrarSession = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('id');
        window.location.reload();
    }

    return (
        <div className={"px-5"}>
            <button
                type={"button"}
                onClick={handleCerrarSession}
                className={"text-white text-lg flex items-center gap-2"}
            > <Image layout={"fixed"} width={30} height={30} src={"/imgs/exit-icon.svg"} alt={"icono de cerrar sesión"} /> Cerrar Sesión</button>
        </div>
    )
}