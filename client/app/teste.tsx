/** @format */
"use client"; // Ensure this file is treated as a Client Component
import { useState } from "react";
import { useRouter } from "next/navigation"; // Change the router import to next/navigation
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase"; // Adjust the path based on your structure
import Link from "next/link";

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
            router.push("/"); // Adjust this path based on your app structure
        } catch {
            // Handle signup error
            setError("Failed to create an account. Please check your email and password.");
        }
    };
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <form
                onSubmit={handleSignup}
                style={{ display: "flex", flexDirection: "column", width: "300px" }}
            >
                <h2>Cadastrar</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ marginBottom: "10px", padding: "8px" }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ marginBottom: "10px", padding: "8px" }}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button
                    type="submit"
                    style={{ padding: "8px", backgroundColor: "blue", color: "white", cursor: "pointer" }}
                >
                    Cadastre-se
                </button>
                <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                    <Link
                        href="/"
                        style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                    >
                        Voltar para Login
                    </Link>
                </div>
            </form>
        </div>
    );
}
