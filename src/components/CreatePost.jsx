import { Avatar } from "./Avatar";
import styles from "../styles/CreatePost.module.css";
import { useState } from "react";
import { createPost } from "../service/postService";
import { autoResize } from "../utils/autoResize";
export function CreatePost({ author, profession, userID, updatingState }) {
  const [contentPost, setContentPost] = useState("");

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
            verifyUserId
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
            id="createPost"
            name="comment"
            placeholder="Faça uma publicação"
            value={contentPost}
            onChange={(e) => setContentPost(e.target.value)}
            onKeyDown={autoResize("createPost")}
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
