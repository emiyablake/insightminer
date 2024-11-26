import { NextPage } from "next";
import styles from "./home.module.css";
import Link from "next/link";


const Home: NextPage = () => {
    return (
        <div className={styles.mainHome}>

            <div className={styles.userHome}>
                    <h2>Bem vindo de volta</h2>
                    <p>O que você gostaria de fazer hoje?</p>
                    <nav className={styles.navHome}>
                        <button><Link href={"./wordcloud"}>Nuvem de palavras</Link></button>
                        <button><Link href={"./managerWordkey"}>Gerenciador de palavras chave</Link></button>
                        <button><Link href={"./userProfile"}>Perfil do usuario</Link></button>
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
                        <p>coisarada</p>
                    </div>
                </div>
        </div>
    )
}
export default Home;