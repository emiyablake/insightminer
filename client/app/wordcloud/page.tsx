"use client";
import { NextPage } from "next";
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import styles from "./wordcloud.module.css"
import D3Cloud from "../Components/D3Cloud/D3Cloud";


const WordCloud: NextPage = () => {
    const words = [
        { text: "Next.js", size: 30 },
        { text: "React", size: 50 },
        { text: "JavaScript", size: 40 },
        { text: "Web", size: 25 },
        { text: "D3", size: 35 },
        { text: "Cloud", size: 45 },
        { text: "Visualization", size: 20 },
        { text: "Frontend", size: 30 },
        { text: "Next.js", size: 30 },
        { text: "React", size: 50 },
        { text: "JavaScript", size: 40 },
        { text: "Web", size: 25 },
        { text: "D3", size: 35 },
        { text: "Cloud", size: 45 },
        { text: "Visualization", size: 20 },
        { text: "Frontend", size: 30 },
        { text: "Next.js", size: 30 },
        { text: "React", size: 50 },
        { text: "JavaScript", size: 40 },
        { text: "Web", size: 25 },
        { text: "D3", size: 35 },
        { text: "Cloud", size: 45 },
        { text: "Visualization", size: 20 },
        { text: "Frontend", size: 30 },
    ]
    return (
        <div className={styles.mainHome}>
            <section className={styles.sectionCloud}>
                    <h1>WordCloud</h1>
                    
                    <input type="text" />
                    <div className={styles.divCloud}>
                        <D3Cloud words={words} />
                    </div>
                </section>
        </div>
    )
}

export default WordCloud;