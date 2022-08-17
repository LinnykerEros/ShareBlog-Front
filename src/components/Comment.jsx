import { ThumbsUp, Trash } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/Comment.module.css";
import { Avatar } from "./Avatar";
import { AuthContext } from "../contexts/AuthContext";

import { getComments } from "../service/commentService";
import ptBR from "moment/locale/pt-br";
import moment from "moment";
export function Comment({ content, onDeleteComment }) {
  const { user } = useContext(AuthContext);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      const comments = await getComments();
      setComments(comments);
    })();
  }, []);

  const handleLikeComment = () => {
    setLikeCount(likeCount + 1);
  };

  const handleCommentDelete = (e) => {
    e.preventDefault();
    onDeleteComment(content);
  };

  return (
    <div>
      {comments.map((comment) => {
        return (
          <div className={styles.comment}>
            <Avatar />
            <div className={styles.commentBox}>
              <div className={styles.commentContent}>
                <header>
                  <div className={styles.authorAndTime}>
                    <strong>{user.name}</strong>
                    <time
                      title="10 de Agosto às 14:01"
                      dateTime="2022-08-10 14:00:00"
                    >
                      {}
                    </time>
                  </div>
                  <button
                    onClick={handleCommentDelete}
                    title="Deletar comentário"
                  >
                    <Trash size={24} />
                  </button>
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
      })}
    </div>
  );
}
