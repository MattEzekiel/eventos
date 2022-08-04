import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Head from "next/head";
import PawLoader from "../components/PawLoader";
import Styles from "../styles/Login.module.css";
import Image from "next/image";
import Link from "next/link";
import FormOlvidePassword from "../formularios/FormOlvidePassword";

export default function OlvidePassword() {
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
                <title>Unidos - Olvidé mi contraseña</title>
                <meta name="robots" content="noindex,nofollow" />
                <meta name="keywords" content="Unidos, olvidé contraseña" />
                <link rel="icon" href={"/imgs/icon.svg"} />
            </Head>
            { loader && (
                <PawLoader />
            )}
            <div className={`${Styles.background} flex justify-center items-center w-screen h-screen flex-col`}>
                <div className={"container mx-auto flex flex-col justify-center items-center md:shadow md:rounded md:border"}>
                    <Image layout={"fixed"} width={215} height={72} src={"/imgs/logo.svg"} alt={"Logo Unidos"} priority />
                    <h2 className={"text-center text-2xl my-5"}>Recuperar Contraseña</h2>
                    <FormOlvidePassword
                        setLoader={setLoader}
                    />
                    <p className={"mt-3"}>Volver a <Link href={"/login"}><a className={Styles.registrarme}>iniciar sesión</a></Link></p>
                </div>
            </div>
        </>
    )
}