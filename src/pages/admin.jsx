import React from "react";
import { Card } from "../components/Card.";

import styles from "../styles/Admin.module.css";
import { useEffect, useState } from "react";
import { getUser } from "../service/userService";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Admin() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const token = Cookies.get("reactauth.token");

  const updatingStateUsers = async () => {
    const data = await getUser();
    setUser(data);
  };

  useEffect(() => {
    (async () => {
      if (token) {
        const users = await getUser();
        setUser(users);
      } else {
        navigate("/");
      }
    })();
  }, [token, navigate]);

  return (
    <div>
      <Header />
      <div className={styles.main}>
        <div className={styles.wrapper}>
          {user
            .sort((a, b) => {
              return a.id - b.id;
            })
            .map((data) => {
              return (
                <Card
                  key={data.id}
                  id={data.id}
                  name={data.name}
                  email={data.email}
                  profession={data.profession}
                  created_at={data.created_at}
                  updatingStateUsers={updatingStateUsers}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Admin;
