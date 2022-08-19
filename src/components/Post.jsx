import styles from "../styles/Post.module.css";
import moment from "moment";
import ptBR from "moment/locale/pt-br";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import { useContext, useEffect, useState } from "react";
import { createComment } from "../service/commentService";
import { AuthContext } from "../contexts/AuthContext";
import { Pen } from "phosphor-react";
export function Post({
  postId,
  userId,
  userName,
  userProfession,
  content,
  comment,
  pusblishedAt,
  updatingState,
}) {
  const { user } = useContext(AuthContext);
  const [comentario, setComentario] = useState("");

  const [posts, setPosts] = useState([]);

  const handleNewComment = (e) => {
    setComentario(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComment(comentario, user?.id, postId);
      setComentario("");
      updatingState();
    } catch (err) {
      console.log(err);
    }
  };

  const isNewCommentEmpty = comentario === "" ? true : false;

  return (
    <article key={postId} className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder />

          <div className={styles.authorInfo}>
            <strong>{userName}</strong>
            <span>{userProfession}</span>
            <time
              className={styles.time}
              title={moment(pusblishedAt).format("LLL")}
              dateTime={moment(pusblishedAt).format()}
            >
              {moment(pusblishedAt)
                .startOf(pusblishedAt, {
                  locale: ptBR,
                })
                .fromNow()}
            </time>
          </div>
        </div>
        {user?.id == userId ? (
          <button className={styles.editButton} title="Editar publicação">
            <Pen size={24} />
          </button>
        ) : (
          ""
        )}
      </header>
      <div className={styles.content}>{content}</div>

      <form onSubmit={handleSubmit} className={styles.commentForm}>
        <strong>Deixe seu feedback!</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={comentario}
          onChange={handleNewComment}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comment?.map((data) => {
          return (
            <Comment
              key={data.id}
              postId={postId}
              id={data.id}
              userName={data.user.name}
              userId={data.user.id}
              publishedAt={data.created_at}
              content={data.content}
              updatingState={updatingState}
            />
          );
        })}
      </div>
    </article>
  );
}
