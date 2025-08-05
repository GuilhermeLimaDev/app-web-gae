import http from "../connection/Connection";
const route = "problems"; //producao
const teste = "problemas.json"; //desenvolvimento com lista local

const getProblems = () => {
  return http.get(teste);
};

const ProblemService = { getProblems };
export default ProblemService;
