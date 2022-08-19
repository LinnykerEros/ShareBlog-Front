import styles from "../styles/SideBar.module.css";
import Cookies from "js-cookie";
import parseJwt from "../utils/parseJWT";
import { PencilLine } from "phosphor-react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
} from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { Avatar } from "./Avatar";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getUserById, updateUser } from "../service/userService";
import { toast } from "react-toastify";

export function SideBar({ updatingState }) {
  const { user, fetchUser } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [profession, setProfession] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  // console.log(user);
  useEffect(() => {
    const token = Cookies.get("reactauth.token");

    (async () => {
      if (token) {
        const id = parseJwt(token).id;
        console.log(id);
        const users = await getUserById(id);
        setName(users.name);
        setEmail(users.email);
        setProfession(users.profession);
      }
    })();
  }, []);

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      if (confirmPassword === password) {
        await updateUser(user.id, name, profession, email, password);
        toast.success(
          "Usuário atualizado com sucesso",
          {
            autoClose: 2000,
          },
          onClose()
        );
        fetchUser();
        updatingState();
      } else {
        toast.error("Verifique a senha e tente novamente!", {
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.log(err.response.data.message);
      if (!name || !profession || !email || !password) {
        toast.error(err.response.data.message, { autoClose: 2000 });
      }
    }
  };

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
        <Button onClick={onOpen} className={styles.buttonChakra}>
          {" "}
          <PencilLine size={20} />
          Editar seu perfil
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          {/* <ModalOverlay /> */}
          <ModalContent bg={"#202024"} alignItems={"center"} gap={2}>
            <ModalHeader> Editar seu perfil</ModalHeader>
            <Input
              defaultValue={name}
              name={"name"}
              label={"Nome"}
              width={"80%"}
              ml={12}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              defaultValue={profession}
              name={"profession"}
              label={"Profissão"}
              width={"80%"}
              ml={12}
              onChange={(e) => {
                setProfession(e.target.value);
              }}
            />
            <Input
              defaultValue={email}
              name={"email"}
              label={"E-mail"}
              width={"80%"}
              ml={12}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              type="password"
              name={"password"}
              label={"Senha"}
              width={"80%"}
              ml={12}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Input
              type="password"
              name={"confirmPassword"}
              label={"Confirme Senha"}
              width={"80%"}
              ml={12}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <ModalCloseButton />

            <ModalFooter>
              <Button colorScheme="pink" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={handleUpdateUser} variant="ghost">
                Aplicar alterações
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </footer>
    </aside>
  );
}
