import { api } from "../config/axios";

async function getPosts() {
  const posts = await api.get("/post");
  return posts.data;
}
async function getPostById(id) {
  const post = await api.get(`/post/${id}`);
  return post.data;
}

async function updatePost(id, content, userId) {
  const post = await api.put(`/post/${id}`, {
    content,
    userId,
  });

  return post;
}

async function deletePost(id) {
  return await api.delete(`/post/${id}`);
}

async function createPost(content, userId) {
  const posts = await api.post("/post", {
    content,
    userId,
  });
  return posts.data;
}
export { getPosts, createPost, getPostById, updatePost, deletePost };
