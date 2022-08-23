import styles from "../styles/Post.module.css";
import moment from "moment";
import ptBR from "moment/locale/pt-br";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import { useContext, useState } from "react";
import { createComment } from "../service/commentService";
import { deletePost, updatePost } from "../service/postService";
import { AuthContext } from "../contexts/AuthContext";
import { DotsThreeOutline } from "phosphor-react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { autoResize } from "../utils/autoResize";
import { detectedLineBreak } from "../utils/detectedLineBreak";
import { detectedUrl } from "../utils/detectedUrl";
import { toast } from "react-toastify";

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
  const [isWantToEdit, setIsWantToEdit] = useState(false);
  const [contentt, setContentt] = useState("");

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

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      if (postId || content || userId) {
        await updatePost(postId, contentt, userId);
        updatingState();
        setIsWantToEdit(false);

        toast.success("Publicação atualizada com sucesso!", {
          autoClose: 2000,
        });
      }
    } catch (err) {
      toast.error(err.response.data.message, {
        autoClose: 2000,
      });
    }
  };

  const handlePostDelete = async (e) => {
    e.preventDefault();
    try {
      await deletePost(postId);
      updatingState();
      toast.success("Publicação deletada com sucesso!", {
        autoClose: 2000,
      });
    } catch (err) {
      toast.error(err.response.data.message, {
        autoClose: 2000,
      });
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
        {user?.id === userId ? (
          <div>
            <Menu bg="none" width="1rem">
              <MenuButton
                bg="none"
                as={Button}
                colorScheme="none"
                boxShadow="none"
                _hover={{ bg: "none" }}
              >
                <DotsThreeOutline _focus={{ bg: "none" }} size={24} />
              </MenuButton>
              <MenuList bg="transparent">
                <MenuItem
                  mb="1rem"
                  onClick={() => setIsWantToEdit(true)}
                  _hover={{
                    bg: "none",
                    color: "white",
                    fontWeight: "bold",
                    boxShadow: "none",
                    outline: "none",
                  }}
                  _focus={{ bg: "none" }}
                  boxShadow="none"
                  outline="none"
                  color="white"
                >
                  Editar publicação
                </MenuItem>
                <MenuItem
                  // gap="1px"

                  onClick={handlePostDelete}
                  _hover={{
                    bg: "none",
                    color: "white",
                    fontWeight: "bold",
                    boxShadow: "none",
                  }}
                  _focus={{ bg: "none" }}
                  boxShadow="none"
                  color="white"
                >
                  Excluir publicação
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        ) : (
          ""
        )}
      </header>
      <div className={styles.content}>
        {isWantToEdit ? (
          <textarea
            style={{
              background: "#718096",
              boxShadow: "none",
              border: "none",
              width: "100%",
              color: "white",
              padding: "10px",
              overflow: "hidden",
              resize: "none",
            }}
            id="textArea"
            onKeyDown={autoResize("textArea")}
            defaultValue={content}
            onChange={(e) => setContentt(e.target.value)}
          />
        ) : (
          <p
            dangerouslySetInnerHTML={{
              __html: detectedUrl(detectedLineBreak(content)),
            }}
          />
        )}
        <footer style={{ display: "flex" }}>
          {isWantToEdit ? (
            <div style={{ display: "flex" }}>
              <Button
                onClick={() => setIsWantToEdit(false)}
                color="red"
                // marginLeft="1rem"
                bg="transparent"
                _hover={{ color: "#f75a68" }}
              >
                cancelar
              </Button>
              <Button
                color="#3182ce"
                bg="transparent"
                _hover={{ color: "#4299e1" }}
                onClick={handleUpdatePost}
              >
                salvar
              </Button>
            </div>
          ) : (
            ""
          )}
        </footer>
      </div>

      <form onSubmit={handleSubmit} className={styles.commentForm}>
        <strong>Deixe seu feedback!</strong>
        <textarea
          id={postId}
          name="comment"
          placeholder="Deixe um comentário"
          value={comentario}
          onChange={handleNewComment}
          onKeyDown={autoResize(postId)}
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
