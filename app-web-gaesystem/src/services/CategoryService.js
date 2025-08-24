import http from "../connection/Connection";
const route = "category"; //producao
const teste = "categorias.json"; //desenvolvimento com lista local

const getCategorys = () => {
  return http.get(route);
};
const create = (form) => {
  return http.post(route, form);
};

const CategoryService = { getCategorys, create };

export default CategoryService;
