"use client";

import { useEffect, useState } from "react";
import { NextPage } from "next";
import styles from "./managerWordkey.module.css";



interface WordData {
    searchWord: string;
    documentsInserted: number;
    executionTime: number;
}

const managerWordkey: NextPage = () => {
    const [words, setWords] = useState<WordData[]>([]);
    const [newWord, setNewWord] = useState<string>('');

    const UPDATE_URL = "https://insightminer-617917671774.southamerica-east1.run.app/api/news/words/update "
    
    const handlePostUpdate = async (searchWord:string) => {
      try {
        const response = await fetch(UPDATE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ search_word: searchWord }),
        });
  
        const data = await response.json();
  
        if (data.status === 'ok') {
          // Atualiza a tabela com os dados retornados
          const newWordData = {
            searchWord: data.query.search_word,
            documentsInserted: data.db_response.documents_inserted,
            executionTime: data.execution_time,
          };
  
          setWords((prevWords) => [newWordData, ...prevWords]);
          setNewWord('');
        } else {
          console.error('Erro ao atualizar:', data);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewWord(event.target.value);
    }
  
    return (
        <div className={styles.mainManager}>
            <h1>Gerenciador de Palavras-Chave</h1>
            <div className={styles.divManager}>
                <input
                    type="text"
                    value={newWord}
                    onChange={handleInputChange}
                    placeholder="Digite uma palavra"
                />
                <button
                    onClick={() => {
                    if (newWord.trim()) {
                        handlePostUpdate(newWord.trim());
                    } else {
                        alert('Por favor, insira uma palavra válida!');
                    }
                    }}
                > Adicionar Palavra
                </button>
            </div>
            <table className={styles.tableManager}>
                <thead className={styles.theadManager}>
                    <tr>
                    <th className={styles.thManager}>Palavra chave</th>
                    <th className={styles.thManager}>Documentos Inseridos</th>
                    <th className={styles.thManager}>Tempo de Execução</th>
                    </tr>
                </thead>
                <tbody>
                    {words.map((wordData, index) => (
                    <tr key={index}>
                        <td >{wordData.searchWord}</td>
                        <td >{wordData.documentsInserted}</td>
                        <td >{wordData.executionTime}(s)</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default managerWordkey;