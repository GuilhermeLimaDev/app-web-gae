import http from "../connection/Connection";
const route = "problems"; //producao
const teste = "problemas.json"; //desenvolvimento com lista local

const getProblems = () => {
  return http.get(teste);
};

const getProblemsById = (id) => {
  return http.get(`${teste}/${id}`);
};

const getPhotosOfProblem = (id) => {
  return http.get(`${route}/photos/${id}`);
};

const ProblemService = { getProblems, getProblemsById, getPhotosOfProblem };
export default ProblemService;
