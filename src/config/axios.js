import axios from "axios";

const instance = axios.create({
  baseURL: process.env.PUBLIC_API_BASE_URL,
});

export default instance;
