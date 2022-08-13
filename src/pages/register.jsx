import { Flex, Stack, Button } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { useNavigate } from "react-router-dom";
export function Register() {
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
          <Input name="name" type="name" label="Nome" />
          <Input name="profession" type="profession" label="Profissão" />
          <Input name="email" type="email" label="E-mail" />
          <Input name="password" type="password" label="Senha" />
          <Input
            name="confirmPassword"
            type="password"
            label="Confirmar senha"
          />
        </Stack>

        <Button
          onClick={() => navigate("/")}
          type="submit"
          mt="6"
          colorScheme="green"
        >
          Cadastrar
        </Button>
      </Flex>
    </Flex>
  );
}
