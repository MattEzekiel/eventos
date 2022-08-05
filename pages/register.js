import Head from "next/head";
import Styles from "../styles/Login.module.css";
import Image from "next/image";
import Link from "next/link";
import FormRegister from "../formularios/FormRegister";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import PawLoader from "../components/PawLoader";

export default function Register() {
    const router = useRouter();

    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('usuario')) {
            router.push('/dashboard');
        }
    },[router]);

    return (
        <>
            <Head>
                <title>Unidos - Registrarse</title>
                <meta name="robots" content="index,follow" />
                <meta name="keywords" content="Unidos, mascotas, usuarios" />
                <link rel="icon" href={"/imgs/icon.svg"} />
            </Head>
            { loader && (
                <PawLoader />
            )}
            <div className={`${Styles.backgroundRegistro} flex justify-center items-center w-screen h-screen flex-col`}>
                <div className={"container mx-auto flex flex-col justify-center items-center md:shadow md:rounded md:border"}>
                    <Image layout={"fixed"} width={215} height={72} src={"/imgs/logo.svg"} alt={"Logo Unidos"} />
                    <h2 className={"text-center text-2xl mt-3"}>Registrarse</h2>
                    <FormRegister
                        router={router}
                        setLoader={setLoader}
                    />
                    <p>¿Ya tiene cuenta? <Link href={"/login"}><a className={Styles.registrarme}>iniciar sesión</a></Link></p>
                </div>
            </div>
        </>
    )
}