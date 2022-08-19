import { Avatar } from "./Avatar";
import styles from "../styles/CreatePost.module.css";
import { Comment } from "./Comment";
import moment from "moment";
import ptBR from "moment/locale/pt-br";
import { useState } from "react";
import { createPost } from "../service/postService";

export function CreatePost({ author, profession, userID, updatingState }) {
  const [contentPost, setContentPost] = useState("");
  // const [comments, setComments] = useState(["Post muito bacana"]);
  const [newPostText, setNewPostText] = useState("");

  const handleCreateNewPost = async (e) => {
    e.preventDefault();
    try {
      await createPost(contentPost, userID);
      setContentPost("");
      updatingState();
    } catch (err) {
      console.log(err);
    }
  };

  const isNewPostEmpty = contentPost === "" ? true : false;

  return (
    <article className={styles.createPost}>
      <header>
        <div className={styles.author}>
          <Avatar
            hasBorder
            image={
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            }
          />

          <div className={styles.authorInfo}>
            <strong>{author}</strong>
            <span>{profession}</span>
          </div>
        </div>
      </header>
      <div className={styles.content}>
        <form onSubmit={handleCreateNewPost} className={styles.commentForm}>
          {/* <strong>Faça uma publicação!</strong> */}
          <textarea
            name="comment"
            placeholder="Faça uma publicação"
            value={contentPost}
            onChange={(e) => setContentPost(e.target.value)}
            required
          />

          <footer>
            <button type="submit" disabled={isNewPostEmpty}>
              Publicar
            </button>
          </footer>
        </form>
      </div>
    </article>
  );
}
