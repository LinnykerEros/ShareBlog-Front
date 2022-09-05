import Cookies from "js-cookie";
import "../global.css";
import styles from "../styles/UserPost.module.css";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { getUserById } from "../service/userService";
import parseJwt from "../utils/parseJWT";
import { useNavigate } from "react-router-dom";
import { Post } from "../components/Post";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { FilterContext } from "../contexts/FilterContext";
import { useParams } from "react-router-dom";

function UserPosts() {
  const navigate = useNavigate();
  const { id } = useParams();

  async function fetchPosts() {
    const data = await getUserById(id);
    return setUser(data);
  }

  const [user, setUser] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getUserById(id);
      setUser(data);
    })();
  }, []);

  return (
    <div className="App">
      <Header />

      <div
        className={
          user.post?.length === 0 ? styles.postUndefined : styles.wrapper
        }
      >
        {user.post?.length === 0 ? (
          <Flex flexDir="column" margin="0 auto" alignItems="center" gap="2rem">
            <Text fontSize="2rem">Não possui publicações!</Text>
            <Button colorScheme="blue" onClick={() => navigate("/app")}>
              Voltar para página inicial!
            </Button>
          </Flex>
        ) : (
          <>
            {" "}
            <SideBar userId={id} />
            <main>
              {user?.post?.map(userPost => {
                return (
                  <Post
                    key={userPost.id}
                    postId={userPost.id}
                    userId={userPost.user.id}
                    userName={userPost.user.name}
                    userProfession={userPost.user.profession}
                    content={userPost.content}
                    comment={userPost.comment}
                    pusblishedAt={userPost.created_at}
                    updatingState={fetchPosts}
                  />
                );
              })}
            </main>{" "}
          </>
        )}
      </div>
    </div>
  );
}

export { UserPosts };
