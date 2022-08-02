import Link from "next/link";
import Styles from '../styles/Breadcrum.module.css';

export default function Breadcrum({ link, anterior, actual }) {
    return (
        <p className={Styles.bread}><Link href={link}><a className={Styles.link}>{anterior}</a></Link> &#62; <span className={Styles.actual}>{actual.length > 16 ? actual.substring(0,16) + '[...]' : actual}</span></p>
    )
}