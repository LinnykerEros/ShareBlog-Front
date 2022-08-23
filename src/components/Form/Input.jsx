import { Input as ChakraInput, FormLabel, FormControl } from "@chakra-ui/react";

export function Input({ name, label, height, ...rest }) {
  return (
    <FormControl>
      {label && (
        <FormLabel htmlFor={name} {...rest}>
          {label}
        </FormLabel>
      )}
      <ChakraInput
        id={name}
        name={name}
        focusBorderColor="none"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: "gray.900",
        }}
        size="lg"
        height={height}
        {...rest}
      />
    </FormControl>
  );
}
