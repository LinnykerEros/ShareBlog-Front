import { Avatar } from "./Avatar";
import styles from "../styles/Post.module.css";
import { Comment } from "./Comment";
import moment from "moment";
import ptBR from "moment/locale/pt-br";
import { useEffect, useState } from "react";
import { getPosts } from "../service/postService";
import { createComment } from "../service/commentService";

export function Post() {
  const [comentario, setComentario] = useState("");
  const [postId, setPostId] = useState();
  const [comments, setComments] = useState(["Post muito bacana"]);
  const [posts, setPosts] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    (async () => {
      const post = await getPosts();
      setPosts(post);
    })();
  }, []);
  console.log(posts);
  const handleCreateNewComment = (e) => {
    e.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText("");
  };
  const handleNewCommentChange = (e) => {
    setNewCommentText(e.target.value);
  };

  const handleNewComment = (e) => {
    setComentario(e.target.value);
  };

  const handleSubmit = async (userId, postId) => {
    try {
      console.log(comentario, userId, postId);
      await createComment(comentario, userId, postId);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleNewCommentInvalid = (e) => {

  //   console.log(e.target.value);
  //   if(e.target.value)
  // };

  const deleteComment = (commentToDelete) => {
    //react nnunca altera uma informação, ele cria uma nova informação
    // e salva dentro do estado!
    const commentsWithoutDeleteOne = comments.filter((comment) => {
      return comment !== commentToDelete;
    });
    setComments(commentsWithoutDeleteOne);
  };

  const isNewCommentEmpty = comentario === "" ? true : false;

  return (
    <div>
      {posts.map((data) => {
        return (
          <article className={styles.post}>
            <header>
              <div className={styles.author}>
                <Avatar hasBorder />

                <div className={styles.authorInfo}>
                  <strong>{data.user.name}</strong>
                  <span>{data.user.profession}</span>
                </div>
              </div>

              <time
                title={moment(data.created_at).format("LLL")}
                dateTime={moment(data.created_at).format()}
              >
                {moment(data.created_at)
                  .startOf(data.created_at, {
                    locale: ptBR,
                  })
                  .fromNow()}
              </time>
            </header>
            <div className={styles.content}>{data.content}</div>

            <form
              onSubmit={handleCreateNewComment}
              className={styles.commentForm}
            >
              <strong>Deixe seu feedback!</strong>
              <textarea
                name="comment"
                placeholder="Deixe um comentário"
                value={comentario}
                onChange={handleNewComment}
                required
              />

              <footer>
                <button
                  type="submit"
                  disabled={isNewCommentEmpty}
                  onClick={() => handleSubmit(data.user.id, data.id)}
                >
                  Publicar
                </button>
              </footer>
            </form>

            <div className={styles.commentList}>
              {data.comment.map((data) => {
                return (
                  <Comment
                    key={data.id}
                    content={data.content}
                    onDeleteComment={deleteComment}
                  />
                );
              })}
            </div>
          </article>
        );
      })}
    </div>
  );
}
