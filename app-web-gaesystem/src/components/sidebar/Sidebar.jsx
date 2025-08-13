// components/Sidebar/Sidebar.jsx
import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar = ({ isOpen, onClose, children }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <button className={styles.closeBtn} onClick={onClose}>
        Fechar
      </button>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Sidebar;
