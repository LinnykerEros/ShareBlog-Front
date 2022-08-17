import styles from "../styles/Avatar.module.css";

export function Avatar({
  image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  hasBorder = false,
}) {
  return (
    <img
      className={hasBorder ? styles.hasBorder : styles.img}
      src={image}
      alt=""
    />
  );
}
