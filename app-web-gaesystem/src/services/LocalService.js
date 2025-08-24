import http from "../connection/Connection";
const route = "local"; //producao
const teste = "locais.json"; //desenvolvimento com lista local

const getLocais = () => {
  return http.get(route);
};

const create = (form) => {
  return http.post(route, form);
};

const LocalService = { getLocais, create };

export default LocalService;
