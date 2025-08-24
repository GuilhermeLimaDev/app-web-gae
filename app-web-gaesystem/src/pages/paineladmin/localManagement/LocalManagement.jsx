import { useState, useEffect } from "react";
import styles from "./LocalManagement.module.css";
import localService from "../../../services/LocalService";
export default function LocalManagement() {
  const [locals, setLocals] = useState([]);
  const [form, setForm] = useState({
    name: "",
  });

  // Carregar locais
  useEffect(() => {
    loadLocals();
  }, []);

  const loadLocals = async () => {
    try {
      const res = await localService.getLocais();
      setLocals(res.data);
    } catch (err) {
      console.error("Erro ao carregar locais", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await localService.create(form);
      setForm({ name: "" });
      loadLocals();
    } catch (err) {
      console.error("Erro ao criar local", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Gerenciar Locais</h2>

      {/* Formulário */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome do local"
          value={form.name}
          onChange={handleChange}
          required
        />
        <button type="submit">Criar Local</button>
      </form>

      {/* Tabela de locais */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {locals.length ? (
            locals.map((loc) => (
              <tr key={loc.id}>
                <td>{loc.id}</td>
                <td>{loc.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Nenhum local cadastrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
