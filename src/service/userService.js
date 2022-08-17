import { api } from "../config/axios.js";

async function getUser() {
  const users = await api.get("/users");

  return users.data;
}

export { getUser };
