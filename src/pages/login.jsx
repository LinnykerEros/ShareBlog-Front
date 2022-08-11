import { Flex, Button, Stack, Text } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
// import { Redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

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
          <Input name="email" type="email" label="E-mail" />
          <Input name="password" type="password" label="Senha" />
          <Text>
            Não possui uma conta?{" "}
            <Text as="a" href="#" textDecoration="underline">
              Cadastre-se
            </Text>{" "}
          </Text>
        </Stack>

        <Button
          onClick={() => navigate("/app")}
          type="submit"
          mt="6"
          colorScheme="green"
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}

export default Login;
