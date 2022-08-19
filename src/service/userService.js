import { api } from "../config/axios.js";

async function getUser() {
  const users = await api.get("/users");

  return users.data;
}

async function getUserById(id) {
  const users = await api.get(`/users/${id}`);

  return users.data;
}

async function createUser(name, profession, email, password) {
  const user = await api.post("/users", {
    name,
    profession,
    email,
    password,
  });

  return user.data;
}

async function updateUser(id, name, profession, email, password) {
  const user = await api.put(`/users/${id}`, {
    name,
    profession,
    email,
    password,
  });
  return user.data;
}

export { getUser, getUserById, createUser, updateUser };
