import React from "react";
import styles from "../styles/Card.module.css";
import { PencilLine, Trash } from "phosphor-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState } from "react";
import { updateUser, deleteUser } from "../service/userService";
import { toast } from "react-toastify";
import moment from "moment";
function Card({ id, name, email, profession, created_at, updatingStateUsers }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { signOutUser, fetchUser } = useContext(AuthContext);
  const [namee, setNamee] = useState(name);
  const [emaill, setEmaill] = useState(email);
  const [role, setRole] = useState(profession);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleDeleteUser = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await deleteUser(id);
        toast.success(
          "Usuário deletado com sucesso!",
          {
            autoClose: 2000,
          },
          onClose(),
          updatingStateUsers()
        );
      }
    } catch (err) {
      toast.error(err.response.data.message, {
        autoClose: 2000,
      });
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      if (password) {
        if (confirmPassword === password) {
          await updateUser(id, namee, role, emaill, password);
          toast.success(
            "Usuário atualizado com sucesso, você será deslogado!",
            {
              autoClose: 2000,
            },
            onClose(),
            setTimeout(signOutUser, 3000)
          );
        } else {
          toast.error("Verifique a senha e tente novamente!", {
            autoClose: 2000,
          });
        }
      } else {
        await updateUser(id, namee, role, emaill, password);
        toast.success(
          "Usuário atualizado com sucesso",
          {
            autoClose: 2000,
          },
          onClose()
        );
        fetchUser();
        updatingStateUsers();
      }
    } catch (err) {
      console.log(err.response.data.message);
      if (!namee || !role || !emaill || !password) {
        toast.error(err.response.data.message, { autoClose: 2000 });
      }
    }
  };

  return (
    <div className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGV2ZWxvcGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        alt=""
      />
      <div className={styles.profile}>
        <strong>{name}</strong>
        <span>Id: {id}</span>
        <span>{profession}</span>
        <span>{email}</span>
        <span>{moment(created_at).format("D MMMM YYYY, h:mm:ss a")}</span>
      </div>
      <footer className={styles.footer}>
        <Button
          colorScheme="blue"
          onClick={onOpen}
          gap="1rem"
          //  className={styles.buttonChakra}
        >
          {" "}
          <PencilLine size={20} />
          Editar usuário
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
                setNamee(e.target.value);
              }}
            />
            <Input
              defaultValue={profession}
              name={"profession"}
              label={"Profissão"}
              width={"80%"}
              ml={12}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
            <Input
              defaultValue={email}
              name={"email"}
              label={"E-mail"}
              width={"80%"}
              ml={12}
              onChange={(e) => {
                setEmaill(e.target.value);
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
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleUpdateUser}
                // variant="ghost"
              >
                Aplicar alterações
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Button
          colorScheme="red"
          onClick={handleDeleteUser}
          //  className={styles.buttonChakra}
          gap="1rem"
          mt="0.25rem"
        >
          {" "}
          <Trash size={20} />
          Deletar usuário
        </Button>
      </footer>
    </div>
  );
}

export { Card };
