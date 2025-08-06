import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProblemService from "../../services/ProblemsService";

const ProblemDetails = () => {
  const params = useParams();
  const id = params.id;
  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState([]);
  const [assignments, setAssignments] = useState([]);

  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const receiverData = await ProblemService.getProblemsById(id);
        const receiverImage = await ProblemService.getPhotosOfProblem(id);
        const receiverMessage = await ProblemService.getMessagesOfProblem(id);
        const receiverAssignments =
          await ProblemService.getAssignmentsOfProblem(id);

        setData(receiverData);
        setImages(receiverImage);
      } catch (e) {
        console.error("Erro ao puxar dados: " + e);
      }
    };

    fetchData();
  }, []);
  */

  return (
    <main>
      <section>
        <div>imagens</div>
        <div>informações</div>
      </section>
      <section>acoes</section>
    </main>
  );
};

export default ProblemDetails;
