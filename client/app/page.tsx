import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>
          <h1>Insight Miner</h1>
          <div className={styles.btnDiv}>
            <button className={styles.btn}> <Link href={"/login"}>Log in</Link></button>
            <button className={styles.btn}> <Link href={"/home"}>Log in</Link></button>
            
            <button>Sign In</button>
            </div>
        </div>
      </main>
    </div>
  );
}

