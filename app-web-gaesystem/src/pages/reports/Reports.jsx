import { useEffect, useState } from "react";
import ReportFilters from "../../components/filters/ReportFilters";
import Problem from "../../components/problems/Problems";
import styles from "./Reports.module.css";
import problemService from "../../services/ProblemsService.js";
import CategoryService from "../../services/CategoryService.js";
import LocalService from "../../services/LocalService.js";
import SearchBar from "../../components/search/SearchBar";

const Reports = () => {
  const handleFiltrar = ({ categoria, local, status }) => {
    console.log(categoria, local, status);
  };
  const handleSearch = (value) => {};

  const [categorias, setCategorias] = useState([]);
  const [locais, setLocais] = useState([]);
  const [problemasTeste, setProblemas] = useState([]);

  // Busca inicial de categorias, locais e problemas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [problemasRes, categoriasRes, locaisRes] = await Promise.all([
          problemService.getProblems(),
          CategoryService.getCategorys(),
          LocalService.getLocais(),
        ]);

        setProblemas(problemasRes.data);
        setCategorias(categoriasRes.data);
        setLocais(locaisRes.data);
      } catch (e) {
        console.error("Erro ao buscar dados:", e);
      }
    };

    fetchData();
  }, []);

  // Polling: busca todos os problemas a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await problemService.getProblems();
        setProblemas(res.data); // atualiza toda a lista
      } catch (e) {
        console.error("Erro no polling:", e);
      }
    }, 5000); // 5 segundos

    return () => clearInterval(interval); // limpa o intervalo ao desmontar
  }, []);

  console.log(problemasTeste);
  console.log(categorias);

  return (
    <div className={styles.content}>
      <ReportFilters
        categorias={categorias}
        locais={locais}
        filtrar={handleFiltrar}
      />
      <div className={styles.searchBar}>
        <SearchBar
          placeholder="Buscar problemas pelo RM/ID do Usuário"
          onSearch={handleSearch}
        />
      </div>

      <section className={styles.problem}>
        {problemasTeste.map((p) => (
          <Problem
            category={p.category}
            local={p.local}
            student={p.student}
            status={p.status}
            key={p.id}
            id={p.id}
          />
        ))}
      </section>
    </div>
  );
};

export default Reports;
