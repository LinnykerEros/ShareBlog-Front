import {
  Input as ChakraInput,
  FormLabel,
  FormControl,
  InputGroup,
  InputRightAddon,
  Icon,
} from "@chakra-ui/react";

export function Input({ name, label, height, icon, handleSearch, ...rest }) {
  return (
    <FormControl>
      {label && (
        <FormLabel htmlFor={name} {...rest}>
          {label}
        </FormLabel>
      )}
      <InputGroup>
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
        {icon ? (
          <InputRightAddon
            height={height}
            size="lg"
            bgColor="gray.900"
            border="none"
            cursor="pointer"
            // onClick={() => handleSearch()}
            children={icon}
          />
        ) : (
          ""
        )}
      </InputGroup>
    </FormControl>
  );
}
