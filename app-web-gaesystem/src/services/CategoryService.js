import http from "../connection/Connection";
const route = "category"; //producao
const teste = "categorias.json"; //desenvolvimento com lista local

const getCategorys = () => {
  return http.get(route);
};

const CategoryService = { getCategorys };

export default CategoryService;
