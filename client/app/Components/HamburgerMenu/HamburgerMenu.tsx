"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./HamburgerMenu.module.css"

const HamburgerMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.menuBurgue}>
      <button className={styles.burgue} onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`${styles.navBurgue} ${menuOpen ? styles.open : ""}`}>
        <div className={styles.styleNav}>
          <button><Link href="/home">Home</Link></button>
          <button> <Link href="/wordcloud">Nuvem de palavras</Link></button>
          <button><Link href="/managerWordkey">Gerenciador de palavra chave</Link></button>
          <button><Link href="/userProfile">Perfil do usuario</Link></button>
        </div>
      </nav>
    </div>
  );
};

export default HamburgerMenu;