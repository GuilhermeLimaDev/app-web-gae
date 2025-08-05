import axios from "axios";

const URL = "localhost:8080/";
const teste = "../../../public/";

const connection = axios.create({
  // baseURL: teste,
});

export default connection;
