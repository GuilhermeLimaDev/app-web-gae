import http from "../connection/Connection";

const route = "user";

const login = (data) => {
  return http.post(`${route}/login`, data);
};

const getAll = (filters) => {
  return http.get(route, { params: filters });
};

const getById = (id) => {
  return http.get(`${route}/${id}`);
};

const update = (formId, form) => {
  return http.put(`${route}/update/${formId}`, form);
};

const desatived = (id) => {
  return http.patch(`${route}/desatived/${id}`);
};

const create = (form) => {
  return http.post(route, form);
};

const UserService = { login, getAll, getById, update, desatived, create };

export default UserService;
///implementar logica depois
