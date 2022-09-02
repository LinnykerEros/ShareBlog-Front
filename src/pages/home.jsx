import "../global.css";
import styles from "../styles/Home.module.css";
import Cookies from "js-cookie";
import { CreatePost } from "../components/CreatePost";
import { Post } from "../components/Post";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { getPosts } from "../service/postService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const token = Cookies.get("reactauth.token");
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    const data = await getPosts();
    return setPosts(data);
  }
  useEffect(() => {
    (async () => {
      if (token) {
        const post = await getPosts();
        setPosts(post);
      } else {
        navigate("/");
      }
    })();
  }, [token, navigate]);

  return (
    <div className="App">
      <Header />

      <div className={styles.wrapper}>
        <SideBar userId={user?.id} updatingState={fetchPosts} />

        <main>
          <CreatePost
            author={user?.name}
            profession={user?.profession}
            userID={user?.id}
            updatingState={fetchPosts}
          />
          {posts
            .sort((a, b) => {
              return b.id - a.id;
            })
            .map((post) => {
              return (
                <Post
                  key={post.id}
                  postId={post.id}
                  userId={post.user.id}
                  userName={post.user.name}
                  userProfession={post.user.profession}
                  content={post.content}
                  comment={post.comment}
                  pusblishedAt={post.created_at}
                  updatingState={fetchPosts}
                />
              );
            })}
        </main>
      </div>
    </div>
  );
}

export default Home;
