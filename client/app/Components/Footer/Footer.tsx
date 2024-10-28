import styles from './Footer.module.css'

export default function Footer() {
    return(
        <div className={styles.footer}>
            
            <h3>All rights reserved</h3>
            <div>
                <h4>Analise e Desenvolvimento de Sistemas</h4>
                <h5>4ª Fase | Projeto Multidisciplinar integrador </h5>
            </div>
            <nav>
                
                <ul className={styles.ulFooter}>
                    <li><a href="">Mara Júlia Ávila</a></li>
                    <li><a href="">Gabriel Ratão</a></li>
                    <li><a href="">UNICESUSC</a></li>
                </ul>
            </nav>
        </div>
    )
}