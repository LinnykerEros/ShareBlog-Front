import { Avatar } from "./Avatar";
import styles from "../styles/Post.module.css";
import { Comment } from "./Comment";
import moment from "moment";
import ptBR from "moment/locale/pt-br";
import { useState } from "react";

export function Post({ author, content, publishedAt }) {
  const [comments, setComments] = useState(["Post muito bacana"]);
  const [newCommentText, setNewCommentText] = useState("");

  const handleCreateNewComment = (e) => {
    e.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText("");
  };
  const handleNewCommentChange = (e) => {
    setNewCommentText(e.target.value);
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

  const isNewCommentEmpty = newCommentText.length === 0 ? true : false;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder image={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={moment(publishedAt).format("LLL")}
          dateTime={moment(publishedAt).format()}
        >
          {moment(publishedAt)
            .startOf(publishedAt, {
              locale: ptBR,
            })
            .fromNow()}
        </time>
      </header>
      <div className={styles.content}>
        {content.map((line, i) => {
          return line.type === "paragraph" ? (
            <p key={i}> {line.content} </p>
          ) : (
            <p key={i}>
              <a href="#">{line.content}</a>{" "}
            </p>
          );
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback!</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment, i) => {
          return (
            <Comment
              key={i}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
