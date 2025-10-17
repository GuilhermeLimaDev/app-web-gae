import React, { useState, useEffect } from "react";
import styles from "./UserAssignment.module.css";
import UserService from "../../services/UserService";
import ProblemService from "../../services/ProblemsService";

const UserAssignment = ({ id, user }) => {
  const [availableUsers, setAvailableUsers] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  // Carrega usuários disponíveis (funcionário ou coordenador)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await UserService.getAll();
        const users = (res.data || []).filter(
          (u) => u.type === "FUNCIONARIO" || u.type === "COORDENADOR"
        );
        setAvailableUsers(users);
      } catch (error) {
        console.error("Erro ao carregar usuários disponíveis:", error);
      }
    };
    fetchUsers();
  }, [id]);

  // Carrega usuários já atribuídos ao problema
  const fetchAssigned = async () => {
    try {
      const res = await ProblemService.getAssignedUsers(id);
      console.log("Usuários atribuídos recebidos:", res.data);
      setAssignedUsers(res.data);
    } catch (err) {
      console.error("Erro ao carregar usuários atribuídos:", err);
    }
  };

  useEffect(() => {
    fetchAssigned();
  }, [id]);

  // Atribuir usuário
  const handleAssign = async () => {
    if (!selectedUserId) return;

    const selectedIdNum = Number(selectedUserId);
    const userToAssign = availableUsers.find((u) => u.id === selectedIdNum);
    if (!userToAssign) return;
    if (assignedUsers.some((u) => u.id === selectedIdNum)) {
      setSelectedUserId("");
      return;
    }

    const payload = {
      problem_id: Number(id),
      employee_id: Number(user),
      attributed_id: selectedIdNum,
      userRole: "RESPONSAVEL",
    };

    try {
      await ProblemService.AtribuirFuncionario(payload);
      await fetchAssigned(); // Atualiza a lista do backend
      setSelectedUserId("");
    } catch (error) {
      console.error("Erro ao atribuir usuário:", error);
      alert(
        `Falha ao atribuir: ${error?.response?.status || ""} - ${JSON.stringify(
          error?.response?.data || error?.message
        )}`
      );
    }
  };

  // Remover usuário
  const handleRemove = async (employeeId) => {
    try {
      await ProblemService.remove(id, employeeId);
      setAssignedUsers((prev) => prev.filter((u) => u.id !== employeeId));
    } catch (error) {
      console.error("Erro ao remover usuário:", error);
      alert(
        `Falha ao remover: ${error?.response?.status || ""} - ${JSON.stringify(
          error?.response?.data || error?.message
        )}`
      );
    }
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
            {availableUsers.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.type})
              </option>
            ))}
          </select>

          <button
            onClick={handleAssign}
            className={styles.assignButton}
            disabled={!selectedUserId}
            title={!selectedUserId ? "Selecione um usuário" : "Atribuir"}
          >
            Atribuir
          </button>
        </div>
      </section>

      <section className={styles.listSection}>
        <h2>Usuários Atribuídos</h2>
       <ul className={styles.userList}>
  {assignedUsers.map((u) => (
    <li key={u.employeeId} className={styles.userItem}>
      <span>
        {u.employeeName} ({u.userRole})
      </span>
      <button
        onClick={() => handleRemove(u.employeeId)}
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
