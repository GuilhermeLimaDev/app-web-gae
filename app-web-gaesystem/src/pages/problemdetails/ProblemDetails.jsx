import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProblemService from "../../services/ProblemsService";
import Sidebar from "../../components/sidebar/Sidebar.jsx"; // 👈 importa aqui
import styles from "./ProblemDetails.module.css";
import SenderMessage from "../sendmessage/SenderMessage.jsx";

const ProblemDetails = () => {
  const params = useParams();
  const id = params.id;

  const [images, setImages] = useState({ photosUrl: [] });
  const [imageSelected, setImageSelected] = useState();
  const [data, setData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); // 👈 novo estado

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
  }, []);

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
          <h4>{data.status}</h4>
          <p>{data.description}</p>
        </div>
      </section>

      <section className={styles.actions}>
        <button>Atribuir Funcionário</button>
        <button onClick={() => setSidebarOpen(true)}>Enviar Mensagem</button>
        <button>Resolver Problema</button>
      </section>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <SenderMessage />
      </Sidebar>
    </main>
  );
};

export default ProblemDetails;
