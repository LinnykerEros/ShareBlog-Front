import { PencilLine } from "phosphor-react";

import styles from "../styles/SideBar.module.css";
import { Avatar } from "./Avatar";

export function SideBar() {
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGV2ZWxvcGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        alt=""
      />
      <div className={styles.profile}>
        <Avatar hasBorder image={"https://github.com/LinnykerEros.png"} />

        <strong>Eros Linnyker</strong>
        <span>Web Developer</span>
      </div>
      <footer className={styles.footer}>
        <a href="#">
          {" "}
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
}
