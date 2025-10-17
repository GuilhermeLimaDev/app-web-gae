import styles from './ErrorPage.module.css';

const ErrorPage = ({errorMessage}) => (
    <div className={styles.container}>
        <h1 className={styles.title}>Ops! Algo deu errado.</h1>
        <p className={styles.message}>
          <div>
            {errorMessage}
        </div>
        <button className={styles.backButton} onClick={() => window.history.back()}>
  Voltar
</button>

        </p>
    </div>
);

export default ErrorPage;