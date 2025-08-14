import { useEffect, useState } from "react";
import MessageService from "../../services/MessageService";
import styles from "./SenderMessage.module.css";
import { useUser } from "../../context/UserContext";


const SenderMessage = ({ id }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const receiverMessage = await MessageService.getMessagesOfProblem(id);
        setMessages(receiverMessage.data);
      } catch (error) {
        console.error("Erro ao pegar as mensagens ", error);
      }
    };
    fetchData();
  }, [id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const messageData = {
        problem_id: id,
        message: newMessage,
        sender_id: user.id,
      };
      await MessageService.createMessage(messageData);
      setNewMessage("");
      const receiverMessage = await MessageService.getMessagesOfProblem(id);
      setMessages(receiverMessage.data);
    } catch (error) {
      console.error("Erro ao enviar mensagem", error);
      console.log(user)
    }
  };


  return (
    <div className={styles.container}>
      <section className={styles.sendSection}>
        <h3 className={styles.sectionTitle}>Enviar Mensagem</h3>
        <textarea
          rows="6"
          placeholder="Digite sua mensagem aqui..."
          className={styles.textarea}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className={styles.button} onClick={handleSendMessage}>Enviar</button>
      </section>

      <section className={styles.messageSection}>
        <h3 className={styles.sectionTitle}>Últimas Mensagens</h3>
        <div className={styles.messageList}>
          {messages.map((msg) => (
            <div key={msg.messageId} className={styles.messageItem}>
              <h4 className={styles.messageSender}>{msg.senderName}</h4>
              <p className={styles.messageText}>{msg.message}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SenderMessage;