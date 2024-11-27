"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./HamburgerMenu.module.css"

const HamburgerMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.menuBurgue}>
      <button className={styles.burgue} onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`${styles.navBurgue} ${menuOpen ? styles.open : ""}`}>
        <div className={styles.styleNav}>
          <button onClick={closeMenu} ><Link href="/home">Home</Link></button>
          <button onClick={closeMenu}> <Link href="/wordcloud">Nuvem de palavras</Link></button>
          <button onClick={closeMenu}><Link href="/managerWordkey">Gerenciador de palavra chave</Link></button>
          <button onClick={closeMenu}><Link href="/userProfile">Perfil do usuario</Link></button>
        </div>
      </nav>
    </div>
  );
};

export default HamburgerMenu;