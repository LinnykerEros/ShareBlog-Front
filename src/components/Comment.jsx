import { ThumbsUp, Trash } from "phosphor-react";
import styles from "../styles/Comment.module.css";
import { Avatar } from "./Avatar";

export function Comment({ content, onDeleteComment }) {
  const handleCommentDelete = (e) => {
    e.preventDefault();
    onDeleteComment(content);
  };

  return (
    <div className={styles.comment}>
      <Avatar image="https://github.com/LinnykerEros.png" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Eros Linnyker</strong>
              <time
                title="10 de Agosto às 14:01"
                dateTime="2022-08-10 14:00:00"
              >
                Cerca de 1h atrás
              </time>
            </div>
            <button onClick={handleCommentDelete} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button>
            <ThumbsUp />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
