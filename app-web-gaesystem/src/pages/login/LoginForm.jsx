import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext"; 
import UserService from "../../services/UserService";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useUser(); 
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const UserDTO = {
      email: username,
      password: password,
    };

    if (!username || !password) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const receiverData = await UserService.login(UserDTO);
      if(receiverData.data.type != "ALUNO"){
        login(receiverData.data);
        navigate("/homepage");
      }
      else{
        setErrorMessage("Usuário do tipo ALUNO não pode fazer login na plataforma")
        return false
      }
    } catch (error) {
      console.error("Erro ao efetuar Login", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <form onSubmit={handleSubmit} method="post">
          <div className={styles.formGroup}>
            <label htmlFor="username">E-Mail</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="exemplo@fieb"
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
