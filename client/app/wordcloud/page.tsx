"use client";
import { NextPage } from "next";
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import styles from "./wordcloud.module.css"


const WordCloud: NextPage = () => {
    return (
        <div>
            <Header />
            <main className={styles.mainHome}>
                <h1>WordCloud</h1>
           
            </main>
            <Footer />
        </div>
    )
}

export default WordCloud;