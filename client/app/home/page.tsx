import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import styles from "./home.module.css";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <Header />
            <main className={styles.mainHome}>
                <div className={styles.userHome}>
                    <h2>Bem vindo de volta /NomedoUsuario/</h2>
                    <p>O que você gostaria de fazer hoje?</p>
                    <nav className={styles.navHome}>
                        <button><Link href={"./wordcloud"}>Nuvem de palavras</Link></button>
                        <button>Gerenciar palavras chave</button>
                        <button>Gerenciar acessos</button>
                    </nav>
                </div>
                <div className={styles.dashHome}>
                    {/*Criar componente que analisa e transforma em dash 
                    → qnts requisições que o usuario fez 
                    → palavra mais pesquisada
                    → horas ativo?*/}
                    <div className={styles.infodash}>
                        <h3>Analise de uso do usuario</h3>
                        <p>qnts requisições que o usuario fez</p>
                        <p>Quantas palavras pesquisou</p>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    )
}