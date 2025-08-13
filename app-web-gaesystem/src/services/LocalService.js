import http from "../connection/Connection";
const route = "local"; //producao
const teste = "locais.json"; //desenvolvimento com lista local

const getLocais = () => {
  return http.get(route);
};

const LocalService = { getLocais };

export default LocalService;
