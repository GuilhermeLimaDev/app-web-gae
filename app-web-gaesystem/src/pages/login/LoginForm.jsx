import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext"; // Importando o hook useUser

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useUser(); // Usando o hook useUser para acessar login
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Por favor, preencha todos os campos.");
    } else {
      setErrorMessage("");
      alert("Login realizado com sucesso!");
      navigate("/homepage");
      const newUser = {
        name: username,
        password: password,
        type: "ALUNO",
        id: 3,
      };
      login(newUser);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <form onSubmit={handleSubmit} method="post">
          <div className={styles.formGroup}>
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
