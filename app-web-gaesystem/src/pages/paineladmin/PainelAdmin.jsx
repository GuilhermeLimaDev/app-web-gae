import { useState } from "react";
import styles from "./AdminPanel.module.css";
import UserManagement from "./userManagement/UserManagement";
import CategoryManagement from "./categoryManagement/CategoryManagement";
import LocalManagement from "./localManagement/LocalManagement";

export default function PainelAdmin() {
  const [activeSection, setActiveSection] = useState("usuarios");

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Painel Admin</h2>
        <nav className={styles.nav}>
          <button
            onClick={() => setActiveSection("usuarios")}
            className={`${styles.navButton} ${
              activeSection === "usuarios" ? styles.active : ""
            }`}
          >
            👤 Gerenciar Usuários
          </button>

          <button
            onClick={() => setActiveSection("categorias")}
            className={`${styles.navButton} ${
              activeSection === "categorias" ? styles.active : ""
            }`}
          >
            🗂️ Gerenciar Categorias
          </button>

          <button
            onClick={() => setActiveSection("locais")}
            className={`${styles.navButton} ${
              activeSection === "locais" ? styles.active : ""
            }`}
          >
            📍 Gerenciar Locais
          </button>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className={styles.main}>
        {activeSection === "usuarios" && (
          <div>
            <UserManagement />
          </div>
        )}

        {activeSection === "categorias" && (
          <div>
            <CategoryManagement />
          </div>
        )}

        {activeSection === "locais" && (
          <div>
            <LocalManagement />
          </div>
        )}
      </main>
    </div>
  );
}
