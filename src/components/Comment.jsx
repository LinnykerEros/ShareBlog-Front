import { ThumbsUp, Trash } from "phosphor-react";
import { useContext, useState } from "react";
import styles from "../styles/Comment.module.css";
import { Avatar } from "./Avatar";
import { AuthContext } from "../contexts/AuthContext";
import { deleteComment } from "../service/commentService";
import ptBR from "moment/locale/pt-br";
import moment from "moment";
export function Comment({
  content,
  id,
  userName,
  publishedAt,
  updatingState,
  userId,
}) {
  const [likeCount, setLikeCount] = useState(0);
  const { user } = useContext(AuthContext);
  const handleLikeComment = () => {
    setLikeCount(likeCount + 1);
  };

  const handleCommentDelete = async (e) => {
    await deleteComment(id);
    updatingState();
  };

  return (
    <div key={id} className={styles.comment}>
      <Avatar />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{userName}</strong>
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
            </div>
            {user?.id == userId ? (
              <button onClick={handleCommentDelete} title="Deletar comentário">
                <Trash size={24} />
              </button>
            ) : (
              ""
            )}
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
