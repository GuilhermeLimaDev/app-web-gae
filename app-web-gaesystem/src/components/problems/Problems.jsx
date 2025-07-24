import styles from "./Problems.module.css";
import seta from "../../assets/seta-direita.png";
import { useNavigate } from "react-router-dom";

const Problem = ({ category, local, student, status, id }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.card}>
      <div className={styles.informations}>
        <h2>{category}</h2>
        <h3>{local}</h3>
        <h4>{student}</h4>
        <p>Status: {status}</p>
      </div>
      <button className={styles.nav} onClick={() => navigate(`details/${id}`)}>
        <img src={seta} />
      </button>
    </div>
  );
};

export default Problem;
