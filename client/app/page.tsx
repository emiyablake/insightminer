import styles from "./page.module.css";
import Link from "next/link";


export default function Home() {
  return (
    <div className={styles.main}>
      <h1>Seja bem vindo</h1>
      <div className={styles.divButton}>
        <p>O que você gostaria de fazer?</p>
        <button > <Link href={"/home"}>Home</Link></button>
        <button > <Link href={"/login"}>Log in</Link></button>
        <button > <Link href={"/signup"}>Sign up</Link></button>
      </div>
    </div>
  );
}

