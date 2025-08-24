import { useState, useEffect } from "react";
import categoryService from "../../../services/CategoryService";
import styles from "./CategoryManagement.module.css";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
  });

  // Carregar categorias
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await categoryService.getCategorys();
      setCategories(res.data);
    } catch (err) {
      console.error("Erro ao carregar categorias", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await categoryService.create(form);
      setForm({ name: "" });
      loadCategories();
    } catch (err) {
      console.error("Erro ao criar categoria", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Gerenciar Categorias</h2>

      {/* Formulário */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome da categoria"
          value={form.name}
          onChange={handleChange}
          required
        />
        <button type="submit">Criar Categoria</button>
      </form>

      {/* Tabela de categorias */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {categories.length ? (
            categories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Nenhuma categoria cadastrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
