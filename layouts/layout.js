import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Styles from '../styles/Layout.module.css';
import {useEffect, useState} from "react";

export default function Layout({ children, pagina, title, datosUsuario }) {
    const [mobile, setMobile] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const viewport = window.matchMedia('(min-width: 911px)');

            if (viewport.matches) {
                setMobile(false);
            } else {
                setMobile(true);
            }
        }
    },[]);

    return(
        <>
            <Head>
                <title>Unidos - {title}</title>
                <meta name="robots" content="index,follow" />
                <meta name="keywords" content="Unidos, mascotas, usuarios" />
                <link rel="icon" href={"/imgs/icon.svg"} />
            </Head>
            <Header
                pagina={pagina}
                datosUsuario={datosUsuario}
            />
            <main className={`${Styles.main} mx-auto my-5`}>
                {children}
            </main>
            <Footer />
        </>
    )
}