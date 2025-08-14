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
          await ProblemService.getProblemsOfEmployee(1);

        setGeralProblems(receiverGeralProblems.data);
        setAssignmentsProblems(receiverAssignmentsProblems.data);
      } catch (e) {
        console.error("Erro ao puxar dados: " + e);
      }
    };

    fetchData();
  }, []);

  console.log("usuario", user);
  console.log(assignmentsProblems);
  console.log(geralProblems);
  return (
    <main>
      <h1>Olá, </h1>
      <section>
        <h1>Insights</h1>
      </section>
      <section>
        <div>
          <ReportCarousel
            reports={geralProblems}
            title={<Link to={"/reports"}>Ultimos problemas reportados</Link>}
          />
        </div>
      </section>
      <section>
        <div>
          <ReportCarousel
            reports={assignmentsProblems}
            title={"Problemas atribuídos a você"}
          />
        </div>
      </section>
    </main>
  );
};

export default Homepage;
