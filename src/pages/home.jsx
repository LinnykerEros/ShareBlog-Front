import { Post } from "../components/Post";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../global.css";
import styles from "../styles/Home.module.css";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/LinnykerEros.png",
      name: "Eros Linnyker",
      role: "Studant",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no AcademyBootcamp, evento do Instituto Atlântico. O nome do projeto é SupermercadoSQ 🚀",
      },
      { type: "link", content: " #novoprojeto " },
      { type: "link", content: "#academy" },
      { type: "link", content: "#institutoAtlantico" },
    ],
    publishedAt: new Date("2022-08-9 17:53:59"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/maykbrito.png",
      name: "Mayk Brito",
      role: "Educator",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no AcademyBootcamp, evento do Instituto Atlântico. O nome do projeto é SupermercadoSQ 🚀",
      },
      { type: "link", content: " #novoprojeto " },
      { type: "link", content: "#academy" },
      { type: "link", content: "#institutoAtlantico" },
    ],
    publishedAt: new Date("2022-08-10 17:54:20"),
  },
];

function Home() {
  return (
    <div className="App">
      <Header />
      <div className={styles.wrapper}>
        <SideBar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              ></Post>
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default Home;
