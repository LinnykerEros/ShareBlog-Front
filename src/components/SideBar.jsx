import { PencilLine } from "phosphor-react";

import styles from "../styles/SideBar.module.css";
import { Avatar } from "./Avatar";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
export function SideBar() {
  const { user } = useContext(AuthContext);
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGV2ZWxvcGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        alt=""
      />
      <div className={styles.profile}>
        <Avatar hasBorder />

        <strong>{user?.name}</strong>
        <span>{user?.profession}</span>
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
