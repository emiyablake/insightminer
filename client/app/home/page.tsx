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
                <h3></h3>
                <div className={styles.infodash}>
                    <table className={styles.tableDash}>
                        <thead>
                            <tr>
                                <th>Análise de Uso do Usuário</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Requisições realizadas</td>
                                <td>45</td>
                            </tr>
                            <tr>
                                <td>Palavras pesquisadas</td>
                                <td>30</td>
                            </tr>
                            <tr>
                                <td>Horas ativo</td>
                                <td>5h 23m</td>
                            </tr>
                            <tr>
                                <td>Palavra mais pesquisada</td>
                                <td>Python</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Home;