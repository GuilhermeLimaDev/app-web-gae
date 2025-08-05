import ReportFilters from "../../components/filters/ReportFilters";
import Header from "../../components/header/Header";
import Problem from "../../components/problems/Problems";
import styles from "./Reports.module.css";
const Reports = () => {
  const handleFiltrar = () => {
    alert("clicou e filtrou");
  };

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
