import styles from './Footer.module.css'

const Footer: React.FC = () => {
    return(
        <div className={styles.footer}>
            
            <p>All rights reserved</p>
            <div>
                <h4>Analise e Desenvolvimento de Sistemas</h4>
                <h5>4ª Fase | Projeto Multidisciplinar integrador </h5>
            </div>
            <nav>
                
                <ul className={styles.ulFooter}>
                    <li><a target="blank" href="https://github.com/emiyablake">Mara Júlia Ávila</a> | <a target="blank" href="https://github.com/gabrielratao">Gabriel Ratão</a></li>
                    <li></li>
                    <li><a target="blank" href="https://cesusc.edu.br">UNICESUSC</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Footer;
