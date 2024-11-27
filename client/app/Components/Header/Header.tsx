import styles from "./Header.module.css"
import Link from "next/link"
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu"

const Header: React.FC = () => {
    return(
        <div className={styles.header}>
            <div className={styles.divHeader}>
                <HamburgerMenu />
                <Link href={"./home"}><h1 className={styles.typeName}>Insight Miner</h1></Link>
            </div>
            <nav className={styles.nav}>
                <a target="blank" href="https://github.com/emiyablake/insightminer/blob/main/README.md">Sobre</a>
                <a href="">Contato</a>
                
            </nav>
        </div>
    )
}
export default Header;

