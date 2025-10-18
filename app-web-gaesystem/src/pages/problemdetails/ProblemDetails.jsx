import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProblemService from "../../services/ProblemsService";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import styles from "./ProblemDetails.module.css";
import SenderMessage from "../sendmessage/SenderMessage.jsx";
import UserAssignment from "../assignUser/AssignUser.jsx";
import { useUser } from "../../context/UserContext.jsx";

const ProblemDetails = () => {
  const params = useParams();
  const id = params.id;

  const [images, setImages] = useState({ photosUrl: [] });
  const [imageSelected, setImageSelected] = useState();
  const [data, setData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSidebarContent, setActiveSidebarContent] = useState(null); 
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const receiverData = await ProblemService.getProblemsById(id);
        const receiverImage = await ProblemService.getPhotosOfProblem(id);

        setData(receiverData.data);
        setImages(receiverImage.data);
        if (receiverImage.data.photosUrl.length > 0) {
          setImageSelected(receiverImage.data.photosUrl[0]);
        }
      } catch (e) {
        console.error("Erro ao puxar dados: " + e);
      }
    };

    fetchData();
  }, [id]);

  const openSidebarWith = (contentType) => {
    setActiveSidebarContent(contentType);
    setSidebarOpen(true);
  };

  // 🔧 Função para mudar o status do problema
  const changeStatus = async (newStatus) => {
    try {
      const response = await fetch(
        `https://restapi.santosdev.site/problemas/changestatus/${id}/${newStatus}`,
        {
          method: "PUT", // ou "POST" se seu backend usar isso
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao mudar o status");
      }

      // Atualiza o status localmente sem precisar recarregar
      setData((prevData) => ({ ...prevData, status: newStatus }));

      alert(`Status alterado para: ${newStatus.replace("_", " ")}`);
    } catch (error) {
      console.error("Erro:", error);
      alert("Falha ao mudar status do problema.");
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.informations}>
        <div className={styles.showcaseImages}>
          <img src={imageSelected} className={styles.imageSelect} />

          <div className={styles.listImages}>
            {images.photosUrl.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Foto ${index}`}
                onClick={() => setImageSelected(url)}
                className={
                  url === imageSelected ? styles.selected : styles.notSelected
                }
              />
            ))}
          </div>
        </div>
        <div className={styles.infos}>
          <h2>{data.category}</h2>
          <h3>{data.local}</h3>
          <h4>
            {data.student} - {data.student_id}
          </h4>
          <h4>Status: {data.status}</h4>
          <p>{data.description}</p>
        </div>
      </section>

      <section className={styles.actions}>
        <button onClick={() => openSidebarWith("message")}>
          Enviar Mensagem
        </button>

        {/* 🔘 Botões de ação de status */}
        <button onClick={() => changeStatus("resolvido")}>
          Resolver Problema
        </button>
        <button onClick={() => changeStatus("em_analise")}>
          Mudar Status para Análise
        </button>
      </section>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        {activeSidebarContent === "message" && <SenderMessage id={data.id} />}
        {activeSidebarContent === "assign" && (
          <UserAssignment id={data.id} user={user.id} />
        )}
      </Sidebar>
    </main>
  );
};

export default ProblemDetails;
