import http from "../connection/Connection";
const route = "local"; //producao
const teste = "locais.json"; //desenvolvimento com lista local

const getLocais = () => {
  return http.get(teste);
};

const LocalService = { getLocais };

export default LocalService;
