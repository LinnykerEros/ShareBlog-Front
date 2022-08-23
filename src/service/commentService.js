import { api } from "../config/axios";

async function getComments() {
  const comments = await api.get("/comment");

  return comments.data;
}

async function deleteComment(id) {
  return await api.delete(`/comment/${id}`);
}

async function updateComment(id, content, userId, postId) {
  const comment = await api.put(`/comment/${id}`, {
    content,
    userId,
    postId,
  });

  return comment.data;
}

async function createComment(content, userId, postId) {
  const comment = await api.post("/comment", {
    content,
    userId,
    postId,
  });
  return comment.data;
}

export { getComments, createComment, deleteComment, updateComment };
