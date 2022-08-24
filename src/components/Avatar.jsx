import styles from "../styles/Avatar.module.css";

const images = [
  "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
  "https://i.pinimg.com/originals/61/54/76/61547625e01d8daf941aae3ffb37f653.png",
  "https://i.pinimg.com/474x/bd/ee/4c/bdee4c328550aaf21aa9f43fd19e2136.jpg",
  "https://i.pinimg.com/originals/30/db/47/30db479e1558c3ed46b4ed23b3cd98ae.png",
  "https://i.pinimg.com/originals/1b/71/b8/1b71b85dd741ad27bffa5c834a7ed797.png",
  "https://pbs.twimg.com/profile_images/1356333120992149505/-qvakEK7_400x400.jpg",
];

const AnotherUser = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVWGKNk39rCbUMmHEV3uqusN3WZ4LjYZbhrZfNGJ-85ilFgp095yz1AC5Rg7XRsLXE1eQ&usqp=CAU",
  " https://preview.redd.it/sgfxdosc4qo81.png?width=338&format=png&auto=webp&s=68081fe5673ff6ac567a531ae01a786ca80695f6",
  " https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png",
  " https://cdn.dribbble.com/users/2338264/screenshots/6859035/attachments/1462872/owl-icon-revised.jpg?compress=1&resize=400x300&vertical=top",
  "  https://ih0.redbubble.net/image.618410871.2644/flat,1000x1000,075,f.u2.jpg",
  " https://i.imgur.com/fXJosY6.jpg",
];

const randomNumber = Math.floor(Math.random() * 6);
const randomNumberAnotherUser = Math.floor(Math.random() * 6);

export function Avatar({ verifyUserId, hasBorder = false }) {
  return (
    <img
      className={hasBorder ? styles.hasBorder : styles.img}
      src={
        verifyUserId
          ? images[randomNumber]
          : AnotherUser[randomNumberAnotherUser]
      }
      alt=""
    />
  );
}
