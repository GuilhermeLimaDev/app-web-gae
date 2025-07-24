import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useState } from "react";

const Header = () => {
  const [url, setUrl] = useState();
  return (
    <header className={styles.headerContent}>
      <Link
        to={"/homepage"}
        className={url == "homepage" ? styles.selecionado : styles.button}
        onClick={() => setUrl("homepage")}
      >
        Homepage
      </Link>

      <Link
        to={"/reports"}
        className={url == "reports" ? styles.selecionado : styles.button}
        onClick={() => setUrl("reports")}
      >
        Reports
      </Link>

      <Link
        to={"/admin"}
        className={url == "admin" ? styles.selecionado : styles.button}
        onClick={() => setUrl("admin")}
      >
        Painel Admin
      </Link>
    </header>
  );
};

export default Header;
