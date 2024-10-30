import styles from "./Header.module.css"
import Link from "next/link"

export default function Header() {
    return(
        <div className={styles.header}>
            <Link href={"./home"}><h1 className={styles.typeName}>Insight Miner</h1></Link>
            <nav className={styles.nav}>
                <a href="">Sobre</a>
                <a href="">Contato</a>
                {/*
                <ul>
                    <li><a href="">Sobre</a></li>
                    <li><a href="">Contato</a></li>
                </ul>
                */}
                
            </nav>
        </div>
    )
}