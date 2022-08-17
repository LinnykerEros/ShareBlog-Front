import { api } from "../config/axios";

async function getPosts() {
  const posts = await api.get("/post");
  return posts.data;
}

async function createPost(content, userId) {
  const posts = await api.post("/post", {
    content,
    userId,
  });
  return posts.data;
}
export { getPosts, createPost };
