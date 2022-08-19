import styles from "../styles/SideBar.module.css";
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
import { useContext } from "react";

export function SideBar() {
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <Input name={"name"} label={"Nome"} width={"80%"} ml={12} />
            <Input
              name={"profession"}
              label={"Profissão"}
              width={"80%"}
              ml={12}
            />
            <Input name={"email"} label={"E-mail"} width={"80%"} ml={12} />
            <Input name={"password"} label={"Senha"} width={"80%"} ml={12} />
            <Input
              name={"confirmPassword"}
              label={"Confirme Senha"}
              width={"80%"}
              ml={12}
            />
            <ModalCloseButton />

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </footer>
    </aside>
  );
}
