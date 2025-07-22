import styles from './Problems.module.css'
import seta from '../../assets/seta-direita.png'

const Problem = ({ category, local, student, status }) => {
    return (
        <div className={styles.card}>
            <div className={styles.informations}>
                <h2>{category}</h2>
                <h3>{local}</h3>
                <h4>{student}</h4>
                <p>Status: {status}</p>
            </div>
            <button className={styles.nav}
                onClick={() => alert("clicou")}
            ><img src={seta} /></button>

        </div>
    )
}

export default Problem