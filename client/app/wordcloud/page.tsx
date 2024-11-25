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

          const stopWords = new Set([
            "the", "is", "in", "and", "of", "to", "a", "it", "on", "this", "at", "as", "but",
            "for", "with", "by", "an", "or", "be", "was", "are", "not", "that", "from", "have",
            "has", "had", "he", "she", "they", "we", "you", "his", "her", "their", "its", 
            "there", "here", "will", "would", "can", "could", "about", "some", "many", 
            "also", "just", "like", "over", "now", "then", "place", "weekly", "may", "und"
          ]);

          // Limpeza e contagem de palavras
          const cleanedWords = data.result
          .filter((word: string) => {
              // Normaliza para letras minúsculas
              const normalizedWord = word.toLowerCase();

              // Filtros de palavras irrelevantes
              return (
                  /^[a-zA-Z]+$/.test(normalizedWord) && // Apenas letras
                  !stopWords.has(normalizedWord) && // Não está na lista de stop words
                  normalizedWord.length > 2 // Ignora palavras muito curtas (ex: "it", "is")
              );
          })
          .map((word: string) => word.toLowerCase()); // Normaliza para letras minúsculas

      
          // Conta a frequência de cada palavra
        const wordFrequency: { [key: string]: number } = cleanedWords.reduce(
          (acc: { [key: string]: number }, word: string) => {
              acc[word] = (acc[word] || 0) + 1;
              return acc;
          },
          {}
      );

      // Converte o objeto em um array de palavras com suas frequências
      const wordArray = Object.entries(wordFrequency).map(([text, count]) => ({
          text,
          size: count, // Define o tamanho baseado na frequência
      }));

      // Ordena pelo tamanho (frequência) e limita a 30 palavras
      const maxWords = 30;
      const limitedWords = wordArray
          .sort((a, b) => b.size - a.size) // Ordena de maior para menor frequência
          .slice(0, maxWords);

      setWords(limitedWords);
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
              placeholder="Ex python"
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
              <p className={styles.pCloud}>Insira uma palavra-chave para gerar a nuvem de palavras.</p>
            )}
          </div>
        </section>
      </div>
    );
}

export default WordCloud;