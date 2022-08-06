import Link from "next/link";

export default function UsuarioEliminado() {
    return (
        <p className={"py-5 rounded mb-5 text-center text-red-700 bg-red-100"}>Su cuenta ha sido bloqueada. Si cree que es un error <Link href={'/configuracion'}><a className={"underline"}>click aquí</a></Link></p>
    )
}