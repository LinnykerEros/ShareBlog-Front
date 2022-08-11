import styles from "../styles/Avatar.module.css";

export function Avatar({ image, hasBorder = false }) {
  return (
    <img className={hasBorder ? styles.hasBorder : styles.img} src={image} />
  );
}
