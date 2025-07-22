import { Link } from 'react-router-dom'
import styles from './Sidebar.module.css'

const Sidebar = ({ name }) => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.informations}>
                <p>Seja bem vindo</p>
                <h1>{name}</h1>
            </div>
            <nav>
                <ul className={styles.ul}>
                    <li className={styles.li}><Link to={'/homepage'} className={styles.link}>Homepage</Link></li>
                    <li className={styles.li}><Link to={'/reports'} className={styles.link}>Reports</Link></li>
                    <li className={styles.li}><Link to={'/admin'} className={styles.link}>Painel Admin</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar