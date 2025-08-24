import axios from "axios";

const URL = "https://restapi.santosdev.site/";
const teste = "../../../public/";
const testBase = "http://localhost:8080/";

const connection = axios.create({
  baseURL: URL,
});

console.log("Conexão", connection());

export default connection;
