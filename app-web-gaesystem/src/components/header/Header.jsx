import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useState } from "react";
import { useUser } from "../../context/UserContext";

const Header = () => {
  const [url, setUrl] = useState();
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <header className={styles.headerContent}>
      <div>
        <label>Bem vindo, {user.name}</label>
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
      </div>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Sair
      </button>
    </header>
  );
};

export default Header;
