import { NextPage } from "next"
import styles from "./userProfile.module.css"

const UserProfile: NextPage = () => {
    return (
        <div className={styles.mainProfile}>
            <h1>User Profile</h1>
            <section className={styles.divProfile}>
                <div>
                    <label className={styles.label}>Nome</label>
                    <input type="text" placeholder="Nome do usuario" />
                </div>
                <div>
                    <label htmlFor="">Email</label>
                    <input type="text" placeholder="usuario@email" />
                </div>
                <div>
                    <label htmlFor="">Senha</label>
                    <input type="password" placeholder="********" />
                </div>
                <button>Submite</button>
            </section>
        </div>
    )
}

export default UserProfile;