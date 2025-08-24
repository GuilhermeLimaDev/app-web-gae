import React, { useState } from "react";
import styles from "./UserAssignment.module.css";

const UserAssignment = ({ id, user }) => {
  const availableUsers = [
    { id: 1, name: "João Silva" },
    { id: 2, name: "Maria Oliveira" },
    { id: 3, name: "Carlos Souza" },
    { id: 4, name: "Ana Paula" },
  ];

  const [selectedUserId, setSelectedUserId] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);

  const handleAssign = () => {
    const userToAssign = availableUsers.find(
      (u) => u.id === parseInt(selectedUserId)
    );
    if (userToAssign && !assignedUsers.some((u) => u.id === userToAssign.id)) {
      setAssignedUsers((prev) => [...prev, userToAssign]);
    }
    setSelectedUserId("");
  };

  const handleRemove = (id) => {
    setAssignedUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className={styles.container}>
      <section className={styles.assignmentSection}>
        <h2>Atribuir Usuário</h2>
        <div className={styles.inputGroup}>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className={styles.select}
          >
            <option value="">Selecione um usuário</option>
            {availableUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button onClick={handleAssign} className={styles.assignButton}>
            Atribuir
          </button>
        </div>
      </section>

      <section className={styles.listSection}>
        <h2>Usuários Atribuídos</h2>
        <ul className={styles.userList}>
          {assignedUsers.map((user) => (
            <li key={user.id} className={styles.userItem}>
              <span>{user.name}</span>
              <button
                onClick={() => handleRemove(user.id)}
                className={styles.removeButton}
              >
                Remover
              </button>
            </li>
          ))}
          {assignedUsers.length === 0 && (
            <p className={styles.emptyText}>Nenhum usuário atribuído.</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default UserAssignment;
