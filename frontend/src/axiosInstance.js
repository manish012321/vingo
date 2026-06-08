import axios from "axios";
import { serverUrl } from "./config";

const api = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

export default api;