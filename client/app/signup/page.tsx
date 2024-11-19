"use client"; // Ensure this file is treated as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Change the router import to next/navigation
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Adjust the path based on your structure
import Link from "next/link";
import styles from "./signup.module.css";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Clear any previous errors
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Redirect to the dashboard or homepage after successful signup
            router.push("/home"); // Adjust this path based on your app structure
        } catch {
            // Handle signup error
            setError("Failed to create an account. Please check your email and password.");
        }
    };
    return (
        <div>
            <main className={styles.mainSignup}>
                <form onSubmit={handleSignup} className={styles.formSignup}>
                    <h2>Bem vindo!</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button
                        type="submit">Cadastre-se</button>
                    <div>
                        <Link href="/"> Voltar</Link>
                    </div>
                </form>
            </main>
        </div>
    );
}