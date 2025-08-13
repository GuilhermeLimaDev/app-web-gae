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
  return http.get(`employee-problems/employee/${id}`);
};

const ProblemService = {
  getProblems,
  getProblemsById,
  getPhotosOfProblem,
  getProblemsOfEmployee,
};

export default ProblemService;
