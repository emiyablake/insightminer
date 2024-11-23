'use client';
import { NextPage } from "next";
import {useState} from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Link from "next/link"
import styles from "./login.module.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/home"); // Redirect to a protected route after login
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    
    return (
        <div>
            
            <main className={styles.mainLogin}>
                <h1>Bem vindo!</h1>
                <form onSubmit={handleSubmit} className={styles.formLogin}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Entrar</button>
                    <div>
                        <Link href="/">Voltar</Link>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Login;