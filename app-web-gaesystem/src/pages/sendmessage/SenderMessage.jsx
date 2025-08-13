import { useEffect, useState } from "react";
import MessageService from "../../services/MessageService";
import styles from "./SenderMessage.module.css";

const SenderMessage = ({ id }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const receiverMessage = await MessageService.getMessagesOfProblem(id);
        setMessages(receiverMessage.data);
      } catch (error) {
        console.error("Erro ao pegar os dados: ", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className={styles.container}>
      <section className={styles.sendSection}>
        <h3 className={styles.sectionTitle}>Enviar Mensagem</h3>
        <textarea
          rows="6"
          placeholder="Digite sua mensagem aqui..."
          className={styles.textarea}
        />
        <button className={styles.button}>Enviar</button>
      </section>

      <section className={styles.messageSection}>
        <h3 className={styles.sectionTitle}>Últimas Mensagens</h3>
        <div className={styles.messageList}>
          <div className={styles.messageItem}>
            <h4 className={styles.messageSender}>Antonio Carlos</h4>
            <p className={styles.messageText}>
              Seu problema foi recebido e em breve entraremos em contato.
            </p>
          </div>
          <div className={styles.messageItem}>
            <h4 className={styles.messageSender}>Antonio Carlos</h4>
            <p className={styles.messageText}>
              Seu problema foi recebido e em breve entraremos em contato.
            </p>
          </div>
          <div className={styles.messageItem}>
            <h4 className={styles.messageSender}>Antonio Carlos</h4>
            <p className={styles.messageText}>
              Seu problema foi recebido e em breve entraremos em contato.
            </p>
          </div>
          <div className={styles.messageItem}>
            <h4 className={styles.messageSender}>Antonio Carlos</h4>
            <p className={styles.messageText}>
              Seu problema foi recebido e em breve entraremos em contato.
            </p>
          </div>
          <div className={styles.messageItem}>
            <h4 className={styles.messageSender}>Antonio Carlos</h4>
            <p className={styles.messageText}>
              Seu problema foi recebido e em breve entraremos em contato.
            </p>
          </div>
          <div className={styles.messageItem}>
            <h4 className={styles.messageSender}>Antonio Carlos</h4>
            <p className={styles.messageText}>
              Seu problema foi recebido e em breve entraremos em contato.
            </p>
          </div>
          <div className={styles.messageItem}>
            <h4 className={styles.messageSender}>Antonio Carlos</h4>
            <p className={styles.messageText}>
              Seu problema foi recebido e em breve entraremos em contato.
            </p>
          </div>
          <div className={styles.messageItem}>
            <h4 className={styles.messageSender}>Antonio Carlos</h4>
            <p className={styles.messageText}>
              Seu problema foi recebido e em breve entraremos em contato.
            </p>
          </div>
          <div className={styles.messageItem}>
            <h4 className={styles.messageSender}>Antonio Carlos</h4>
            <p className={styles.messageText}>
              Seu problema foi recebido e em breve entraremos em contato.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SenderMessage;
