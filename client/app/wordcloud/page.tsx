"use client";

import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import styles from "./wordcloud.module.css"


export default function wordcloud() {

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