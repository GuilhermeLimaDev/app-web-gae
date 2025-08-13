import { useEffect, useState } from "react";
import ReportFilters from "../../components/filters/ReportFilters";
import Problem from "../../components/problems/Problems";
import styles from "./Reports.module.css";
import problemService from "../../services/ProblemsService.js";
import CategoryService from "../../services/CategoryService.js";
import LocalService from "../../services/LocalService.js";
const Reports = () => {
  const handleFiltrar = ({ categoria, local, status }) => {
    console.log(categoria, local, status);
  };

  const [categorias, setCategorias] = useState([]);
  const [locais, setLocais] = useState([]);
  const [problemasTeste, setProblemas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const problemas = await problemService.getProblems();
        const categorias = await CategoryService.getCategorys();
        const locais = await LocalService.getLocais();

        setProblemas(problemas.data);
        setCategorias(categorias.data);
        setLocais(locais.data);
      } catch (e) {
        console.error("Erro ao buscar dados:", e);
      }
    };

    fetchData();
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
