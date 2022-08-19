import { Flex, Button, Stack, Text } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";

import { useNavigate } from "react-router-dom";

import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getUser } from "../service/userService.js";
import { toast } from "react-toastify";
function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);
  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    if (!data.email || !data.password) {
      toast.error("Email e Senha obrigatórios!", {
        autoClose: 2000,
      });
    } else {
      await signIn(data);

      navigate("/app");
    }

    // const users = await getUser();
    // console.log(users);
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      {" "}
      <Flex
        onSubmit={handleSubmit}
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
          <Text>
            Não possui uma conta?{" "}
            <Text as="a" href="/register" textDecoration="underline">
              Cadastre-se
            </Text>{" "}
          </Text>
        </Stack>

        <Button type="submit" mt="6" colorScheme="green">
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}

export { SignIn };
