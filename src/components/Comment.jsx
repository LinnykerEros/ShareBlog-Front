import { ThumbsUp, DotsThreeOutline } from "phosphor-react";
import { useContext, useState } from "react";
import styles from "../styles/Comment.module.css";
import { Avatar } from "./Avatar";
import { AuthContext } from "../contexts/AuthContext";
import { deleteComment, updateComment } from "../service/commentService";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { detectedLineBreak } from "../utils/detectedLineBreak";
import { detectedUrl } from "../utils/detectedUrl";
// import { ChevronDownIcon } from "@chakra-ui/icons";
import ptBR from "moment/locale/pt-br";
import moment from "moment";
import { autoResize } from "../utils/autoResize";
export function Comment({
  content,
  id,
  userName,
  publishedAt,
  updatingState,
  userId,
  postId,
}) {
  const [likeCount, setLikeCount] = useState(0);
  const [contentt, setContentt] = useState("");
  const { user } = useContext(AuthContext);
  const handleLikeComment = () => {
    setLikeCount(likeCount + 1);
  };

  const [isWantToEdit, setIsWantToEdit] = useState(false);

  const handleCommentDelete = async (e) => {
    await deleteComment(id);
    updatingState();
  };

  const handleUpdateComment = async (e) => {
    try {
      if (contentt) {
        await updateComment(id, contentt, userId, postId);
        updatingState();
        setIsWantToEdit(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const verifyUserId = user?.id === userId;

  return (
    <div key={id} className={styles.comment}>
      <Avatar verifyUserId={verifyUserId} />
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
                      Editar comentário
                    </MenuItem>
                    <MenuItem
                      // gap="1px"

                      onClick={handleCommentDelete}
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
                      Excluir comentário
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            ) : (
              ""
            )}
          </header>
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
              id={id}
              defaultValue={content}
              onKeyDown={autoResize(id)}
              onChange={(e) => setContentt(e.target.value)}
            />
          ) : (
            <p
              dangerouslySetInnerHTML={{
                __html: detectedUrl(detectedLineBreak(content)),
              }}
            />
          )}
        </div>
        <footer style={{ display: "flex" }}>
          <button className={styles.aplaudir} onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
          {isWantToEdit ? (
            <div style={{ display: "flex" }}>
              <Button
                onClick={() => setIsWantToEdit(false)}
                color="red"
                marginLeft="1rem"
                bg="transparent"
                _hover={{ color: "#f75a68" }}
              >
                cancelar
              </Button>
              <Button
                color="#3182ce"
                bg="transparent"
                _hover={{ color: "#4299e1" }}
                onClick={handleUpdateComment}
              >
                salvar
              </Button>
            </div>
          ) : (
            ""
          )}
        </footer>
      </div>
    </div>
  );
}
