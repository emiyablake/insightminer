"use client";
import { NextPage } from "next";
import { useState } from "react";
import styles from "./wordcloud.module.css"
import D3Cloud from "../Components/D3Cloud/D3Cloud";


interface Word {
    text: string;
    size: number;
}

const WordCloud: NextPage = () => {
    const [words, setWords] = useState<Word[]>([]); // Estado para as palavras da nuvem
    const [keyword, setKeyword] = useState(""); // Estado para a palavra-chave
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const [error, setError] = useState(""); // Estado de erro
    
    const WORDCLOUD_URL = "https://insightminer-617917671774.southamerica-east1.run.app/api/news/words/cloud"
    
    const fetchWords = async () => {
        setLoading(true);
        setError("");
      
        try {
          const response = await fetch(WORDCLOUD_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ search_word: keyword }),
          });
      
          if (!response.ok) {
            const errorDetails = await response.json();
            console.error("Erro do servidor:", errorDetails);
            setError(`Erro ${response.status}: ${errorDetails.message || "Falha na busca"}`);
            return;
          }
      
          const data = await response.json();
      
          // Verifique se o campo 'result' existe e é um array
          if (!Array.isArray(data.result)) {
            setError("Resposta inesperada do servidor.");
            console.error("Formato de resposta inválido:", data);
            return;
          }
      
          // Transforme os dados de 'result' no formato esperado para D3Cloud
          const formattedWords: Word[] = data.result.map((word: string) => ({
            text: word,
            size: 10, // Define tamanhos fictícios para exibição (ajuste conforme necessário)
          }));
      
          setWords(formattedWords); // Atualiza o estado com as palavras formatadas
        } catch (err: any) {
          setError(err.message || "Erro desconhecido.");
        } finally {
          setLoading(false);
        }
    };
      
  
    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (!keyword.trim()) {
        setError("Por favor, insira uma palavra-chave.");
        return;
      }
      fetchWords(); // Chamar a API para buscar as palavras
    };
  
    return (
      <div className={styles.mainHome}>
        <section className={styles.sectionCloud}>
          <h1>Digite uma palavra</h1>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Insira a palavra-chave"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Carregando..." : "Pesquisar"}
            </button>
          </form>
  
          {error && <p className={styles.error}>{error}</p>}
  
          <div className={styles.divCloud}>
            {words.length > 0 ? (
              <D3Cloud words={words} />
            ) : (
              <p>Insira uma palavra-chave para gerar a nuvem de palavras.</p>
            )}
          </div>
        </section>
      </div>
    );
}

export default WordCloud;