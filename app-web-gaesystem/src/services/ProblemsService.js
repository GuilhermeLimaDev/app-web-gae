import http from "../connection/Connection";
const route = "problemas"; //producao
const teste = "problemas.json"; //desenvolvimento com lista local

const getProblems = () => {
  return http.get(route);
};

const getProblemsById = (id) => {
  return http.get(`${route}/${id}`);
};

const getPhotosOfProblem = (id) => {
  return http.get(`${route}/photos/${id}`);
};

const getProblemsOfEmployee = (id) => {
  return http.get(`employeeproblem/employee/${id}`);
};
const AtribuirFuncionario = (form) => {
  return http.post("employeeproblem", form); 
}

const getAssignedUsers = (problemId) => {
  return http.get(`employeeproblem/problem/${problemId}`);
}

const remove = (problemId, employeeId) => {
    const form = {
      problemId: Number(problemId),
      employeeId: Number(employeeId),
      attributedId: 0, // ou null se não for usado no backend
      userRole: "RESPONSAVEL", // mantém o enum
    };
    console.log(form)
    console.log(http.getUri())
    return http.delete  ("employee-problem/remove", {data: form});
  }

const ProblemService = {
  getProblems,
  getProblemsById,
  getPhotosOfProblem,
  getProblemsOfEmployee,
  getAssignedUsers,
  AtribuirFuncionario,
  remove
};

export default ProblemService;
