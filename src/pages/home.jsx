import { CreatePost } from "../components/CreatePost";
import { Post } from "../components/Post";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { getPosts } from "../service/postService";
import "../global.css";
import styles from "../styles/Home.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      <div className={styles.wrapper}>
        <SideBar />
        <main>
          <CreatePost
            author={user.name}
            profession={user.profession}
            userID={user.id}
          />

          <Post />
        </main>
      </div>
    </div>
  );
}

export default Home;
