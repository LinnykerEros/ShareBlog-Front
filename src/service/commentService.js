import { api } from "../config/axios";

async function getComments() {
  const comments = await api.get("/comment");

  return comments.data;
}

async function deleteComment(id) {
  return await api.delete(`/comment/${id}`);
}

async function createComment(content, userId, postId) {
  console.log(content, userId, postId);
  const comment = await api.post("/comment", {
    content,
    userId,
    postId,
  });
  return comment.data;
}

export { getComments, createComment, deleteComment };
