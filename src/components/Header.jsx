import styles from "../styles/Header.module.css";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
  InputGroup,
  InputRightAddon
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { SignOut } from "phosphor-react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ShareBlog from "../assets/logoShareBlog.png";
import { Input } from "./Form/Input";
import { getUser } from "../service/userService";
import searchUser from "../pages/searchUser";
import { FilterContext } from "../contexts/FilterContext";
export function Header() {
  const { user, signOutUser } = useContext(AuthContext);
  const { filter, setFilter, setIsTrue } = useContext(FilterContext);
  const [users, setUsers] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await getUser().then(data => {
        setUsers(data);
        setFilter(data);
        // console.log(data.filter((obj) => obj.name === "Pedro Michael"));
      });
    })();
  }, []);

  return (
    <>
      {pathname === "/" ? (
        ""
      ) : (
        <header className={styles.header}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              onClick={() => navigate("/app")}
              src={ShareBlog}
              alt="LogoShareBlog"
            />

            <Input
              name="Search"
              placeholder="Pesquise por um usuário"
              width="20rem"
              height="3rem"
              ml="2rem"
              onChange={e =>
                setFilter(
                  users.filter(user =>
                    user.name
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  )
                )
              }
              icon={<SearchIcon onClick={() => navigate("/searchUser")} />}
            />
          </div>
          <div>
            <a href="#" onClick={() => navigate("/app")}>
              Home
            </a>
          </div>
          <div></div>

          <div>
            <Menu bg="white">
              <MenuButton
                className={styles.signOut}
                as={Button}
                colorScheme="blue"
                boxShadow="none"
                rightIcon={<ChevronDownIcon />}
              >
                {user?.name}
              </MenuButton>
              <MenuList bg="white" color="gray.600">
                <MenuItem
                  fontSize={"1.15rem"}
                  _focus={{ bg: "none" }}
                  _hover={{
                    bg: "#3182ce",
                    color: "white",
                    fontWeight: "bold",
                    boxShadow: "none"
                  }}
                  color="gray.600"
                  fontWeight="bold"
                  boxShadow="none"
                  onClick={() => navigate("/userLogedPosts")}
                >
                  Minhas publicações
                </MenuItem>
                {user?.id === 1 ? (
                  <MenuItem
                    fontSize={"1.15rem"}
                    _focus={{ bg: "none" }}
                    _hover={{
                      bg: "#3182ce",
                      color: "white",
                      fontWeight: "bold",
                      boxShadow: "none"
                    }}
                    fontWeight="bold"
                    boxShadow="none"
                    onClick={() => navigate("/admin")}
                  >
                    Usuários cadastrados
                  </MenuItem>
                ) : (
                  ""
                )}

                <MenuItem
                  gap={150}
                  onClick={signOutUser}
                  transition="all 0.2"
                  fontSize={"1.15rem"}
                  _hover={{
                    bg: "#3182ce",
                    color: "white",
                    fontWeight: "bold",
                    boxShadow: "none"
                  }}
                  boxShadow="none"
                  bg="transparent"
                  fontWeight="bold"
                >
                  Sair {<SignOut size={24} />}
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </header>
      )}
    </>
  );
}
