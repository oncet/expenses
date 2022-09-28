import {
  Button,
  chakra,
  Container,
  Heading,
  useColorMode,
} from "@chakra-ui/react";

export default function Footer() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <chakra.footer>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </chakra.footer>
  );
}
