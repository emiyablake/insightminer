import styles from "./Header.module.css"
import Link from "next/link"
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu"

const Header: React.FC = () => {
    return(
        <div className={styles.header}>
            <div className={styles.}>
                <HamburgerMenu />
                <Link href={"./home"}><h1 className={styles.typeName}>Insight Miner</h1></Link>
            </div>
            <nav className={styles.nav}>
                <a href="https://github.com/emiyablake/insightminer/blob/main/README.md">Sobre</a>
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
export default Header;

