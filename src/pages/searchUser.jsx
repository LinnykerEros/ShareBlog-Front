import "../global.css";
import styles from "../styles/SearchUser.module.css";
import { Card } from "../components/Card.";
import { Header } from "../components/Header";
import { useContext } from "react";
import { FilterContext } from "../contexts/FilterContext";

function SearchUser() {
  const { filter } = useContext(FilterContext);

  return (
    <div>
      <div className={styles.main}>
        {/* <Header /> */}
        <div className={styles.wrapper}>
          {filter.map((data) => {
            return (
              <Card
                key={data.id}
                id={data.id}
                name={data.name}
                email={data.email}
                profession={data.profession}
                created_at={data.created_at}
                isTrue
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
// .sort((a, b) => {
//   return a.id - b.id;
// })
export default SearchUser;
