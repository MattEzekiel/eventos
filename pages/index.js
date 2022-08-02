import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        sessionStorage.getItem('usuario') ? router.push('/dashboard') : router.push('/login');
    },[router]);

    return (
        <Head>
            <title>Unidos - Cargando...</title>
            <meta name="robots" content="index,follow" />
            <meta name="keywords" content="Unidos, mascotas, usuarios" />
            <link rel="icon" href={"/imgs/icon.svg"} />
        </Head>
    )
}