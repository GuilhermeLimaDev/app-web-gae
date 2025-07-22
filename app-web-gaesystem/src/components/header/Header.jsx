import styles from './Header.module.css'

const Header = ({ title }) => {
    return (
        <header className={styles.headerContent}>
            <h1>{title}</h1>
        </header>
    )
}

export default Header