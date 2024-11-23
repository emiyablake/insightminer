import styles from "./page.module.css";
import Link from "next/link";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>Insight Miner</h1>
          <div className={styles.btnDiv}>
            <button > <Link href={"/home"}>Home</Link></button>
            <button > <Link href={"/login"}>Log in</Link></button>
            <button > <Link href={"/signup"}>Sign up</Link></button>
          </div>
        </div>
      </main>
    </div>
  );
}

