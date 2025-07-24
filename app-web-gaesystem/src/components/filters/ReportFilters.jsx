import React, { useState } from "react";
import styles from "./ReportFilters.module.css";
const ReportFilters = ({ categorias, locais, filtrar }) => {
  const [categoria, setCategoria] = useState("");
  const [local, setLocal] = useState("");
  const [status, setStatus] = useState("");

  const aplicarFiltros = () => {
    filtrar({ categoria, local, status });
  };

  const limparFiltros = () => {
    setCategoria("");
    setLocal("");
    setStatus("");
    filtrar({});
  };

  return (
    <div className={styles.content}>
      <div>
        <label>Categoria:</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Todas as Categorias</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Local:</label>
        <select value={local} onChange={(e) => setLocal(e.target.value)}>
          <option value="">Todos os Locais</option>
          {locais.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Todos os Status</option>
          <option value="aberto">Aberto</option>
          <option value="em_analise">Em Analise</option>
          <option value="resolvido">Resolvido</option>
        </select>
      </div>

      <div className={styles.buttons}>
        <button className={styles.buttonA} onClick={aplicarFiltros}>
          Aplicar Filtros
        </button>
        <button className={styles.buttonB} onClick={limparFiltros}>
          Limpar Filtros
        </button>
      </div>
    </div>
  );
};

export default ReportFilters;
