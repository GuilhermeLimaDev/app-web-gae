import { useEffect, useState } from "react";
import userService from "../../../services/UserService";
import styles from "./UserManagement.module.css";
import SearchBar from "../../../components/search/SearchBar";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    type: "ALUNO",
    active: false,
  });
  const [editing, setEditing] = useState(null);

  const [filterType, setFilterType] = useState("");
  const [filterActive, setFilterActive] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadUsers();
  }, [filterType, filterActive]);

  // Carrega usuários com filtros
  const loadUsers = async () => {
    try {
      const filters = {};
      if (filterType) filters.type = filterType;
      if (filterActive !== "") filters.active = filterActive === "true";
      const res = await userService.getAll(filters);
      setUsers(res.data);
    } catch (err) {
      console.error("Erro ao carregar usuários", err);
    }
  };

  // Busca por ID usando backend
  const handleSearch = async (id) => {
    if (!id) {
      loadUsers();
      return;
    }
    try {
      const res = await userService.getById(id);
      setUsers([res.data]);
    } catch (err) {
      console.error("Usuário não encontrado", err);
      setUsers([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await userService.update(form.id, form);
      } else {
        await userService.create(form);
      }
      resetForm();
      loadUsers();
    } catch (err) {
      console.error("Erro ao salvar usuário", err);
    }
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditing(user.id);
  };

  const handleDeactivate = async (id) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    if (!window.confirm(`Deseja desativar o usuário ${user.name}?`)) return;

    try {
      await userService.desatived(id); // usa o método do backend
      loadUsers(); // recarrega a lista
    } catch (err) {
      console.error("Erro ao desativar usuário", err);
    }
  };

  const resetForm = () => {
    setForm({
      id: "",
      name: "",
      email: "",
      password: "",
      type: "ALUNO",
      active: false,
    });
    setEditing(null);
  };

  return (
    <div className={styles.container}>
      <h2>Gerenciar Usuários</h2>

      {/* Filtros e Search */}
      <div className={styles.filters}>
        <div className={styles["filter-controls"]}>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Todos os tipos</option>
            <option value="ALUNO">Aluno</option>
            <option value="FUNCIONARIO">Funcionário</option>
            <option value="COORDENADOR">Coordenador</option>
          </select>

          <select
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="true">Ativos</option>
            <option value="false">Inativos</option>
          </select>

          <button type="button" onClick={loadUsers}>
            Filtrar
          </button>
        </div>

        <div className={styles["search-bar-wrapper"]}>
          <SearchBar
            placeholder="Procure o usuário pelo ID/RM dele"
            onSearch={handleSearch}
          />
        </div>
      </div>

      {/* Formulário */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="number"
          name="id"
          placeholder="ID"
          value={form.id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          required={!editing}
        />
        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="ALUNO">Aluno</option>
          <option value="FUNCIONARIO">Funcionário</option>
          <option value="COORDENADOR">Coordenador</option>
        </select>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={handleChange}
          />
          Ativo
        </label>
        <button type="submit">{editing ? "Atualizar" : "Cadastrar"}</button>
        {editing && (
          <button type="button" onClick={resetForm} className={styles.cancel}>
            Cancelar
          </button>
        )}
      </form>

      {/* Tabela */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.length ? (
            users.map((u) => (
              <tr key={u.id} className={!u.active ? styles.inactive : ""}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.type}</td>
                <td>{u.active ? "Sim" : "Não"}</td>
                <td>
                  <button onClick={() => handleEdit(u)}>Editar</button>
                  {u.active && (
                    <button
                      className={styles.delete}
                      onClick={() => handleDeactivate(u.id)}
                    >
                      Desativar
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Nenhum usuário encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
