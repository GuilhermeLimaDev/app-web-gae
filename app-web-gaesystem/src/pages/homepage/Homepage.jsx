import styles from "./Homepage.module.css";
import ReportCarousel from "../../components/carrossel/Carrossel";
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import ProblemService from "../../services/ProblemsService";
import { Link } from "react-router-dom";

const Homepage = () => {
  const { user } = useUser();
  const [geralProblems, setGeralProblems] = useState([]);
  const [assignmentsProblems, setAssignmentsProblems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const receiverGeralProblems = await ProblemService.getProblems();
        const receiverAssignmentsProblems =
          await ProblemService.getProblemsOfEmployee(user.id);

        setGeralProblems(receiverGeralProblems.data);
        setAssignmentsProblems(receiverAssignmentsProblems.data);
      } catch (e) {
        console.error("Erro ao puxar dados: " + e);
      }
    };

    fetchData();
  }, [user.id]);

  return (
    <main className={styles.main}>
      <h1 className={styles.greeting}>Olá, {user.name} - {user.type}</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Insights</h2>
        <div className={styles.insightsContainer}>
          <div className={styles.insightCard}>
            <h3 className={styles.insightNumber}>13</h3>
            <p className={styles.insightText}>Problemas feitos nas últimas 24 horas</p>
          </div>
          <div className={styles.insightCard}>
            <h3 className={styles.insightNumber}>1020</h3>
            <p className={styles.insightText}>Problemas reportados</p>
          </div>
          <div className={styles.insightCard}>
            <h3 className={styles.insightNumber}>203</h3>
            <p className={styles.insightText}>Problemas em aberto</p>
          </div>
          <div className={styles.insightCard}>
            <h3 className={styles.insightNumber}>93</h3>
            <p className={styles.insightText}>Problemas resolvidos</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <ReportCarousel
          reports={geralProblems}
          title={<Link to={"/reports"} className={styles.carouselLink}>Últimos problemas reportados</Link>}
        />
      </section>

      <section className={styles.section}>
        <ReportCarousel
          reports={assignmentsProblems}
          title={<span className={styles.carouselLink}>Problemas atribuídos a você</span>}
        />
      </section>
    </main>
  );
};

export default Homepage;
