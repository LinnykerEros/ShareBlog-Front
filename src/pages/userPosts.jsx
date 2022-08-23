import Cookies from "js-cookie";
import "../global.css";
import styles from "../styles/UserPost.module.css";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";

import { getUserById } from "../service/userService";
import parseJwt from "../utils/parseJWT";
import { useNavigate } from "react-router-dom";
import { Post } from "../components/Post";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { getPosts } from "../service/postService";

function UserPosts() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const token = Cookies.get("reactauth.token");
  const [post, setPost] = useState([]);

  async function fetchPosts() {
    const id = parseJwt(token).id;
    const data = await getUserById(id);
    return setPost(data);
  }

  useEffect(() => {
    (async () => {
      if (token) {
        const id = parseJwt(token).id;
        const post = await getUserById(id);
        setPost(post);
      } else {
        navigate("/");
      }
    })();
  }, [token, navigate]);

  return (
    <div className="App">
      <Header />
      <div className={styles.wrapper}>
        <SideBar />

        <main>
          {post?.post?.map((userPost) => {
            return (
              <Post
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
        </main>
      </div>
    </div>
  );
}

export { UserPosts };
