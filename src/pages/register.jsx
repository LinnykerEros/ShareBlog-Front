import { Flex, Stack, Button } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../service/userService";
import { toast } from "react-toastify";
export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (password === confirmPassword) {
        await createUser(name, profession, email, password);
        toast.success(
          "Usuário cadastrado com sucesso!",
          {
            autoClose: 2000,
          },
          navigate("/")
        );
        // return navigate("/");
      } else {
        toast.error("Verifique a senha e tente novamente!", {
          autoClose: 2000,
        });
      }
    } catch (err) {
      if (!name || !profession || !email || !password) {
        toast.error(err.response.data.message[0], {
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      {" "}
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius="8px"
        flexDir="column"
      >
        <Stack spacing="4">
          <Input
            name="name"
            type="name"
            label="Nome"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            name="profession"
            type="profession"
            label="Profissão"
            onChange={(e) => setProfession(e.target.value)}
          />
          <Input
            name="email"
            type="email"
            label="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="password"
            type="password"
            label="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            name="confirmPassword"
            type="password"
            label="Confirmar senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Stack>

        <Flex justify="space-between">
          <Button onClick={() => navigate("/")} mt="6" colorScheme="red">
            Voltar
          </Button>
          <Button onClick={handleSubmit} mt="6" colorScheme="blue">
            Cadastrar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
