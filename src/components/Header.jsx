import styles from "../styles/Header.module.css";
import igniteLogo from "../assets/ignite-logo.svg";
import Cookies from "js-cookie";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { SignOut } from "phosphor-react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  // const signOut = () => {
  //   Cookies.remove("reactauth.token");
  //  return navigate("/");

  // };

  return (
    <header className={styles.header}>
      {/* <img src={igniteLogo} alt="LogoIgnite" /> */}
      {/* <img src={igniteLogo} alt="LogoIgnite" /> */}
      <button onClick={signOutUser} className={styles.signOut}>
        <SignOut size={24} />
      </button>
    </header>
  );
}
