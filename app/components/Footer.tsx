import { Button, chakra, useColorMode } from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";

export default function Footer() {
  const { toggleColorMode } = useColorMode();

  return (
    <chakra.footer>
      <Button onClick={toggleColorMode}>
        <MoonIcon />
      </Button>
    </chakra.footer>
  );
}
